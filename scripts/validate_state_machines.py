#!/usr/bin/env python3
"""
State Machine Validator

Validates YAML state machines against schema and business rules.
Run: python scripts/validate_state_machines.py
"""

import os
import sys
import yaml
from pathlib import Path
from typing import Dict, List, Set, Any

# ANSI color codes
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
RESET = '\033[0m'

class ValidationError(Exception):
    """Custom validation error"""
    pass

class StateMachineValidator:
    def __init__(self, repo_root: Path):
        self.repo_root = repo_root
        self.state_machines_dir = repo_root / 'compliance' / 'state_machines'
        self.schema_path = self.state_machines_dir / 'state_machine.schema.yaml'
        self.controls_dir = repo_root / 'compliance' / 'controls'
        self.errors: List[str] = []
        self.warnings: List[str] = []
        
    def load_yaml(self, file_path: Path) -> Dict:
        """Load and parse YAML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except Exception as e:
            raise ValidationError(f"Failed to load {file_path}: {e}")
    
    def validate_schema(self, state_machine: Dict) -> None:
        """Validate state machine has required top-level fields"""
        required_fields = ['name', 'description', 'states', 'initial_state']
        
        for field in required_fields:
            if field not in state_machine:
                self.errors.append(f"Missing required field: {field}")
    
    def validate_states(self, state_machine: Dict) -> None:
        """Validate states structure"""
        states = state_machine.get('states', [])
        state_ids = set()
        
        if not states:
            self.errors.append("No states defined")
            return
        
        for idx, state in enumerate(states):
            # Check required fields
            if 'id' not in state:
                self.errors.append(f"State {idx} missing 'id' field")
                continue
            
            state_id = state['id']
            
            # Check for duplicate state IDs
            if state_id in state_ids:
                self.errors.append(f"Duplicate state ID: {state_id}")
            state_ids.add(state_id)
            
            # Validate state structure
            if 'name' not in state:
                self.warnings.append(f"State '{state_id}' missing 'name' field")
            
            # Validate evidence structure
            if 'required_evidence' in state:
                for evidence in state['required_evidence']:
                    if not isinstance(evidence, dict):
                        self.errors.append(f"State '{state_id}': evidence must be dict")
                        continue
                    
                    if 'id' not in evidence:
                        self.errors.append(f"State '{state_id}': evidence missing 'id'")
                    if 'owner_role' not in evidence:
                        self.warnings.append(f"State '{state_id}': evidence missing 'owner_role'")
            
            # Validate controls
            if 'controls' in state:
                for control in state['controls']:
                    if not isinstance(control, str):
                        self.errors.append(f"State '{state_id}': control must be string")
                        continue
                    
                    # Check if control file exists
                    control_file = self.controls_dir / f"{control}.yaml"
                    if not control_file.exists():
                        self.warnings.append(
                            f"State '{state_id}': control '{control}' file not found"
                        )
        
        return state_ids
    
    def validate_transitions(self, state_machine: Dict, state_ids: Set[str]) -> None:
        """Validate state transitions"""
        states = state_machine.get('states', [])
        
        for state in states:
            state_id = state.get('id')
            transitions = state.get('transitions', [])
            
            for transition in transitions:
                if 'to' not in transition:
                    self.errors.append(f"State '{state_id}': transition missing 'to' field")
                    continue
                
                target_state = transition['to']
                if target_state not in state_ids:
                    self.errors.append(
                        f"State '{state_id}': transition to undefined state '{target_state}'"
                    )
                
                # Validate guard structure
                if 'guard' in transition:
                    guard = transition['guard']
                    if not isinstance(guard, dict):
                        self.errors.append(
                            f"State '{state_id}': guard must be dict"
                        )
                    elif 'type' not in guard:
                        self.warnings.append(
                            f"State '{state_id}': guard missing 'type' field"
                        )
    
    def validate_initial_state(self, state_machine: Dict, state_ids: Set[str]) -> None:
        """Validate initial state exists"""
        initial_state = state_machine.get('initial_state')
        
        if not initial_state:
            self.errors.append("Missing 'initial_state' field")
        elif initial_state not in state_ids:
            self.errors.append(f"Initial state '{initial_state}' not defined in states")
    
    def validate_state_machine_file(self, file_path: Path) -> bool:
        """Validate a single state machine file"""
        print(f"\n{'='*60}")
        print(f"Validating: {file_path.name}")
        print(f"{'='*60}")
        
        self.errors = []
        self.warnings = []
        
        try:
            state_machine = self.load_yaml(file_path)
            
            # Run validations
            self.validate_schema(state_machine)
            state_ids = self.validate_states(state_machine)
            
            if state_ids:  # Only validate transitions if states are valid
                self.validate_transitions(state_machine, state_ids)
                self.validate_initial_state(state_machine, state_ids)
            
            # Report results
            if self.errors:
                print(f"{RED}✗ FAILED{RESET}")
                for error in self.errors:
                    print(f"  {RED}ERROR:{RESET} {error}")
            else:
                print(f"{GREEN}✓ PASSED{RESET}")
            
            if self.warnings:
                for warning in self.warnings:
                    print(f"  {YELLOW}WARNING:{RESET} {warning}")
            
            return len(self.errors) == 0
            
        except ValidationError as e:
            print(f"{RED}✗ FAILED:{RESET} {e}")
            return False
    
    def validate_all(self) -> bool:
        """Validate all state machine files"""
        print(f"\n{'#'*60}")
        print("# State Machine Validation")
        print(f"{'#'*60}")
        
        if not self.state_machines_dir.exists():
            print(f"{RED}ERROR:{RESET} State machines directory not found")
            return False
        
        # Find all YAML files except schema
        state_machine_files = [
            f for f in self.state_machines_dir.glob('*.yaml')
            if f.name != 'state_machine.schema.yaml'
        ]
        
        if not state_machine_files:
            print(f"{YELLOW}WARNING:{RESET} No state machine files found")
            return True
        
        results = []
        for file_path in state_machine_files:
            results.append(self.validate_state_machine_file(file_path))
        
        # Summary
        print(f"\n{'='*60}")
        print("SUMMARY")
        print(f"{'='*60}")
        passed = sum(results)
        total = len(results)
        print(f"Total: {total} | Passed: {GREEN}{passed}{RESET} | Failed: {RED}{total - passed}{RESET}")
        
        return all(results)

def main():
    """Main entry point"""
    repo_root = Path(__file__).parent.parent
    validator = StateMachineValidator(repo_root)
    
    success = validator.validate_all()
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()

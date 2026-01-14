'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

interface FormData {
  // Step 1: RWA Type
  assetType: string;
  assetSubtype: string;
  
  // Step 2: Jurisdiction
  jurisdiction: string;
  regulatoryFramework: string;
  
  // Step 3: Legal Wrapper
  legalStructure: string;
  entityName: string;
  entityJurisdiction: string;
  
  // Step 4: Distribution
  distributionMethod: string;
  investorType: string;
  maxInvestors: string;
  
  // Step 5: Asset Details
  projectName: string;
  description: string;
  totalValue: string;
  tokenSymbol: string;
  
  // Step 6: Economic Terms
  offeringSize: string;
  minInvestment: string;
  maxInvestment: string;
  expectedReturn: string;
  
  // Step 7: Custody & Banking
  custodian: string;
  bankingPartner: string;
  settlementCurrency: string;
  
  // Step 8: Attestation
  attestationConfirmed: boolean;
}

const initialFormData: FormData = {
  assetType: '',
  assetSubtype: '',
  jurisdiction: '',
  regulatoryFramework: '',
  legalStructure: '',
  entityName: '',
  entityJurisdiction: '',
  distributionMethod: '',
  investorType: '',
  maxInvestors: '',
  projectName: '',
  description: '',
  totalValue: '',
  tokenSymbol: '',
  offeringSize: '',
  minInvestment: '',
  maxInvestment: '',
  expectedReturn: '',
  custodian: '',
  bankingPartner: '',
  settlementCurrency: 'USD',
  attestationConfirmed: false,
};

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.projectName,
          description: formData.description,
          assetType: formData.assetType,
          jurisdiction: formData.jurisdiction,
          metadata: {
            assetSubtype: formData.assetSubtype,
            regulatoryFramework: formData.regulatoryFramework,
            legalStructure: formData.legalStructure,
            entityName: formData.entityName,
            entityJurisdiction: formData.entityJurisdiction,
            distributionMethod: formData.distributionMethod,
            investorType: formData.investorType,
            maxInvestors: formData.maxInvestors,
            totalValue: formData.totalValue,
            tokenSymbol: formData.tokenSymbol,
            offeringSize: formData.offeringSize,
            minInvestment: formData.minInvestment,
            maxInvestment: formData.maxInvestment,
            expectedReturn: formData.expectedReturn,
            custodian: formData.custodian,
            bankingPartner: formData.bankingPartner,
            settlementCurrency: formData.settlementCurrency,
          },
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        router.push(`/app/projects/${id}`);
      } else {
        alert('Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Project creation error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: 'RWA Type' },
    { number: 2, title: 'Jurisdiction' },
    { number: 3, title: 'Legal Wrapper' },
    { number: 4, title: 'Distribution' },
    { number: 5, title: 'Asset Details' },
    { number: 6, title: 'Economic Terms' },
    { number: 7, title: 'Custody & Banking' },
    { number: 8, title: 'Attestation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete the 8-step wizard to set up your RWA tokenization project
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step.number === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.number < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.number < currentStep ? '✓' : step.number}
                  </div>
                  <span className="mt-2 text-xs font-medium text-gray-600">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 1: Select RWA Type</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.assetType}
                  onChange={(e) => updateFormData({ assetType: e.target.value })}
                >
                  <option value="">Select asset type...</option>
                  <option value="EQUITY">Equity</option>
                  <option value="DEBT">Debt/Fixed Income</option>
                  <option value="FUND">Fund Interest</option>
                  <option value="COMMODITY">Commodity</option>
                  <option value="REAL_ESTATE">Real Estate</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Subtype</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Common Stock, Convertible Note, LP Interest"
                  value={formData.assetSubtype}
                  onChange={(e) => updateFormData({ assetSubtype: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 2: Jurisdiction & Compliance</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Jurisdiction</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.jurisdiction}
                  onChange={(e) => updateFormData({ jurisdiction: e.target.value })}
                >
                  <option value="">Select jurisdiction...</option>
                  <option value="US">United States</option>
                  <option value="US-DE">Delaware</option>
                  <option value="US-NY">New York</option>
                  <option value="SG">Singapore</option>
                  <option value="CH">Switzerland</option>
                  <option value="LU">Luxembourg</option>
                  <option value="UK">United Kingdom</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regulatory Framework</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.regulatoryFramework}
                  onChange={(e) => updateFormData({ regulatoryFramework: e.target.value })}
                >
                  <option value="">Select framework...</option>
                  <option value="REG_D_506B">Reg D 506(b)</option>
                  <option value="REG_D_506C">Reg D 506(c)</option>
                  <option value="REG_S">Reg S</option>
                  <option value="REG_A">Reg A+</option>
                  <option value="REG_CF">Reg CF</option>
                  <option value="MIFID_II">MiFID II</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 3: Legal Wrapper</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Legal Structure</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.legalStructure}
                  onChange={(e) => updateFormData({ legalStructure: e.target.value })}
                >
                  <option value="">Select structure...</option>
                  <option value="C_CORP">C Corporation</option>
                  <option value="LLC">Limited Liability Company</option>
                  <option value="LP">Limited Partnership</option>
                  <option value="SPV">Special Purpose Vehicle</option>
                  <option value="TRUST">Trust</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entity Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Acme RWA Holdings LLC"
                  value={formData.entityName}
                  onChange={(e) => updateFormData({ entityName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entity Jurisdiction</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Delaware, Cayman Islands"
                  value={formData.entityJurisdiction}
                  onChange={(e) => updateFormData({ entityJurisdiction: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 4: Distribution Method</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Distribution Method</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.distributionMethod}
                  onChange={(e) => updateFormData({ distributionMethod: e.target.value })}
                >
                  <option value="">Select method...</option>
                  <option value="PRIVATE">Private Placement</option>
                  <option value="PUBLIC">Public Offering</option>
                  <option value="CROWDFUNDING">Crowdfunding</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Investor Type</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.investorType}
                  onChange={(e) => updateFormData({ investorType: e.target.value })}
                >
                  <option value="">Select investor type...</option>
                  <option value="ACCREDITED_ONLY">Accredited Investors Only</option>
                  <option value="INSTITUTIONAL">Institutional Only</option>
                  <option value="RETAIL">Retail (Non-Accredited)</option>
                  <option value="MIXED">Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Number of Investors</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 99, 2000"
                  value={formData.maxInvestors}
                  onChange={(e) => updateFormData({ maxInvestors: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 5: Asset Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Downtown Office Building Series A"
                  value={formData.projectName}
                  onChange={(e) => updateFormData({ projectName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Describe the asset and tokenization structure..."
                  value={formData.description}
                  onChange={(e) => updateFormData({ description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Asset Value (USD)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10,000,000"
                  value={formData.totalValue}
                  onChange={(e) => updateFormData({ totalValue: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token Symbol</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., DOB1, ACME-A"
                  value={formData.tokenSymbol}
                  onChange={(e) => updateFormData({ tokenSymbol: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 6: Economic Terms</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Offering Size (USD)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 5,000,000"
                  value={formData.offeringSize}
                  onChange={(e) => updateFormData({ offeringSize: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Investment (USD)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10,000"
                  value={formData.minInvestment}
                  onChange={(e) => updateFormData({ minInvestment: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Investment (USD, optional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 500,000 (leave empty if no cap)"
                  value={formData.maxInvestment}
                  onChange={(e) => updateFormData({ maxInvestment: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return (%)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 8.5"
                  value={formData.expectedReturn}
                  onChange={(e) => updateFormData({ expectedReturn: e.target.value })}
                />
              </div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 7: Custody & Banking</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custodian</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Coinbase Custody, Fireblocks"
                  value={formData.custodian}
                  onChange={(e) => updateFormData({ custodian: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banking Partner</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Silicon Valley Bank, Signature Bank"
                  value={formData.bankingPartner}
                  onChange={(e) => updateFormData({ bankingPartner: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Settlement Currency</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={formData.settlementCurrency}
                  onChange={(e) => updateFormData({ settlementCurrency: e.target.value })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Step 8: Attestation</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>By creating this project, you attest that:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>All information provided is accurate and complete</li>
                        <li>You have authority to create this project</li>
                        <li>You will comply with all applicable regulations</li>
                        <li>You understand this creates a legally binding record</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="attestation"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={formData.attestationConfirmed}
                    onChange={(e) => updateFormData({ attestationConfirmed: e.target.checked })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="attestation" className="font-medium text-gray-700">
                    I confirm and attest to the above statements
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Next Steps</h3>
                <p className="text-sm text-blue-700">
                  After creating your project, the MCP system will automatically initialize compliance gates based on your selections. You'll be able to upload documents, request approvals, and track progress through the compliance workflow.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 8 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.attestationConfirmed || submitting}
                className="px-6 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating...' : 'Create Project'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

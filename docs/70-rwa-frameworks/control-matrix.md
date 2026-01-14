# RWA Control Matrix: Governance, Risk & Compliance Framework

> **Scope Notice**
>
> This control matrix documents common governance, risk, and compliance controls observed in institutional RWA tokenization projects as of January 2026. It is provided as a reference framework, not a complete compliance program. Each organization must design its own controls based on specific risk profile, regulatory obligations, and business model.

## Purpose

This Control Matrix provides a structured framework mapping:

* **Control Objectives** → What must be achieved
* **Control Activities** → How it's achieved (policies, procedures, technical controls)
* **Control Owner** → Who is responsible
* **Evidence Artifacts** → What proves the control is operating
* **Testing Cadence** → How often control effectiveness is verified

---

## How to Use This Matrix

**For New RWA Projects:**
1. Start with applicable control domains based on asset class
2. Assign control owners for each control
3. Document evidence artifacts (policies, procedures, reports)
4. Establish testing cadence
5. Track control deficiencies and remediation

**For Existing Projects:**
1. Map current controls to this framework
2. Identify control gaps
3. Prioritize remediation based on risk
4. Enhance evidence collection and testing

**Control Effectiveness Ratings:**
* **Effective:** Control is designed and operating as intended
* **Needs Improvement:** Control exists but has weaknesses
* **Ineffective:** Control does not achieve objective
* **Not Implemented:** Control does not exist

---

## Control Matrix

### Domain 1: Legal Structure & Documentation

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **1.1 Legal Structure Integrity** | SPV/fund formation documents are complete, executed, and legally enforceable | General Counsel | (1) Certificate of formation<br>(2) Operating/Partnership Agreement<br>(3) Legal opinion on enforceability | Annual review by external counsel | |
| **1.2 Offering Document Accuracy** | Offering documents (PPM, OM, Terms) accurately describe program, risks, and terms | General Counsel / CCO | (1) Offering document (dated and version-controlled)<br>(2) Legal review memo<br>(3) Disclosure committee meeting minutes | Updated upon material changes;<br>Annual review minimum | Must disclose all material risks |
| **1.3 Subscription Documentation** | Investor subscription agreements executed and complete before token issuance | Legal / Operations | (1) Executed subscription agreement (per investor)<br>(2) Investor representations checklist<br>(3) Cap table showing date of subscription | Per-transaction verification;<br>Quarterly cap table audit | No tokens issued without executed sub docs |
| **1.4 Custody Agreements** | Custody/vault agreements in place with qualified custodians | CFO / Operations | (1) Executed custody agreement<br>(2) Custodian due diligence report<br>(3) Insurance certificates (custodian and issuer) | Annual review;<br>Insurance renewal verification | Custodian must meet regulatory standards |
| **1.5 Service Provider Agreements** | All critical service providers (auditor, servicer, transfer agent, etc.) under written agreement | CFO / Operations | (1) Executed service agreements<br>(2) SOC 1/SOC 2 reports (where applicable)<br>(3) Performance SLAs and monitoring reports | Annual contract review;<br>Quarterly SLA monitoring | Include termination and replacement procedures |
| **1.6 Transfer Restrictions Documentation** | Transfer restrictions clearly documented and disclosed to investors | General Counsel | (1) Transfer restriction section in offering docs<br>(2) Investor acknowledgment (in sub agreement)<br>(3) Smart contract code implementing restrictions | Annual review;<br>Updated upon changes | Must be enforceable under applicable securities laws |

---

### Domain 2: Regulatory Compliance

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **2.1 Securities Registration Compliance** | Token issuance complies with applicable securities laws (Reg D, Reg S, Section 4(a)(2), or registered) | CCO / General Counsel | (1) Legal memo on securities law compliance<br>(2) Form D filing (if Reg D)<br>(3) Investor qualification records | Initial legal review before launch;<br>Annual compliance review | No unregistered public offerings |
| **2.2 Investment Company Act Compliance** | Structure complies with ICA exclusions (3(c)(1), 3(c)(7), or registered) | CCO / General Counsel | (1) Legal memo on ICA compliance<br>(2) Investor count tracking (if 3(c)(1): ≤100; 3(c)(7): ≤2,000 QPs)<br>(3) Quarterly cap table review | Quarterly investor count verification;<br>Annual legal review | Exceeding investor limits = registration required |
| **2.3 AML/KYC Program** | Comprehensive AML program per BSA/FinCEN requirements (if applicable) | AML Officer / CCO | (1) Written AML policies and procedures<br>(2) AML officer designation<br>(3) Risk assessment<br>(4) Training records<br>(5) Independent audit report (annual) | Annual independent audit;<br>Ongoing transaction monitoring | Precious metals dealers, MSBs, certain funds require AML program |
| **2.4 Sanctions Screening** | All investors and transactions screened against OFAC, UN, EU sanctions lists | AML Officer / Operations | (1) Sanctions screening policy<br>(2) Screening results (per investor, per transaction)<br>(3) Sanctions list updates log<br>(4) Blocked transaction reports | Per-transaction screening;<br>Daily sanctions list updates | Use reputable screening software (Chainalysis, Elliptic, Dow Jones) |
| **2.5 Tax Compliance** | Tax reporting and withholding obligations met (K-1s, 1099s, FATCA, CRS) | CFO / Tax Advisor | (1) Tax compliance calendar<br>(2) Issued tax forms (K-1, 1099-INT, 1099-OID, etc.)<br>(3) FATCA/CRS certifications<br>(4) Withholding tax calculations and remittances | Annual tax reporting cycle;<br>Quarterly withholding verification | Late or incorrect tax reporting = penalties |
| **2.6 Blue Sky Compliance** | State securities law compliance (if applicable) | General Counsel / CCO | (1) State securities law analysis<br>(2) State filings (if required)<br>(3) State notice filings (if required) | Per-offering basis;<br>Annual review of state law changes | Some states require notice filings even for Reg D offerings |

---

### Domain 3: Asset Custody & Control

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **3.1 Qualified Custodian** | Assets held by qualified custodian meeting regulatory standards | CFO / Operations | (1) Custodian due diligence report<br>(2) Regulatory status verification (bank, broker-dealer, trust company)<br>(3) FDIC/SIPC coverage documentation | Annual custodian review;<br>Quarterly financial health check | Investment Advisers Act Rule 206(4)-2 (if RIA) |
| **3.2 Asset Segregation** | Client assets segregated from issuer/custodian proprietary assets | CFO / Operations | (1) Custody account statements showing segregation<br>(2) Custodian attestation of segregation<br>(3) Independent audit confirmation | Monthly reconciliation;<br>Annual audit | Prevents commingling and ensures bankruptcy remoteness |
| **3.3 Daily Reconciliation** | Daily reconciliation of custodian holdings vs. issued tokens | Controller / Operations | (1) Daily reconciliation report<br>(2) Exception log and resolution tracking<br>(3) Month-end certification (signed by Controller) | **Daily** reconciliation;<br>Monthly supervisory review | Critical control to prevent over-issuance |
| **3.4 Insurance Coverage** | Adequate insurance covering asset loss (theft, fire, negligence) | CFO / Risk Manager | (1) Insurance policy (all-risk, crime/fidelity, cyber)<br>(2) Coverage adequacy analysis<br>(3) Claims history review<br>(4) Annual insurance renewal | Annual policy review;<br>Quarterly coverage adequacy check | Coverage should equal or exceed asset value |
| **3.5 Vault/Custodian Security** | Physical security controls at vault/custodian facility | Operations / Risk Manager | (1) Custodian SOC 2 Type II report<br>(2) Physical security assessment (if available)<br>(3) Insurance underwriter report<br>(4) Custodian financial audit | Annual SOC 2 review;<br>Periodic site visits (if material) | 24/7 monitoring, armed guards, multi-layer access controls |
| **3.6 Disaster Recovery** | Custodian has disaster recovery and business continuity plans | Operations / Risk Manager | (1) Custodian BCP/DR plan<br>(2) Annual BCP test results<br>(3) Backup custodian identified (if critical asset class) | Annual BCP review;<br>Test results verified | Ensures asset access in emergency scenarios |

---

### Domain 4: Token Issuance & Redemption

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **4.1 Pre-Issuance Verification** | Tokens only issued upon verified receipt of subscription funds and completion of KYC | Operations / Finance | (1) Subscription checklist (per investor)<br>(2) Bank statement showing funds received<br>(3) KYC completion certification<br>(4) Token minting log with approvals | Per-transaction verification;<br>Monthly sample testing | No tokens without cash and KYC |
| **4.2 Minting Authorization** | Token minting requires dual authorization (4-eyes principle) | Operations / IT | (1) Multi-sig wallet configuration (2-of-3 or 3-of-5)<br>(2) Minting approval log (requestor + approver)<br>(3) Transaction hashes on blockchain | Per-transaction logging;<br>Quarterly review of multi-sig controls | Prevents unauthorized token creation |
| **4.3 Redemption Request Verification** | Redemption requests verified (token holder identity, holdings balance, redemption terms) | Operations / Finance | (1) Redemption request (signed by investor)<br>(2) Wallet holdings verification<br>(3) Redemption terms checklist (notice period, fees, minimums)<br>(4) Redemption approval log | Per-transaction verification;<br>Monthly sample testing | Prevents fraudulent redemptions |
| **4.4 Burn Authorization** | Token burning requires dual authorization after cash/asset delivery confirmed | Operations / Finance | (1) Bank statement or delivery receipt<br>(2) Burn approval log (requestor + approver)<br>(3) Transaction hashes on blockchain | Per-transaction logging;<br>Quarterly review | Prevents premature burning before funds sent |
| **4.5 Cap Table Accuracy** | Cap table maintained accurately reflecting all issuances, transfers, and redemptions | Operations / Legal | (1) Cap table (current)<br>(2) Monthly cap table reconciliation to blockchain<br>(3) Annual cap table audit by external firm | Monthly reconciliation;<br>Annual independent audit | Critical for investor limits (3(c)(1), 3(c)(7)) and tax reporting |
| **4.6 Transfer Approval Process** | Secondary transfers reviewed and approved per transfer restrictions | Transfer Agent / Legal | (1) Transfer request<br>(2) Buyer qualification verification<br>(3) Transfer approval log<br>(4) On-chain transfer confirmation | Per-transfer verification;<br>Quarterly review of transfer logs | Ensures only qualified investors hold tokens |

---

### Domain 5: Valuation & NAV Calculation

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **5.1 Valuation Methodology** | Documented, consistent valuation methodology applied | CFO / Fund Administrator | (1) Valuation policy (written, board-approved)<br>(2) Valuation committee meeting minutes<br>(3) Independent valuation reports (for illiquid assets) | Annual policy review;<br>Updated upon methodology changes | Must follow GAAP or IFRS for funds |
| **5.2 NAV Calculation** | NAV calculated accurately per fund terms and disclosed timeline | Fund Administrator / CFO | (1) NAV calculation workpapers<br>(2) Fund administrator certification<br>(3) NAV distribution to investors (per terms) | Daily/Monthly/Quarterly (per fund terms);<br>Annual audit | Errors in NAV calculation = liability to investors |
| **5.3 Pricing Source Independence** | Pricing sources are independent and reliable (Bloomberg, Reuters, ICE, etc.) | CFO / Fund Administrator | (1) Pricing vendor agreements<br>(2) Pricing source documentation (per security)<br>(3) Pricing exception reports | Monthly pricing source review;<br>Annual vendor due diligence | Avoid reliance on non-independent or illiquid pricing |
| **5.4 Illiquid Asset Valuation** | Illiquid assets valued by independent third-party appraiser | CFO / Valuation Committee | (1) Appraisal reports (annual or quarterly)<br>(2) Appraiser qualifications (MAI, ASA, etc.)<br>(3) Valuation committee review minutes | Quarterly or annual appraisals;<br>Valuation committee review | Required for real estate, private credit, other illiquid assets |
| **5.5 Valuation Dispute Resolution** | Process for resolving NAV disputes or material valuation changes | CFO / General Counsel | (1) Valuation dispute policy<br>(2) Dispute log and resolution documentation<br>(3) Investor communications (if NAV restated) | As needed;<br>Annual policy review | Material NAV errors must be corrected and disclosed |

---

### Domain 6: Attestation, Audit & Reporting

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **6.1 Proof-of-Reserves** | Periodic proof-of-reserves attestation by independent auditor | CFO / Operations | (1) Proof-of-reserves attestation report<br>(2) Custodian statements<br>(3) On-chain supply verification<br>(4) Publication (website, on-chain hash) | **Quarterly minimum**;<br>Monthly for high-volume issuers | Critical for investor confidence |
| **6.2 Financial Audit** | Annual financial audit by reputable accounting firm | CFO | (1) Audited financial statements<br>(2) Auditor management letter (if any findings)<br>(3) Distribution to investors and regulators (if required) | **Annual** | Big 4 or top-tier regional firm preferred |
| **6.3 AML Independent Review** | Annual independent AML program review | AML Officer / CCO | (1) Independent AML audit report<br>(2) Deficiency log and remediation plan<br>(3) Board presentation on AML program effectiveness | **Annual** (required by FinCEN) | Independent reviewer must not be part of AML function |
| **6.4 SOC 1/SOC 2 Reports** | Service providers (custodian, fund administrator, servicer) provide SOC reports | Operations / CFO | (1) SOC 1 Type II (financial reporting controls)<br>(2) SOC 2 Type II (security, availability, confidentiality)<br>(3) Management review of exceptions | **Annual**;<br>Review within 30 days of receipt | SOC reports confirm control effectiveness at service providers |
| **6.5 Investor Reporting** | Timely, accurate reporting to investors per offering documents | Fund Administrator / Investor Relations | (1) Monthly/quarterly performance reports<br>(2) Tax reporting (K-1s, 1099s) on time<br>(3) Annual audited financials<br>(4) Distribution log showing timely delivery | Per offering document schedule;<br>Annual audit confirms timeliness | Late reporting = breach of contract with investors |
| **6.6 Regulatory Reporting** | All required regulatory filings made accurately and on time | CCO / CFO | (1) Form D (if Reg D)<br>(2) Form PF (if large private fund advisor)<br>(3) State filings (if applicable)<br>(4) CFTC/NFA filings (if commodity pool)<br>(5) Filing confirmation receipts | Per regulatory deadlines;<br>Compliance calendar maintained | Late filings = fines and reputational risk |

---

### Domain 7: Cybersecurity & Technology

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **7.1 Smart Contract Audit** | Smart contracts audited by reputable security firm before deployment | CTO / CISO | (1) Smart contract audit report (OpenZeppelin, Trail of Bits, ConsenSys Diligence, etc.)<br>(2) Remediation log (critical and high findings fixed)<br>(3) Final code verification | Pre-deployment (mandatory);<br>After material code changes | Unaudited contracts = high risk of exploits |
| **7.2 Multi-Sig Wallet Controls** | Admin functions (minting, burning, pause) require multi-signature approval | CTO / Operations | (1) Multi-sig configuration (2-of-3 or 3-of-5)<br>(2) Signer list and authorization matrix<br>(3) Transaction log with approvals | Quarterly review of signers;<br>Annual access recertification | Prevents single point of failure or rogue employee |
| **7.3 Access Controls** | Role-based access controls for all systems (admin panel, custodian portals, databases) | CTO / CISO | (1) Access control matrix (roles and permissions)<br>(2) User access logs<br>(3) Quarterly access reviews<br>(4) Termination checklist (access revoked immediately) | **Quarterly** access review;<br>Real-time termination process | Excessive or orphaned access = security risk |
| **7.4 Penetration Testing** | Annual penetration testing of platform and infrastructure | CISO / CTO | (1) Penetration test report<br>(2) Findings and remediation log<br>(3) Retest confirmation (critical findings fixed) | **Annual**;<br>After major platform changes | Identifies vulnerabilities before attackers do |
| **7.5 Incident Response Plan** | Documented incident response plan for security breaches, smart contract exploits, etc. | CISO / Operations | (1) Incident response plan (written, board-approved)<br>(2) Incident response team roster<br>(3) Annual tabletop exercise<br>(4) Incident log (if any incidents) | Annual plan review;<br>Annual tabletop exercise | Fast response limits damage in breach scenarios |
| **7.6 Backup & Recovery** | Regular backups of critical data; tested recovery procedures | CTO / IT | (1) Backup policy<br>(2) Backup logs (daily/weekly)<br>(3) Annual recovery test results<br>(4) Off-site backup storage confirmation | Daily backups;<br>**Annual** recovery test | Protects against ransomware, hardware failure, data corruption |
| **7.7 Blockchain Monitoring** | 24/7 monitoring of on-chain activity (large transfers, suspicious transactions, anomalies) | Operations / Compliance | (1) Blockchain monitoring alerts configuration<br>(2) Alert logs and response documentation<br>(3) Quarterly review of alert thresholds | **Real-time** monitoring;<br>Quarterly alert review | Detects unauthorized activity quickly |

---

### Domain 8: Operational Risk Management

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **8.1 Policies & Procedures Documentation** | Comprehensive written policies and procedures for all critical processes | COO / Operations | (1) Policy manual (version-controlled)<br>(2) Procedures (step-by-step for each process)<br>(3) Annual review and update log | **Annual** review and update;<br>Updated upon process changes | Undocumented processes = inconsistency and errors |
| **8.2 Segregation of Duties** | Key functions segregated to prevent fraud (e.g., payment approval vs execution) | COO / Internal Audit | (1) Segregation of duties matrix<br>(2) Exception log (if small team requires overrides)<br>(3) Compensating controls documentation | **Quarterly** review;<br>Annual internal audit | Single person should not control entire transaction |
| **8.3 Change Management** | Formal change management process for technology and operational changes | CTO / COO | (1) Change request log<br>(2) Change approval documentation<br>(3) Post-implementation review<br>(4) Rollback plan (for high-risk changes) | Per-change documentation;<br>Quarterly change review | Uncontrolled changes = outages and errors |
| **8.4 Vendor Risk Management** | Due diligence and ongoing monitoring of critical vendors | COO / CFO | (1) Vendor due diligence reports<br>(2) Vendor risk assessments<br>(3) SOC 2 reports (if available)<br>(4) Annual vendor performance reviews | Pre-onboarding due diligence;<br>**Annual** review | Vendor failures can be existential risks |
| **8.5 Key Person Risk** | Succession plans and cross-training to mitigate key person risk | CEO / COO | (1) Succession plan (for CEO, CTO, CFO, CCO)<br>(2) Cross-training documentation<br>(3) Knowledge management (documented processes) | Annual succession plan review;<br>Ongoing cross-training | Loss of key person should not cripple operations |
| **8.6 Error Correction Procedures** | Documented procedures for correcting operational errors (NAV errors, transfer errors, etc.) | COO / General Counsel | (1) Error correction policy<br>(2) Error log (root cause, correction, communication)<br>(3) Investor communications (if material) | As needed;<br>Annual policy review | Transparent, fair error correction builds trust |

---

### Domain 9: Investor Relations & Communications

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **9.1 Investor Onboarding** | Consistent, compliant investor onboarding process | Investor Relations / Legal | (1) Onboarding checklist<br>(2) Offering document delivery confirmation<br>(3) KYC completion records<br>(4) Subscription agreement execution | Per-investor verification;<br>Quarterly onboarding audit | All investors must receive offering docs and complete KYC |
| **9.2 Material Event Disclosure** | Material events disclosed promptly to investors | CEO / General Counsel | (1) Material event policy (defines "material")<br>(2) Disclosure log (event, date, communication)<br>(3) Investor communications (emails, notices) | As needed;<br>Annual policy review | Material events: NAV errors, defaults, regulatory actions, management changes |
| **9.3 Investor Complaint Handling** | Investor complaints logged, investigated, and resolved | Investor Relations / CCO | (1) Complaint log<br>(2) Investigation documentation<br>(3) Resolution and investor communication<br>(4) Escalation to board (if serious) | As needed;<br>Quarterly complaint review with board | Unresolved complaints = regulatory risk |
| **9.4 Investor Communications Archive** | All investor communications archived per regulatory requirements | Investor Relations / Legal | (1) Communications archive (emails, reports, notices)<br>(2) Retention policy (typically 6 years+)<br>(3) Annual compliance review | Ongoing archiving;<br>Annual retention policy review | Required for regulatory exams and litigation |

---

### Domain 10: Governance & Oversight

| Control Objective | Control Activity | Control Owner | Evidence Artifact | Testing Cadence | Notes |
|-------------------|------------------|---------------|-------------------|-----------------|-------|
| **10.1 Board Governance** | Active, informed board with fiduciary oversight responsibilities | Board / CEO | (1) Board charter and bylaws<br>(2) Quarterly board meeting minutes<br>(3) Annual board self-assessment<br>(4) Director independence verification | **Quarterly** board meetings minimum;<br>Annual charter review | Board must review financials, risks, compliance |
| **10.2 Conflicts of Interest Policy** | Conflicts of interest disclosed and managed per written policy | General Counsel / Board | (1) Conflicts of interest policy<br>(2) Annual director/officer questionnaires<br>(3) Conflict disclosure log<br>(4) Recusal documentation (if conflict exists) | **Annual** disclosure;<br>As conflicts arise | Undisclosed conflicts = breach of fiduciary duty |
| **10.3 Whistleblower Policy** | Confidential mechanism for reporting fraud, misconduct, or compliance violations | CCO / General Counsel | (1) Whistleblower policy<br>(2) Hotline or reporting mechanism<br>(3) Investigation log (if reports received)<br>(4) Annual board report on whistleblower activity | Annual policy review;<br>As reports received | Required by some regulations (e.g., SOX, Dodd-Frank) |
| **10.4 Code of Conduct** | Written code of conduct for directors, officers, and employees | General Counsel / HR | (1) Code of conduct (written, board-approved)<br>(2) Annual acknowledgment (signed by all personnel)<br>(3) Training records<br>(4) Violation log and disciplinary actions | **Annual** acknowledgment;<br>Updated as needed | Sets ethical standards and expectations |
| **10.5 Risk Committee** | Risk committee (or board committee) actively monitoring enterprise risks | Board / Risk Committee | (1) Risk committee charter<br>(2) Quarterly risk committee meeting minutes<br>(3) Enterprise risk register<br>(4) Risk mitigation plans | **Quarterly** risk committee meetings;<br>Annual charter review | Identifies and monitors top enterprise risks |
| **10.6 Compliance Committee** | Compliance committee (or function) overseeing regulatory compliance | CCO / Compliance Committee | (1) Compliance committee charter<br>(2) Quarterly compliance committee meeting minutes<br>(3) Compliance calendar (deadlines tracked)<br>(4) Compliance deficiency log and remediation | **Quarterly** compliance meetings;<br>Ongoing monitoring | Ensures regulatory obligations are met |

---

## Control Domain Summary

| Domain | # of Controls | Critical Controls | Owner(s) |
|--------|---------------|-------------------|----------|
| **1. Legal Structure & Documentation** | 6 | 1.2, 1.3, 1.4 | General Counsel, CFO |
| **2. Regulatory Compliance** | 6 | 2.1, 2.2, 2.3, 2.4 | CCO, General Counsel, AML Officer |
| **3. Asset Custody & Control** | 6 | 3.1, 3.2, 3.3 | CFO, Operations |
| **4. Token Issuance & Redemption** | 6 | 4.1, 4.2, 4.5 | Operations, Finance |
| **5. Valuation & NAV Calculation** | 5 | 5.1, 5.2 | CFO, Fund Administrator |
| **6. Attestation, Audit & Reporting** | 6 | 6.1, 6.2, 6.3 | CFO, CCO |
| **7. Cybersecurity & Technology** | 7 | 7.1, 7.2, 7.3, 7.5 | CTO, CISO |
| **8. Operational Risk Management** | 6 | 8.1, 8.2, 8.4 | COO |
| **9. Investor Relations & Communications** | 4 | 9.1, 9.2 | Investor Relations, CEO |
| **10. Governance & Oversight** | 6 | 10.1, 10.2, 10.5, 10.6 | Board, General Counsel |
| **TOTAL** | **58** | **26 critical** | — |

---

## Control Testing & Monitoring

### Testing Types

**1. Management Self-Assessment (Ongoing)**
* Control owners verify controls are operating
* Monthly or quarterly self-certification
* Evidence: Signed certifications

**2. Compliance Monitoring (Quarterly)**
* CCO or compliance team tests sample of transactions
* Verification of adherence to policies and procedures
* Evidence: Compliance testing reports

**3. Internal Audit (Annual)**
* Independent internal audit function (if large enough) or external consultant
* Tests design and operating effectiveness of key controls
* Evidence: Internal audit reports, management action plans

**4. External Audit (Annual)**
* External auditor tests controls related to financial reporting (SOC 1)
* May test operational controls if SOC 2 engagement
* Evidence: Audit opinions, management letters

**5. Regulatory Exam (Periodic)**
* SEC, CFTC, state regulators may examine controls
* Focus on compliance with securities, AML, and investor protection rules
* Evidence: Exam findings, remediation plans

---

## Control Deficiency Management

### Deficiency Classification

| Severity | Definition | Remediation Timeline | Escalation |
|----------|------------|----------------------|------------|
| **Critical** | Control does not exist or is completely ineffective; material risk of loss or regulatory violation | Immediate (within 30 days) | Board, CEO, CCO |
| **High** | Control has significant weakness; elevated risk but mitigating factors exist | 90 days | CEO, CCO, functional head |
| **Medium** | Control has minor weakness; low immediate risk | 180 days | Functional head, compliance |
| **Low** | Best practice improvement; no material risk | 365 days | Functional head |

### Remediation Process

1. **Identification:** Control deficiency identified via testing, audit, or incident
2. **Documentation:** Deficiency logged in deficiency tracker (control #, description, root cause, severity)
3. **Ownership:** Control owner assigned to remediate
4. **Action Plan:** Written action plan with milestones and target completion date
5. **Monitoring:** CCO or internal audit tracks remediation progress
6. **Validation:** Remediation validated via retest
7. **Closure:** Deficiency closed upon successful retest

**Escalation:** Overdue remediation items escalated to senior management and board

---

## Asset Class-Specific Control Considerations

### Treasuries / Money Market Funds

**Additional Controls:**
* **Daily Liquidity:** Monitor fund liquidity vs redemption requests (prevent run on fund)
* **Credit Risk:** If investing in anything other than U.S. Treasuries, credit analysis required
* **SEC Rule 2a-7 Compliance:** If registered MMF, extensive additional controls (weighted average maturity, credit quality, diversification, stress testing)

### Private Credit / Loan Participations

**Additional Controls:**
* **Loan Underwriting:** Credit analysis and approval by credit committee before acquisition
* **Servicer Oversight:** Monthly review of servicer reports, annual servicer audit
* **Default Management:** Defined process for handling defaults (foreclosure, workout, liquidation)
* **Collateral Monitoring:** Quarterly appraisals of collateral (if secured lending)

### Commodities / Precious Metals

**Additional Controls:**
* **Vault Inspection:** Annual physical vault inspection by auditor
* **Assay Verification:** Independent assayer verifies purity and weight
* **Insurance:** Adequate all-risk insurance for full replacement value
* **Redemption Capacity:** Ability to deliver physical metal (if large redemptions)

### Real Estate

**Additional Controls:**
* **Property Management Oversight:** Quarterly review of property manager financials and performance
* **Annual Appraisal:** Independent appraisal by MAI or ASA designated appraiser
* **Property Insurance:** Property and liability insurance (annually renewed)
* **Lease Administration:** If rental property, lease tracking and tenant credit monitoring

### Carbon Credits

**Additional Controls:**
* **Registry Integration:** Real-time sync with Verra, Gold Standard, or other registry
* **Retirement Tracking:** Prevent double-counting (retired credits cannot be transferred)
* **Project Verification:** Verify carbon offset projects are legitimate and certified
* **Additionality Review:** Ensure credits represent genuine emissions reductions

---

## Compliance Calendar (Annual)

| Month | Key Compliance Activities |
|-------|---------------------------|
| **January** | • Q4 board meeting<br>• Annual budgeting and planning<br>• Year-end financial close |
| **February** | • Annual financial audit begins<br>• AML independent review<br>• SOC 2 Type II report review (if received) |
| **March** | • K-1s issued (partnerships)<br>• Annual investor reports distributed<br>• Q1 board meeting |
| **April** | • Audited financial statements finalized<br>• Tax filings (if applicable)<br>• Form D amendment (if material changes) |
| **May** | • Annual compliance training<br>• Code of conduct annual acknowledgment<br>• Conflicts of interest annual disclosure |
| **June** | • Q2 board meeting<br>• Mid-year compliance review<br>• Insurance renewals (review and negotiate) |
| **July** | • Disaster recovery tabletop exercise<br>• Penetration testing (if annual cycle) |
| **August** | • Annual access recertification<br>• Vendor risk assessments |
| **September** | • Q3 board meeting<br>• Annual strategic planning<br>• Form PF filing (if required, by 11/30 but planning begins now) |
| **October** | • Annual smart contract audit (if code changes)<br>• Annual backup recovery test |
| **November** | • Year-end planning (tax, audit, reporting)<br>• Annual policy review (all policies) |
| **December** | • Q4 board meeting<br>• Year-end financial planning<br>• Annual compliance assessment and priorities for next year |

---

## Key Performance Indicators (KPIs) for Control Effectiveness

| KPI | Target | Measurement Frequency | Owner |
|-----|--------|----------------------|-------|
| **% Critical Controls Effective** | 100% | Quarterly | CCO |
| **# Open Critical Deficiencies** | 0 | Monthly | CCO |
| **% Overdue Remediation Items** | <5% | Monthly | CCO |
| **Days to Close Critical Deficiencies** | <30 days | Per deficiency | Functional heads |
| **% Clean Audits (No Material Weaknesses)** | 100% | Annual | CFO |
| **% Timely Regulatory Filings** | 100% | Ongoing | CCO |
| **# Customer Complaints** | <10 per year | Monthly | Investor Relations |
| **# Security Incidents** | 0 material incidents | Monthly | CISO |
| **Proof-of-Reserves Timeliness** | On time (quarterly) | Quarterly | CFO |
| **Investor Reporting Timeliness** | 100% on time | Monthly/Quarterly | Fund Administrator |

---

## Integration with AYG Platform Controls

### AYG-Specific Considerations

The AYG Insurance & Financial Services platform has additional control requirements due to its ERISA and insurance regulatory context:

**ERISA-Specific Controls:**
* **Plan Asset Boundary:** Quarterly legal review confirming RWAs do not constitute ERISA plan assets
* **Fiduciary Compliance:** Annual ERISA counsel review of fiduciary duties and compliance
* **Prohibited Transactions:** Ongoing monitoring to ensure no prohibited transactions (IRC §4975)
* **Plan Document Compliance:** Annual review of MEPs, FSAs, ATAs, Cafeteria Plans for compliance

**Insurance Regulatory Controls:**
* **MEC Status Maintenance:** Ongoing monitoring to ensure policy remains MEC-qualifying
* **Insurance License Compliance:** Annual verification of all required insurance licenses (state-specific)
* **State Insurance Law Compliance:** Quarterly review of state insurance law changes

**Wellness Program Controls:**
* **ACA Wellness Compliance:** Annual review of wellness program design for compliance (participatory vs health-contingent, incentive limits, reasonable alternatives)
* **HIPAA Privacy:** Ongoing HIPAA compliance for protected health information (PHI)

**RWA Integration Boundary Controls:**
* **Layered Architecture Verification:** Quarterly confirmation that RWAs remain at Layer 5 (Capital) and do not drift into Layer 1 (Regulated Program)
* **Non-Entitlement Verification:** Annual legal review confirming RWAs do not represent entitlements to insurance benefits

See `/docs/ayg-platform/02-legal-compliance/rwa-boundary-analysis.md` for full legal boundary framework.

---

## Document Control

**Version:** 1.0  
**Date:** January 2026  
**Last Updated:** January 13, 2026  
**Next Review:** Quarterly or upon material regulatory/operational changes

**Maintained By:** Chief Compliance Officer / General Counsel  
**Approved By:** Board of Directors

**References:**
* Asset Class Registry (for asset-specific controls)
* Execution Playbooks (for operational procedures)
* AYG Platform Documentation (for platform-specific controls)

---

> **Disclaimer:** This Control Matrix is provided for informational purposes only and does not constitute legal, regulatory, or compliance advice. Each organization must design its own control framework based on specific risk profile, regulatory obligations, asset classes, and business model. Controls should be tailored to the size, complexity, and risk tolerance of the organization. Consult qualified legal, compliance, and audit professionals before implementing any control framework.

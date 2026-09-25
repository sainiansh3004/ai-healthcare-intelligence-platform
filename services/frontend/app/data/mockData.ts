export interface ClaimRecord {
  id: string;
  claimNumber: string;
  patientName: string;
  patientDob: string;
  patientMrn: string;
  providerName: string;
  providerNpi: string;
  facility: string;
  serviceDate: string;
  diagnosisCode: string;
  diagnosisDesc: string;
  procedureCode: string;
  procedureDesc: string;
  billedAmount: number;
  approvedAmount: number;
  status: "approved" | "pending" | "flagged" | "denied";
  riskScore: number; // 0 - 100
  riskLevel: "low" | "medium" | "high";
  aiConfidence: number; // percentage
  policyMatch: string;
  fraudAlerts: string[];
  adjudicationNote: string;
}

export interface DocumentSample {
  id: string;
  title: string;
  documentType: "Discharge Summary" | "Radiology MRI Report" | "Surgical Operative Note" | "Cardiology Lab Panel";
  facility: string;
  uploadedAt: string;
  fileSize: string;
  ocrConfidence: number;
  status: "processed" | "analyzing" | "review_needed";
  rawText: string;
  extractedEntities: {
    patient: { name: string; mrn: string; dob: string; sex: string };
    diagnoses: { code: string; name: string; confidence: number; category: string }[];
    procedures: { code: string; name: string; units: number; allowable: number }[];
    medications: { name: string; dosage: string; frequency: string; route: string }[];
    clinicalFlags: string[];
  };
}

export interface RagPolicy {
  id: string;
  code: string;
  title: string;
  payer: string;
  effectiveDate: string;
  category: string;
  summary: string;
  criteria: string[];
  icd10Covered: string[];
  contraindications: string[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: "success" | "warning" | "blocked";
  sha256Hash: string;
}

export const INITIAL_CLAIMS: ClaimRecord[] = [
  {
    id: "CLM-90214",
    claimNumber: "CLM-2026-90214",
    patientName: "Eleanor Vance",
    patientDob: "1968-04-12",
    patientMrn: "MRN-88219",
    providerName: "Dr. Marcus Chen, MD",
    providerNpi: "1942850192",
    facility: "Metropolis Orthopedic Institute",
    serviceDate: "2026-09-21",
    diagnosisCode: "M54.5",
    diagnosisDesc: "Low back pain, non-radicular chronic",
    procedureCode: "72148",
    procedureDesc: "MRI Lumbar Spine without contrast",
    billedAmount: 1850.00,
    approvedAmount: 1240.00,
    status: "approved",
    riskScore: 8,
    riskLevel: "low",
    aiConfidence: 98.4,
    policyMatch: "CMS LCD L34211: Diagnostic Lumbar MRI Protocol",
    fraudAlerts: [],
    adjudicationNote: "Auto-approved. Conservative physical therapy completed (6+ weeks documented in EHR attachment).",
  },
  {
    id: "CLM-90215",
    claimNumber: "CLM-2026-90215",
    patientName: "David K. Ross",
    patientDob: "1982-11-03",
    patientMrn: "MRN-44912",
    providerName: "Dr. Sarah Al-Mansoor, MD",
    providerNpi: "1821039941",
    facility: "Bayfront Emergency Center",
    serviceDate: "2026-09-22",
    diagnosisCode: "I20.0",
    diagnosisDesc: "Unstable angina with ischemic changes",
    procedureCode: "93458",
    procedureDesc: "Coronary angiogram with catheterization",
    billedAmount: 6400.00,
    approvedAmount: 5120.00,
    status: "approved",
    riskScore: 14,
    riskLevel: "low",
    aiConfidence: 96.1,
    policyMatch: "Aetna CPB 0229: Cardiac Catheterization Guidelines",
    fraudAlerts: [],
    adjudicationNote: "Emergency encounter verified. Troponin elevation and ECG telemetry attached. Meets urgent criteria.",
  },
  {
    id: "CLM-90216",
    claimNumber: "CLM-2026-90216",
    patientName: "Robert Kowalski",
    patientDob: "1954-07-29",
    patientMrn: "MRN-31092",
    providerName: "Dr. Gregory Vance, DO",
    providerNpi: "1093847120",
    facility: "Apex Pain & Rehabilitation Clinic",
    serviceDate: "2026-09-23",
    diagnosisCode: "M79.7",
    diagnosisDesc: "Fibromyalgia and somatic pain syndrome",
    procedureCode: "99215",
    procedureDesc: "Office visit, high complexity (40+ mins)",
    billedAmount: 495.00,
    approvedAmount: 0.00,
    status: "flagged",
    riskScore: 78,
    riskLevel: "high",
    aiConfidence: 89.2,
    policyMatch: "E&M Coding Rule AMA-2024: Upcoding Anomaly",
    fraudAlerts: [
      "Potential Upcoding: 92% of provider visits billed as highest tier (99215 vs peer benchmark 14%)",
      "Overlapping time stamps with claim CLM-90188 for same provider"
    ],
    adjudicationNote: "Suspended for manual audit. High frequency anomaly detected on provider NPI. Clinical note lacks medical decision-making complexity.",
  },
  {
    id: "CLM-90217",
    claimNumber: "CLM-2026-90217",
    patientName: "Aaliyah Washington",
    patientDob: "1995-02-17",
    patientMrn: "MRN-72304",
    providerName: "Dr. Emily Tran, MD",
    providerNpi: "1482910395",
    facility: "University Dermatology Pavilion",
    serviceDate: "2026-09-23",
    diagnosisCode: "L40.0",
    diagnosisDesc: "Psoriasis vulgaris with extensive plaque",
    procedureCode: "J0135",
    procedureDesc: "Adalimumab (Humira) injection 20mg",
    billedAmount: 3200.00,
    approvedAmount: 2680.00,
    status: "pending",
    riskScore: 32,
    riskLevel: "medium",
    aiConfidence: 91.5,
    policyMatch: "BCBS Policy 08.01.12: Biologic Pre-Authorization",
    fraudAlerts: [
      "Missing prior-authorization referral token from primary rheumatologist"
    ],
    adjudicationNote: "Awaiting prior authorization clearance. Step-therapy criteria for Methotrexate verified.",
  },
  {
    id: "CLM-90218",
    claimNumber: "CLM-2026-90218",
    patientName: "Harold Jenkins",
    patientDob: "1949-09-08",
    patientMrn: "MRN-19402",
    providerName: "Dr. Arthur Pendelton, MD",
    providerNpi: "1720394819",
    facility: "Summit Joint Replacement Specialty Center",
    serviceDate: "2026-09-24",
    diagnosisCode: "M17.11",
    diagnosisDesc: "Unilateral primary osteoarthritis, right knee",
    procedureCode: "27447",
    procedureDesc: "Total knee arthroplasty (TKA)",
    billedAmount: 19800.00,
    approvedAmount: 16250.00,
    status: "approved",
    riskScore: 11,
    riskLevel: "low",
    aiConfidence: 97.9,
    policyMatch: "CMS LCD L33924: Lower Extremity Major Joint Reconstruction",
    fraudAlerts: [],
    adjudicationNote: "Weight-bearing X-rays show Kellgren-Lawrence Grade IV joint space obliteration. Auto-approved.",
  },
  {
    id: "CLM-90219",
    claimNumber: "CLM-2026-90219",
    patientName: "Maria Santos",
    patientDob: "1977-06-30",
    patientMrn: "MRN-56291",
    providerName: "Dr. Jason Miller, MD",
    providerNpi: "1129384019",
    facility: "Horizon Ambulatory Surgery Center",
    serviceDate: "2026-09-24",
    diagnosisCode: "K80.20",
    diagnosisDesc: "Calculus of gallbladder without cholecystitis",
    procedureCode: "47562",
    procedureDesc: "Laparoscopic cholecystectomy",
    billedAmount: 8900.00,
    approvedAmount: 0.00,
    status: "denied",
    riskScore: 84,
    riskLevel: "high",
    aiConfidence: 94.7,
    policyMatch: "Medicare NCCI Bundling Edit Ed.30.2",
    fraudAlerts: [
      "Unbundled billing detected: Separate laparoscopy exploration billed simultaneously",
      "Duplicate claim submission within 72 hours of CLM-89981"
    ],
    adjudicationNote: "Denied under NCCI Chapter 6 mutually exclusive edit. Duplicate encounter token detected.",
  },
  {
    id: "CLM-90220",
    claimNumber: "CLM-2026-90220",
    patientName: "Liam O'Connor",
    patientDob: "1991-12-14",
    patientMrn: "MRN-90281",
    providerName: "Dr. Rachel Green, MD",
    providerNpi: "1672839102",
    facility: "Metropolis General Hospital",
    serviceDate: "2026-09-25",
    diagnosisCode: "E11.65",
    diagnosisDesc: "Type 2 diabetes mellitus with hyperglycemia",
    procedureCode: "83036",
    procedureDesc: "Hemoglobin A1c quantitative test",
    billedAmount: 115.00,
    approvedAmount: 64.00,
    status: "approved",
    riskScore: 4,
    riskLevel: "low",
    aiConfidence: 99.8,
    policyMatch: "Preventive Care Standard Protocol HEDIS-DM",
    fraudAlerts: [],
    adjudicationNote: "Routine diabetic quarterly surveillance. Clean automated adjudication.",
  },
  {
    id: "CLM-90221",
    claimNumber: "CLM-2026-90221",
    patientName: "Claire Dupont",
    patientDob: "1988-08-20",
    patientMrn: "MRN-67124",
    providerName: "Dr. Victor Morales, MD",
    providerNpi: "1892019482",
    facility: "Premier Neuro-Imaging Center",
    serviceDate: "2026-09-25",
    diagnosisCode: "G43.909",
    diagnosisDesc: "Migraine, unspecified, not intractable",
    procedureCode: "70553",
    procedureDesc: "MRI Brain with and without contrast",
    billedAmount: 2450.00,
    approvedAmount: 0.00,
    status: "pending",
    riskScore: 58,
    riskLevel: "medium",
    aiConfidence: 87.4,
    policyMatch: "UnitedHealthcare Policy 2026T0431S: Neuroimaging",
    fraudAlerts: [
      "Clinical notes do not document red-flag neurologic deficits or trial of triptans/prophylaxis"
    ],
    adjudicationNote: "Medical necessity review requested. No documented focal neurological signs justifying advanced imaging.",
  }
];

export const SAMPLE_DOCUMENTS: DocumentSample[] = [
  {
    id: "DOC-2026-001",
    title: "Inpatient Discharge Summary - Vance, Eleanor",
    documentType: "Discharge Summary",
    facility: "Metropolis Orthopedic Institute",
    uploadedAt: "10 minutes ago",
    fileSize: "2.4 MB (PDF)",
    ocrConfidence: 99.2,
    status: "processed",
    rawText: `METROPOLIS ORTHOPEDIC INSTITUTE
PATIENT: Eleanor Vance | DOB: 04/12/1968 | MRN: 88219
ATTENDING: Marcus Chen, MD (NPI: 1942850192)
DATE OF SERVICE: 09/21/2026

PRIMARY ADMISSION DIAGNOSIS:
Chronic intractable axial low back pain with intermittent L5 radiculopathy symptoms (ICD-10 M54.5, M54.16).

HISTORY OF PRESENT ILLNESS:
The patient is a 58-year-old female presenting with 9 months of worsening lumbar spine pain failing conservative medical management including 12 weeks of structured physical therapy, oral NSAIDs (Meloxicam 15mg QD), and home exercise regimen.

PROCEDURES PERFORMED:
High-resolution magnetic resonance imaging of lumbar spine without intravenous contrast (CPT 72148).
Findings reveal L4-L5 broad-based disc protrusion causing moderate canal stenosis and left lateral recess narrowing without cord compression.

MEDICATIONS PRESCRIBED:
- Gabapentin 300mg PO TID
- Cyclobenzaprine 5mg PO QHS PRN muscle spasm
- Acetaminophen 500mg PO Q6H PRN pain

DISPOSITION:
Discharged home in stable condition. Scheduled for follow-up with spine physiatry in 2 weeks.`,
    extractedEntities: {
      patient: { name: "Eleanor Vance", mrn: "MRN-88219", dob: "1968-04-12", sex: "Female" },
      diagnoses: [
        { code: "M54.5", name: "Low back pain, non-radicular chronic", confidence: 99.4, category: "Musculoskeletal" },
        { code: "M54.16", name: "Radiculopathy, lumbar region", confidence: 98.1, category: "Nervous System" },
        { code: "M48.06", name: "Spinal stenosis, lumbar region", confidence: 96.8, category: "Musculoskeletal" },
      ],
      procedures: [
        { code: "72148", name: "MRI Lumbar Spine without contrast", units: 1, allowable: 1240.00 },
        { code: "99232", name: "Subsequent hospital care, moderate", units: 1, allowable: 135.00 },
      ],
      medications: [
        { name: "Gabapentin", dosage: "300mg", frequency: "TID", route: "Oral" },
        { name: "Cyclobenzaprine", dosage: "5mg", frequency: "QHS PRN", route: "Oral" },
        { name: "Acetaminophen", dosage: "500mg", frequency: "Q6H PRN", route: "Oral" },
      ],
      clinicalFlags: [
        "Conservative therapy requirement verified (12 weeks documented)",
        "No surgical contraindications identified",
        "HIPAA identifiers de-identified & verified against master patient index"
      ],
    }
  },
  {
    id: "DOC-2026-002",
    title: "Cardiology Angiography Report - Ross, David",
    documentType: "Radiology MRI Report",
    facility: "Bayfront Emergency Center",
    uploadedAt: "38 minutes ago",
    fileSize: "4.1 MB (PDF + DICOM)",
    ocrConfidence: 98.7,
    status: "processed",
    rawText: `BAYFRONT EMERGENCY CENTER - CATH LAB SUITE 2
PATIENT: David K. Ross | DOB: 11/03/1982 | MRN: 44912
PRIMARY OPERATOR: Dr. Sarah Al-Mansoor, MD (NPI: 1821039941)

CLINICAL INDICATION:
Acute coronary syndrome with ST-segment depression in V4-V6 and positive high-sensitivity Troponin-I (480 ng/L).

PROCEDURE SUMMARY:
Left heart catheterization, selective coronary arteriography, and left ventriculography (CPT 93458).
Vascular access achieved via right radial artery with 6 French sheath.
Angiography demonstrated 85% proximal LAD stenosis. Successful deployment of 3.5 x 18mm drug-eluting stent.
Post-procedure TIMI 3 flow achieved with 0% residual stenosis.

DIAGNOSIS:
ICD-10: I20.0 (Unstable angina), I25.10 (Atherosclerotic heart disease).`,
    extractedEntities: {
      patient: { name: "David K. Ross", mrn: "MRN-44912", dob: "1982-11-03", sex: "Male" },
      diagnoses: [
        { code: "I20.0", name: "Unstable angina with ischemic changes", confidence: 99.8, category: "Circulatory" },
        { code: "I25.10", name: "Atherosclerotic heart disease of native coronary artery", confidence: 98.9, category: "Circulatory" },
      ],
      procedures: [
        { code: "93458", name: "Left heart catheterization with coronary angiogram", units: 1, allowable: 5120.00 },
        { code: "92928", name: "Percutaneous transcatheter coronary stent (LAD)", units: 1, allowable: 3840.00 },
      ],
      medications: [
        { name: "Aspirin", dosage: "81mg", frequency: "Daily", route: "Oral" },
        { name: "Ticagrelor", dosage: "90mg", frequency: "BID", route: "Oral" },
        { name: "Atorvastatin", dosage: "80mg", frequency: "Daily", route: "Oral" },
      ],
      clinicalFlags: [
        "Emergency classification verified (meets instant adjudication exemption)",
        "Radial access artery closure device verified",
        "Dual antiplatelet therapy protocol confirmed"
      ],
    }
  },
  {
    id: "DOC-2026-003",
    title: "Clinic Visit Note - Suspicious E&M Upcoding Audit",
    documentType: "Discharge Summary",
    facility: "Apex Pain & Rehabilitation Clinic",
    uploadedAt: "2 hours ago",
    fileSize: "1.1 MB (PDF)",
    ocrConfidence: 96.4,
    status: "review_needed",
    rawText: `APEX PAIN & REHABILITATION CLINIC
PATIENT: Robert Kowalski | MRN: 31092 | DOB: 07/29/1954
PROVIDER: Dr. Gregory Vance, DO (NPI: 1093847120)

CHIEF COMPLAINT:
Follow up chronic diffuse muscle pain and joint stiffness.

NOTE CONTENT:
Patient states pain is 6/10 today. Exam shows diffuse tender points. Vital signs stable.
Refilled medication. Advised to stay hydrated and continue walking.
Total encounter time: 42 minutes. (Billed: CPT 99215).`,
    extractedEntities: {
      patient: { name: "Robert Kowalski", mrn: "MRN-31092", dob: "1954-07-29", sex: "Male" },
      diagnoses: [
        { code: "M79.7", name: "Fibromyalgia", confidence: 95.2, category: "Musculoskeletal" },
      ],
      procedures: [
        { code: "99215", name: "Office visit, established, level 5 (High complexity)", units: 1, allowable: 210.00 },
      ],
      medications: [
        { name: "Duloxetine", dosage: "60mg", frequency: "Daily", route: "Oral" },
      ],
      clinicalFlags: [
        "FLAG: Insufficient medical decision making for Level 5 E&M code",
        "FLAG: Documentation length (4 sentences) discordant with 40-minute counseling billing requirement",
        "FLAG: Provider bills 99215 at 6.8x regional specialty average"
      ],
    }
  }
];

export const CLINICAL_POLICIES: RagPolicy[] = [
  {
    id: "POL-001",
    code: "CMS-LCD-L34211",
    title: "Magnetic Resonance Imaging (MRI) of the Lumbar Spine",
    payer: "Centers for Medicare & Medicaid Services (CMS)",
    effectiveDate: "2026-01-01",
    category: "Radiology & Diagnostic Imaging",
    summary: "Establishes clinical indications, prior-authorization thresholds, and conservative treatment criteria for coverage of lumbar MRI scans.",
    criteria: [
      "Documented persistent low back pain unresponsive to at least 6 weeks of supervised conservative medical management (PT, chiropractic, medication)",
      "OR presence of acute 'red flag' symptoms: progressive neurological deficit, cauda equina syndrome, fever with spinal tenderness, or known active malignancy",
      "Must include documented physical examination specifying neurological status (reflexes, sensation, motor strength)"
    ],
    icd10Covered: ["M54.5", "M54.16", "M51.26", "M48.06", "G83.4"],
    contraindications: [
      "Uncomplicated acute lower back pain of less than 6 weeks duration without neurological deficits",
      "Routine screening in the absence of documented focal clinical findings"
    ]
  },
  {
    id: "POL-002",
    code: "BCBS-MED-080112",
    title: "Tumor Necrosis Factor (TNF) Inhibitors & Biologics Prior Authorization",
    payer: "Blue Cross Blue Shield National Guidelines",
    effectiveDate: "2026-03-15",
    category: "Specialty Pharmacy & Immunology",
    summary: "Step therapy protocols and criteria for approval of self-administered subcutaneous TNF-alpha antagonists including Adalimumab (Humira), Etanercept, and Biosimilars.",
    criteria: [
      "Documented trial and failure, contraindication, or intolerance to at least one non-biologic DMARD (e.g. Methotrexate, Sulfasalazine, or Leflunomide) for >= 3 months",
      "Negative baseline tuberculin purified protein derivative (PPD) or interferon-gamma release assay (IGRA) within previous 12 months",
      "Approved indications: Severe Plaque Psoriasis (BSA >= 10%), Psoriatic Arthritis, Active Rheumatoid Arthritis, Ankylosing Spondylitis"
    ],
    icd10Covered: ["L40.0", "M05.79", "M07.3", "M45.9"],
    contraindications: [
      "Active systemic tuberculosis or serious opportunistic infection",
      "Concurrent therapy with another biologic DMARD or targeted synthetic DMARD"
    ]
  },
  {
    id: "POL-003",
    code: "AET-CPB-0229",
    title: "Coronary Angiography and Percutaneous Coronary Intervention",
    payer: "Aetna Clinical Policy Bulletins",
    effectiveDate: "2026-02-01",
    category: "Cardiovascular Surgery & Intervention",
    summary: "Medical necessity criteria for diagnostic cardiac catheterization, fractional flow reserve, and coronary angioplasty stenting.",
    criteria: [
      "High-risk acute coronary syndrome: unstable angina or non-ST-elevation myocardial infarction with hemodynamic instability or rising cardiac biomarkers",
      "Stable coronary disease with strongly positive non-invasive stress imaging (e.g., >10% myocardial ischemia on SPECT or stress CMR)",
      "Unexplained sudden cardiac arrest survivor or sustained ventricular arrhythmia"
    ],
    icd10Covered: ["I20.0", "I21.0", "I21.4", "I25.10", "I25.700"],
    contraindications: [
      "Asymptomatic patients with low coronary calcium score and normal stress testing",
      "Refusal of revascularization if significant lesions discovered"
    ]
  }
];

export const AUDIT_TRAIL: AuditLogItem[] = [
  {
    id: "AUD-88491",
    timestamp: "2026-09-25 12:58:14 UTC",
    actor: "ai-claims-engine-v2",
    role: "Autonomous Service Agent",
    action: "AUTO_ADJUDICATE_APPROVED",
    resource: "Claim CLM-2026-90220 ($115.00)",
    ipAddress: "10.244.3.48 (Internal VPC)",
    status: "success",
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    id: "AUD-88490",
    timestamp: "2026-09-25 12:54:02 UTC",
    actor: "system-fraud-sentinel",
    role: "Fraud Detection Module",
    action: "SUSPEND_FRAUD_FLAG",
    resource: "Claim CLM-2026-90216 (Provider 1093847120)",
    ipAddress: "10.244.3.52 (Internal VPC)",
    status: "warning",
    sha256Hash: "4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945",
  },
  {
    id: "AUD-88489",
    timestamp: "2026-09-25 12:49:33 UTC",
    actor: "auditor.sarah@metropolishealth.org",
    role: "Senior Medical Auditor",
    action: "MANUAL_RECORD_ACCESS",
    resource: "Document DOC-2026-003",
    ipAddress: "172.56.21.90 (Secured VPN)",
    status: "success",
    sha256Hash: "b8a91c78e192039401f82b719402948271829038472619283746192038471829",
  },
  {
    id: "AUD-88488",
    timestamp: "2026-09-25 12:42:19 UTC",
    actor: "gateway-auth-sentinel",
    role: "API Gateway Guard",
    action: "TOKEN_GENERATION",
    resource: "OAuth2 Session JWT for Tenant 'Metropolis-Prod'",
    ipAddress: "10.244.1.12",
    status: "success",
    sha256Hash: "9021948291038472619283746192038471829038472619283746192038471829",
  },
  {
    id: "AUD-88487",
    timestamp: "2026-09-25 12:38:05 UTC",
    actor: "ai-ocr-extractor-v4",
    role: "Document Intake Agent",
    action: "ENTITY_EXTRACTION_COMPLETED",
    resource: "Document DOC-2026-001 (Discharge Summary)",
    ipAddress: "10.244.4.19",
    status: "success",
    sha256Hash: "a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0",
  }
];

export const TIMELINE_CHART_DATA = [
  { time: "06:00", claims: 45, volumeUSD: 84000, autoApproved: 41, flagged: 2 },
  { time: "08:00", claims: 112, volumeUSD: 245000, autoApproved: 104, flagged: 4 },
  { time: "10:00", claims: 248, volumeUSD: 610000, autoApproved: 228, flagged: 9 },
  { time: "12:00", claims: 380, volumeUSD: 890000, autoApproved: 352, flagged: 14 },
  { time: "14:00", claims: 410, volumeUSD: 1020000, autoApproved: 378, flagged: 16 },
  { time: "16:00", claims: 340, volumeUSD: 780000, autoApproved: 312, flagged: 11 },
  { time: "18:00", claims: 190, volumeUSD: 430000, autoApproved: 174, flagged: 6 },
  { time: "20:00", claims: 85, volumeUSD: 190000, autoApproved: 80, flagged: 2 },
];

export const ADJUDICATION_PIE_DATA = [
  { name: "Clean Auto-Approved", value: 1684, color: "#10b981" },
  { name: "Prior-Auth Pending", value: 78, color: "#38bdf8" },
  { name: "Fraud / Audit Flagged", value: 46, color: "#f59e0b" },
  { name: "Policy Denied", value: 34, color: "#ef4444" },
];

export const DENIAL_ROOT_CAUSES = [
  { reason: "Missing Prior Auth", count: 42, percentage: 38 },
  { reason: "Upcoding / E&M Discordance", count: 28, percentage: 25 },
  { reason: "Lack of Conservative Therapy", count: 18, percentage: 16 },
  { reason: "NCCI Bundling Collision", count: 14, percentage: 13 },
  { reason: "Coverage Terminated", count: 9, percentage: 8 },
];

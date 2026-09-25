"use client";

import React, { useState } from "react";
import Sidebar, { TabType } from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OverviewTab from "../components/OverviewTab";
import ClaimsStudioTab from "../components/ClaimsStudioTab";
import DocumentIntelligenceTab from "../components/DocumentIntelligenceTab";
import ClinicalRagTab from "../components/ClinicalRagTab";
import AnalyticsTab from "../components/AnalyticsTab";
import AuditLogsTab from "../components/AuditLogsTab";
import ClaimDetailModal from "../components/ClaimDetailModal";
import NewClaimModal from "../components/NewClaimModal";
import { INITIAL_CLAIMS, ClaimRecord, DocumentSample } from "../data/mockData";

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<TabType>("overview");
  const [claims, setClaims] = useState<ClaimRecord[]>(INITIAL_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [isNewClaimOpen, setIsNewClaimOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");

  const handleUpdateClaimStatus = (claimId: string, newStatus: ClaimRecord["status"], newNote?: string) => {
    setClaims((prev) =>
      prev.map((c) => {
        if (c.id === claimId) {
          const updated = {
            ...c,
            status: newStatus,
            adjudicationNote: newNote || c.adjudicationNote,
          };
          if (selectedClaim?.id === claimId) {
            setSelectedClaim(updated);
          }
          return updated;
        }
        return c;
      })
    );
  };

  const handleAddNewClaim = (newClaim: ClaimRecord) => {
    setClaims((prev) => [newClaim, ...prev]);
    setSelectedClaim(newClaim);
  };

  const handlePushDocToClaim = (doc: DocumentSample) => {
    const primaryDiag = doc.extractedEntities.diagnoses[0] || { code: "M54.5", name: "Low back pain" };
    const primaryProc = doc.extractedEntities.procedures[0] || { code: "72148", allowable: 1240.00, name: "MRI Lumbar" };

    const generatedClaim: ClaimRecord = {
      id: "CLM-" + Math.floor(90300 + Math.random() * 1000),
      claimNumber: "CLM-2026-" + Math.floor(90300 + Math.random() * 1000),
      patientName: doc.extractedEntities.patient.name,
      patientDob: doc.extractedEntities.patient.dob,
      patientMrn: doc.extractedEntities.patient.mrn,
      providerName: "Extracted from " + doc.facility,
      providerNpi: "1942850192",
      facility: doc.facility,
      serviceDate: new Date().toISOString().split("T")[0],
      diagnosisCode: primaryDiag.code,
      diagnosisDesc: primaryDiag.name,
      procedureCode: primaryProc.code,
      procedureDesc: primaryProc.name,
      billedAmount: primaryProc.allowable * 1.4,
      approvedAmount: primaryProc.allowable,
      status: "approved",
      riskScore: 12,
      riskLevel: "low",
      aiConfidence: doc.ocrConfidence,
      policyMatch: "CMS Automated Document Intake Rule",
      fraudAlerts: [],
      adjudicationNote: `Auto-generated from OCR Document ${doc.id}. Entities extracted and verified.`,
    };

    setClaims((prev) => [generatedClaim, ...prev]);
    setCurrentTab("claims");
    setSelectedClaim(generatedClaim);
  };

  return (
    <div className="flex min-h-screen bg-[#070b14] text-slate-100">
      
      {/* Enterprise Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenNewClaim={() => setIsNewClaimOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <Navbar
          onOpenNewClaim={() => setIsNewClaimOpen(true)}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            
            {currentTab === "overview" && (
              <OverviewTab
                claims={claims}
                onSelectClaim={setSelectedClaim}
                onOpenNewClaim={() => setIsNewClaimOpen(true)}
                searchQuery={globalSearch}
              />
            )}

            {currentTab === "claims" && (
              <ClaimsStudioTab
                claims={claims}
                onSelectClaim={setSelectedClaim}
                onOpenNewClaim={() => setIsNewClaimOpen(true)}
                onUpdateStatus={handleUpdateClaimStatus}
              />
            )}

            {currentTab === "documents" && (
              <DocumentIntelligenceTab
                onPushToClaim={handlePushDocToClaim}
              />
            )}

            {currentTab === "rag" && (
              <ClinicalRagTab />
            )}

            {currentTab === "analytics" && (
              <AnalyticsTab />
            )}

            {currentTab === "audit" && (
              <AuditLogsTab />
            )}

          </div>
        </main>

      </div>

      {/* Slide-Over Claim Inspection Drawer */}
      <ClaimDetailModal
        claim={selectedClaim}
        onClose={() => setSelectedClaim(null)}
        onUpdateStatus={handleUpdateClaimStatus}
      />

      {/* New Claim Simulation Modal */}
      <NewClaimModal
        isOpen={isNewClaimOpen}
        onClose={() => setIsNewClaimOpen(false)}
        onSubmit={handleAddNewClaim}
      />

    </div>
  );
}

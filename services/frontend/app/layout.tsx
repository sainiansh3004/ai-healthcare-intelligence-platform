import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AegisHealth AI | Autonomous Claims Adjudication & Clinical Fraud Intelligence",
  description: "Enterprise healthcare intelligence platform automating medical document intake, clinical entity extraction, real-time claims adjudication, and RAG policy compliance.",
  keywords: ["Healthcare AI", "Claims Adjudication", "Fraud Detection", "Medical OCR", "HIPAA", "Revenue Cycle Management"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070b14] text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinay Kumar K.V | AI Engineer & GxP Systems Architect",
  description: "Professional portfolio of Vinay Kumar K.V - Senior AI Engineer specializing in LLM systems, multimodal architectures (VATSA), and GxP-regulated deployment.",
  keywords: ["AI Engineer", "LLM Systems", "Multimodal AI", "GxP Regulated AI", "VATSA", "GSK LLM Strategy", "Deep Learning", "Robotics"],
  authors: [{ name: "Vinay Kumar K.V" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Background Cybernetic overlays */}
        <div className="cyber-bg" />
        <div className="cyber-grid-overlay" />
        
        {children}
      </body>
    </html>
  );
}

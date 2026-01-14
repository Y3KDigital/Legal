export default function LearnPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Learn About RWA Compliance</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">RWA Atlas</h2>
            <p className="text-gray-600 mb-4">
              Explore 11 asset classes and understand their compliance requirements.
            </p>
            <ul className="space-y-2">
              <li>• US Treasuries</li>
              <li>• Private Credit</li>
              <li>• Real Estate</li>
              <li>• Commodities</li>
              <li>• And 7 more...</li>
            </ul>
          </section>

          <section className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Compliance Hub</h2>
            <p className="text-gray-600 mb-4">
              Understand key legal frameworks that govern RWA tokenization.
            </p>
            <ul className="space-y-2">
              <li>• Howey Test (SEC)</li>
              <li>• ERISA Plan Assets</li>
              <li>• Tax Characterization</li>
              <li>• Banking Regulations</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 border-t pt-12">
          <h2 className="text-3xl font-bold mb-6">How the MCP Works</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-4">
              The Multi-Agent Control Plane (MCP) uses 11 specialized AI agents to analyze
              your RWA structure across every compliance dimension:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>SEC-A: Securities classification</li>
              <li>ERISA-A: Plan asset contamination</li>
              <li>TAX-A: Tax characterization</li>
              <li>BANK-A: Banking custody risk</li>
              <li>CPA-A: Accounting treatment</li>
              <li>SC-A: Smart contract compliance (26-item checklist)</li>
              <li>AUDIT-A: Attestation planning</li>
              <li>GOV-A: Governance configuration</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}

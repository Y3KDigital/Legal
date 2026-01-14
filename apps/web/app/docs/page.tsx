export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="text-primary-600 hover:underline">Quick Start Guide</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Platform Architecture</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Technical Implementation</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">API Reference</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="text-primary-600 hover:underline">POST /api/mcp/event - Submit workflow</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">GET /api/mcp/projects/:id - Get project details</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">POST /api/mcp/approve - Submit approval</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">POST /api/mcp/scan-contract - Scan smart contract</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">GET /api/mcp/projects/:id/attestation - Get attestation</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Compliance Frameworks</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#" className="text-primary-600 hover:underline">Global RWA Asset Registry</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Execution Playbooks</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Control Matrix (58 controls)</a></li>
              <li><a href="#" className="text-primary-600 hover:underline">Smart Contract Cheat Sheets</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

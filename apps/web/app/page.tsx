import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, FileText, GitBranch } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold">MCP AI Law Firm</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/learn" className="text-gray-600 hover:text-gray-900">
              Learn
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900">
              Documentation
            </Link>
            <Link href="/app/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Institutional-Grade RWA Compliance
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform real-world assets into compliant digital securities through
          an AI-orchestrated legal operations system that enforces institutional
          controls and maintains regulator-legible audit trails.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/app/dashboard">
            <Button size="lg" className="gap-2">
              Start Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/learn">
            <Button size="lg" variant="outline">
              Learn How It Works
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="AI Legal Analysis"
            description="11 specialized agents analyze your RWA structure across securities, tax, banking, and technical compliance"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Fail-Closed Enforcement"
            description="Automated gates block non-compliant deployments. If MCP is offline or any check fails, deployment stops"
          />
          <FeatureCard
            icon={<GitBranch className="h-8 w-8" />}
            title="Immutable Audit Trails"
            description="Every decision recorded in Git with SHA-256 hashes. Optional IPFS for public verifiability"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Tokenize Compliantly?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the future of institutional RWA compliance
          </p>
          <Link href="/app/dashboard">
            <Button size="lg" variant="secondary" className="gap-2">
              Create Your First Project
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/learn">Learn</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/app/dashboard">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/learn/rwa-atlas">RWA Atlas</Link></li>
                <li><Link href="/learn/compliance">Compliance Hub</Link></li>
                <li><Link href="/docs">API Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about">About</Link></li>
                <li><Link href="https://github.com/Y3KDigital/Legal">GitHub</Link></li>
                <li><Link href="mailto:kevan@y3kdigital.com">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>© 2026 Y3K Digital. Licensed under MIT.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

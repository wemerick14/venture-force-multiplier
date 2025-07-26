import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 dark:opacity-10"></div>
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              VentureForceMultiplier.ai
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 font-light">
              Deploying workflows. Multiplying outcomes.
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            AI-powered automation tools designed for startup operators, SaaS teams, and VC-backed founders. 
            Make your team 10× more effective without hiring developers.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/tools" className="btn-primary text-lg px-8 py-4">
            Try a Tool
          </Link>
          <Link to="/tools" className="btn-secondary text-lg px-8 py-4">
            Explore AI Demos
          </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="tool-card text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Campaign Crafter</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Generate cold emails, LinkedIn messages, and voicemails instantly
            </p>
          </div>
          
          <div className="tool-card text-center">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">LeadGen Synth</h3>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered lead generation and prospect research
            </p>
          </div>
          
          <div className="tool-card text-center">
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">Process Automator</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Streamline workflows with intelligent automation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
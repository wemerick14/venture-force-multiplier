import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto w-full">
        {/* Hero Section */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 dark:opacity-10"></div>
          <div className="relative">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              <span className="block sm:hidden">VFM.ai</span>
              <span className="hidden sm:block">VentureForceMultiplier.ai</span>
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 font-light px-4 sm:px-0">
              Deploying workflows. Multiplying outcomes.
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mb-8 sm:mb-12">
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
            AI-powered automation tools designed for startup operators, SaaS teams, and VC-backed founders. 
            Make your team 10× more effective without hiring developers.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
          <Link to="/tools" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
            Try a Tool
          </Link>
          <Link to="/tools" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto">
            Explore AI Demos
          </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="tool-card text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Campaign Crafter</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Generate cold emails, LinkedIn messages, and voicemails instantly
            </p>
          </div>
          
          <div className="tool-card text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">LeadGen Synth</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              AI-powered lead generation and prospect research
            </p>
          </div>
          
          <div className="tool-card text-center sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔄</div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2">Process Automator</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              Streamline workflows with intelligent automation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
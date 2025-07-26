import { Link } from 'react-router-dom'

const tools = [
  {
    id: 'campaign-crafter',
    name: 'Campaign Crafter',
    description: 'Generate cold emails, LinkedIn messages, and voicemails instantly',
    icon: '⚡',
    status: 'Available',
    route: '/tools/campaign-crafter'
  },
  {
    id: 'leadgen-synth',
    name: 'LeadGen Synth',
    description: 'AI-powered lead generation and prospect research',
    icon: '🎯',
    status: 'Coming Soon',
    route: '#'
  },
  {
    id: 'meeting-brief-copilot',
    name: 'Meeting Brief Copilot',
    description: 'Intelligent meeting preparation and summary generation',
    icon: '📋',
    status: 'Coming Soon',
    route: '#'
  },
  {
    id: 'pain-point-scanner',
    name: 'Pain Point Scanner',
    description: 'Identify customer pain points from conversations and feedback',
    icon: '🔍',
    status: 'Coming Soon',
    route: '#'
  },
  {
    id: 'process-automator',
    name: 'Process Automator',
    description: 'Streamline workflows with intelligent automation',
    icon: '🔄',
    status: 'Coming Soon',
    route: '#'
  },
  {
    id: 'ai-feasibility-checker',
    name: 'AI Feasibility Checker',
    description: 'Evaluate project feasibility with AI-powered analysis',
    icon: '🎯',
    status: 'Coming Soon',
    route: '#'
  }
]

export default function Tools() {
  return (
    <div className="py-4 sm:py-8">
      <div className="text-center mb-8 sm:mb-12 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          AI Automation Tools
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Powerful tools to multiply your team's productivity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="tool-card group h-full flex flex-col">
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className="text-2xl sm:text-3xl">{tool.icon}</div>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shrink-0 ${
                tool.status === 'Available' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}>
                {tool.status}
              </span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 flex-grow leading-relaxed">
              {tool.description}
            </p>
            
            <div className="mt-auto">
              {tool.status === 'Available' ? (
                <Link 
                  to={tool.route}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
                >
                  Try Tool →
                </Link>
              ) : (
                <span className="inline-flex items-center text-gray-400 dark:text-gray-500 font-medium text-sm sm:text-base">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 sm:mt-16 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 sm:p-8 mx-4 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Need a Custom Tool?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto leading-relaxed">
            Have a specific automation need? Let's build a custom solution for your team.
          </p>
          <button className="btn-primary text-sm sm:text-base px-6 py-3 w-full sm:w-auto">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}
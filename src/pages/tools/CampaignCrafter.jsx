import { useState } from 'react'
import geminiApi from '../../services/geminiApi'

export default function CampaignCrafter() {
  const [formData, setFormData] = useState({
    product: '',
    persona: '',
    tone: 'professional',
    companyUrl: ''
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState('')

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResults(null)
    
    try {
      if (formData.companyUrl) {
        setLoadingMessage('Analyzing company website...')
        // Small delay to show the analysis message
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      setLoadingMessage('Generating campaign materials...')
      
      const campaignContent = await geminiApi.generateCampaignContent(
        formData.product,
        formData.persona,
        formData.tone,
        formData.companyUrl
      )
      setResults(campaignContent)
    } catch (err) {
      setError(err.message || 'Failed to generate campaign content. Please try again.')
      console.error('Campaign generation error:', err)
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }

  const isFormValid = formData.product && formData.persona

  return (
    <div className="py-4 sm:py-8">
      <div className="mb-6 sm:mb-8 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
          Campaign Crafter
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
          Generate personalized cold emails, LinkedIn messages, and voicemails instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Input Form */}
        <div className="tool-card order-1">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Campaign Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product/Service Description
              </label>
              <textarea
                id="product"
                name="product"
                rows={3}
                value={formData.product}
                onChange={handleInputChange}
                placeholder="Describe what you're selling..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base resize-y min-h-[80px]"
              />
            </div>

            <div>
              <label htmlFor="persona" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Persona
              </label>
              <textarea
                id="persona"
                name="persona"
                rows={3}
                value={formData.persona}
                onChange={handleInputChange}
                placeholder="Describe your ideal customer..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base resize-y min-h-[80px]"
              />
            </div>

            <div>
              <label htmlFor="companyUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Company Website (Optional)
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">Add your brand's URL for more personalized campaigns</span>
              </label>
              <input
                id="companyUrl"
                name="companyUrl"
                type="url"
                value={formData.companyUrl}
                onChange={handleInputChange}
                placeholder="https://yourstartup.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                💡 We'll analyze your website to craft campaigns that better represent your brand and value proposition
              </p>
            </div>

            <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tone
              </label>
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="direct">Direct</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-3 sm:py-4"
            >
              {loading ? (loadingMessage || 'Generating Campaign...') : 'Generate Campaign'}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center">
                  <div className="text-red-600 dark:text-red-400 text-sm">
                    <strong>Error:</strong> {error}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Results */}
        <div className="space-y-4 sm:space-y-6 order-2 lg:order-2">
          {results ? (
            <>
              <div className="tool-card">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Cold Email Options</h3>
                <div className="space-y-3 sm:space-y-4">
                  {results.emails.map((email, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4">
                      <div className="font-medium text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Subject: {email.subject}
                      </div>
                      <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">
                        {email.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tool-card">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">LinkedIn Message</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                    {results.linkedinMessage}
                  </div>
                </div>
              </div>

              <div className="tool-card">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Voicemail Script</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                    {results.voicemail}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="tool-card text-center py-8 sm:py-12">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ready to Generate
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed px-4 sm:px-0">
                Fill out the form to generate your personalized campaign materials
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
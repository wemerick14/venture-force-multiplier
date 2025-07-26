import { useState } from 'react'
import geminiApi from '../../services/geminiApi'

export default function CampaignCrafter() {
  const [formData, setFormData] = useState({
    product: '',
    persona: '',
    tone: 'professional'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
      const campaignContent = await geminiApi.generateCampaignContent(
        formData.product,
        formData.persona,
        formData.tone
      )
      setResults(campaignContent)
    } catch (err) {
      setError(err.message || 'Failed to generate campaign content. Please try again.')
      console.error('Campaign generation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.product && formData.persona

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Campaign Crafter
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Generate personalized cold emails, LinkedIn messages, and voicemails instantly
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="tool-card">
          <h2 className="text-xl font-semibold mb-6">Campaign Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              />
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating Campaign...' : 'Generate Campaign'}
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
        <div className="space-y-6">
          {results ? (
            <>
              <div className="tool-card">
                <h3 className="text-lg font-semibold mb-4">Cold Email Options</h3>
                <div className="space-y-4">
                  {results.emails.map((email, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Subject: {email.subject}
                      </div>
                      <div className="whitespace-pre-line text-sm">
                        {email.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tool-card">
                <h3 className="text-lg font-semibold mb-4">LinkedIn Message</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm whitespace-pre-line">
                    {results.linkedinMessage}
                  </div>
                </div>
              </div>

              <div className="tool-card">
                <h3 className="text-lg font-semibold mb-4">Voicemail Script</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm whitespace-pre-line">
                    {results.voicemail}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="tool-card text-center py-12">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Ready to Generate
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form to generate your personalized campaign materials
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
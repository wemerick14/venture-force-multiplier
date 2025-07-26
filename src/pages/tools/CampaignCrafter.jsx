import { useState } from 'react'

export default function CampaignCrafter() {
  const [formData, setFormData] = useState({
    product: '',
    persona: '',
    tone: 'professional'
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Placeholder for API call - Phase 2 will implement actual Gemini Flash integration
    setTimeout(() => {
      setResults({
        emails: [
          {
            subject: "Quick question about [Company Name]'s growth",
            body: "Hi [Name],\n\nI noticed your company has been expanding rapidly in the [industry] space. We've helped similar companies like yours streamline their operations with our automation tools.\n\nWould you be open to a 15-minute call to discuss how we could help [Company Name] scale even more efficiently?\n\nBest regards,\n[Your Name]"
          },
          {
            subject: "Helping [Company Name] multiply productivity",
            body: "Hello [Name],\n\nYour recent growth caught my attention. At VentureForceMultiplier.ai, we specialize in helping teams like yours become 10x more productive without additional headcount.\n\nInterested in seeing how we could help [Company Name]?\n\n[Your Name]"
          },
          {
            subject: "30-second question for [Company Name]",
            body: "Hi [Name],\n\nQuick question: What's your biggest operational bottleneck right now?\n\nWe've helped 50+ companies eliminate similar challenges with AI-powered automation.\n\nWorth a brief chat?\n\n[Your Name]"
          }
        ],
        linkedinMessage: "Hi [Name]! Impressed by [Company Name]'s growth in [industry]. We help teams like yours multiply productivity with AI automation. Worth a quick chat about your current challenges?",
        voicemail: "Hi [Name], this is [Your Name] from VentureForceMultiplier.ai. I see [Company Name] is doing amazing things in [industry]. We specialize in helping growing teams automate their workflows. I'd love to share how we've helped similar companies scale efficiently. Give me a call back at [phone] when you have a moment. Thanks!"
      })
      setLoading(false)
    }, 2000)
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
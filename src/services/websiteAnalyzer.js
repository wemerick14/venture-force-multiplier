class WebsiteAnalyzerService {
  async analyzeWebsite(url) {
    if (!url || !this.isValidUrl(url)) {
      return null;
    }

    try {
      // Use Claude Code's WebFetch equivalent through a proxy approach
      // Since we can't directly use WebFetch in client-side code, we'll use Gemini to analyze the URL
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

      const analysisPrompt = `Analyze this company's website to understand their brand and offerings: ${url}

This is the company/brand that will be doing outreach, so analyze THEIR business to help craft better campaign materials that represent their value proposition accurately.

Please provide a brief analysis including:
1. Company name and industry
2. Main products/services they offer
3. Their target market/customers
4. Their key value propositions and differentiators
5. Company size/stage (startup, enterprise, etc.)
6. Their recent news, achievements, or milestones
7. Their competitive advantages and unique selling points

Keep your analysis concise and factual. Format as:
COMPANY_NAME: [name]
INDUSTRY: [industry]
PRODUCTS: [brief description]
TARGET_MARKET: [who they serve]
VALUE_PROPS: [key benefits they offer]
COMPANY_STAGE: [startup/growth/enterprise]
RECENT_NEWS: [any notable updates or milestones]
COMPETITIVE_ADVANTAGES: [their unique selling points and differentiators]`;

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: analysisPrompt
            }]
          }]
        })
      });

      if (!response.ok) {
        console.warn('Website analysis failed, continuing without company data');
        return null;
      }

      const data = await response.json();
      const analysisText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!analysisText) {
        return null;
      }

      return this.parseAnalysis(analysisText);
    } catch (error) {
      console.warn('Website analysis error:', error);
      return null;
    }
  }

  parseAnalysis(analysisText) {
    const analysis = {};
    
    const patterns = {
      companyName: /COMPANY_NAME:\s*(.+)/i,
      industry: /INDUSTRY:\s*(.+)/i,
      products: /PRODUCTS:\s*(.+)/i,
      targetMarket: /TARGET_MARKET:\s*(.+)/i,
      valueProps: /VALUE_PROPS:\s*(.+)/i,
      companyStage: /COMPANY_STAGE:\s*(.+)/i,
      recentNews: /RECENT_NEWS:\s*(.+)/i,
      competitiveAdvantages: /COMPETITIVE_ADVANTAGES:\s*(.+)/i
    };

    for (const [key, pattern] of Object.entries(patterns)) {
      const match = analysisText.match(pattern);
      if (match) {
        analysis[key] = match[1].trim();
      }
    }

    return analysis;
  }

  isValidUrl(string) {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  }

  formatAnalysisForPrompt(analysis) {
    if (!analysis) return '';

    return `
YOUR COMPANY BRAND INTELLIGENCE (from website analysis):
- Your Company: ${analysis.companyName || 'Unknown'}
- Your Industry: ${analysis.industry || 'Unknown'}
- Your Products/Services: ${analysis.products || 'Unknown'}
- Your Target Market: ${analysis.targetMarket || 'Unknown'}
- Your Value Propositions: ${analysis.valueProps || 'Unknown'}
- Your Company Stage: ${analysis.companyStage || 'Unknown'}
- Your Recent Achievements: ${analysis.recentNews || 'None found'}
- Your Competitive Advantages: ${analysis.competitiveAdvantages || 'Unknown'}

Use this information about the sender's company to craft campaigns that accurately represent their brand, showcase their value proposition, and highlight their competitive advantages when reaching out to prospects.`;
  }
}

export default new WebsiteAnalyzerService();
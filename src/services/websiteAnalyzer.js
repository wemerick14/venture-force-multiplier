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

      const analysisPrompt = `Analyze the company at this URL: ${url}

Please provide a brief analysis including:
1. Company name and industry
2. Main products/services
3. Target market/customers
4. Key value propositions
5. Company size/stage (startup, enterprise, etc.)
6. Recent news or achievements
7. Pain points they might have

Keep your analysis concise and factual. Format as:
COMPANY_NAME: [name]
INDUSTRY: [industry]
PRODUCTS: [brief description]
TARGET_MARKET: [who they serve]
VALUE_PROPS: [key benefits they offer]
COMPANY_STAGE: [startup/growth/enterprise]
RECENT_NEWS: [any notable updates]
PAIN_POINTS: [likely challenges they face]`;

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
      painPoints: /PAIN_POINTS:\s*(.+)/i
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
COMPANY INTELLIGENCE (from website analysis):
- Company: ${analysis.companyName || 'Unknown'}
- Industry: ${analysis.industry || 'Unknown'}
- Products/Services: ${analysis.products || 'Unknown'}
- Target Market: ${analysis.targetMarket || 'Unknown'}
- Value Propositions: ${analysis.valueProps || 'Unknown'}
- Company Stage: ${analysis.companyStage || 'Unknown'}
- Recent Developments: ${analysis.recentNews || 'None found'}
- Likely Pain Points: ${analysis.painPoints || 'Unknown'}

Use this intelligence to make your campaign materials highly targeted and relevant.`;
  }
}

export default new WebsiteAnalyzerService();
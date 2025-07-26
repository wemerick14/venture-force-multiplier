import websiteAnalyzer from './websiteAnalyzer';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

class GeminiApiService {
  async generateCampaignContent(product, persona, tone, companyUrl = '') {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not found. Please check your environment variables.');
    }

    // Analyze company website if URL is provided
    let companyAnalysis = null;
    if (companyUrl) {
      try {
        companyAnalysis = await websiteAnalyzer.analyzeWebsite(companyUrl);
      } catch (error) {
        console.warn('Company analysis failed, continuing without website data:', error);
      }
    }

    const prompt = this.buildCampaignPrompt(product, persona, tone, companyAnalysis);

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!generatedText) {
        throw new Error('No content generated from API');
      }

      return this.parseCampaignResponse(generatedText);
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }

  buildCampaignPrompt(product, persona, tone, companyAnalysis = null) {
    const companyIntel = companyAnalysis ? websiteAnalyzer.formatAnalysisForPrompt(companyAnalysis) : '';
    
    return `You are an expert B2B copywriter specializing in outreach to venture founders, startup operators, and high-growth companies. You understand the fast-paced, ROI-focused mindset of entrepreneurs who are scaling rapidly and need solutions that multiply their impact without adding headcount.

PRODUCT/SERVICE: ${product}

TARGET PERSONA: ${persona}

TONE: ${tone}

${companyIntel}

CONTEXT: You're reaching out to venture-backed founders, startup operators, or growth-stage companies. These prospects are:
- Time-constrained and results-focused
- Looking for force multipliers and competitive advantages
- Interested in automation, efficiency, and scaling solutions
- Responsive to data, metrics, and proven ROI
- Building for rapid growth and need tools that scale with them

Generate campaign materials that speak directly to the venture/startup mindset with language that resonates with founders:

1. THREE different cold email versions (subject line + body):
   - Version A: Growth/scaling pain point focused (mention bottlenecks, operational friction)
   - Version B: Competitive advantage focused (mention getting ahead, force multipliers, efficiency gains)
   - Version C: ROI/metrics focused (mention time saved, productivity gains, measurable impact)
   
2. ONE LinkedIn direct message (150 characters max) - use startup/venture language

3. ONE voicemail script (15-20 seconds) - founder-to-founder tone

Use venture/startup terminology like: scale, force multiplier, operational efficiency, competitive advantage, growth bottlenecks, ROI, automation, streamline workflows, multiply output, eliminate friction.

Format your response EXACTLY like this:

EMAIL_1_SUBJECT: [subject line]
EMAIL_1_BODY: [email body]

EMAIL_2_SUBJECT: [subject line]
EMAIL_2_BODY: [email body]

EMAIL_3_SUBJECT: [subject line]
EMAIL_3_BODY: [email body]

LINKEDIN_MESSAGE: [LinkedIn DM content]

VOICEMAIL_SCRIPT: [voicemail script]

Keep emails under 100 words each. Use placeholders like [Company Name], [First Name] for personalization. Make content actionable and compelling.`;
  }

  parseCampaignResponse(responseText) {
    try {
      const emails = [];
      
      // Extract emails
      for (let i = 1; i <= 3; i++) {
        const subjectMatch = responseText.match(new RegExp(`EMAIL_${i}_SUBJECT:\\s*(.+)`));
        const bodyMatch = responseText.match(new RegExp(`EMAIL_${i}_BODY:\\s*([\\s\\S]*?)(?=EMAIL_${i + 1}_SUBJECT|LINKEDIN_MESSAGE|$)`));
        
        if (subjectMatch && bodyMatch) {
          emails.push({
            subject: subjectMatch[1].trim(),
            body: bodyMatch[1].trim()
          });
        }
      }

      // Extract LinkedIn message
      const linkedinMatch = responseText.match(/LINKEDIN_MESSAGE:\s*([\s\S]*?)(?=VOICEMAIL_SCRIPT|$)/);
      const linkedinMessage = linkedinMatch ? linkedinMatch[1].trim() : '';

      // Extract voicemail script
      const voicemailMatch = responseText.match(/VOICEMAIL_SCRIPT:\s*([\s\S]*?)$/);
      const voicemail = voicemailMatch ? voicemailMatch[1].trim() : '';

      return {
        emails: emails.length > 0 ? emails : this.getFallbackEmails(),
        linkedinMessage: linkedinMessage || this.getFallbackLinkedIn(),
        voicemail: voicemail || this.getFallbackVoicemail()
      };
    } catch (error) {
      console.error('Error parsing response:', error);
      return this.getFallbackContent();
    }
  }

  getFallbackEmails() {
    return [
      {
        subject: "Quick question about [Company Name]'s growth",
        body: "Hi [First Name],\n\nI noticed [Company Name] has been expanding rapidly. We've helped similar companies streamline their operations with automation tools.\n\nWould you be open to a 15-minute call to discuss how we could help [Company Name] scale more efficiently?\n\nBest regards,\n[Your Name]"
      },
      {
        subject: "Helping [Company Name] multiply productivity",
        body: "Hello [First Name],\n\nYour recent growth caught my attention. We specialize in helping teams become 10x more productive without additional headcount.\n\nInterested in seeing how we could help [Company Name]?\n\n[Your Name]"
      },
      {
        subject: "30-second question for [Company Name]",
        body: "Hi [First Name],\n\nQuick question: What's your biggest operational bottleneck right now?\n\nWe've helped 50+ companies eliminate similar challenges with AI-powered automation.\n\nWorth a brief chat?\n\n[Your Name]"
      }
    ];
  }

  getFallbackLinkedIn() {
    return "Hi [First Name]! Impressed by [Company Name]'s growth. We help teams multiply productivity with AI automation. Worth a quick chat?";
  }

  getFallbackVoicemail() {
    return "Hi [First Name], this is [Your Name]. I see [Company Name] is doing amazing things. We specialize in helping growing teams automate workflows. I'd love to share how we've helped similar companies scale efficiently. Give me a call back when you have a moment. Thanks!";
  }

  getFallbackContent() {
    return {
      emails: this.getFallbackEmails(),
      linkedinMessage: this.getFallbackLinkedIn(),
      voicemail: this.getFallbackVoicemail()
    };
  }
}

export default new GeminiApiService();
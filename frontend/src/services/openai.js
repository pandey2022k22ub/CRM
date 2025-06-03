const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateMessageSuggestions = async (campaignObjective) => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Give me 3 short message suggestions for the campaign objective: "${campaignObjective}".`,
          },
        ],
        max_tokens: 150,
      }),
    });

    const data = await response.json();
    const suggestions = data.choices[0].message.content.split('\n').filter(line => line.trim() !== '');
    return suggestions;
  } catch (error) {
    console.error('Error generating AI message suggestions:', error);
    return [];
  }
};

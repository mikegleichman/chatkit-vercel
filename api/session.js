export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const workflowId = process.env.OPENAI_WORKFLOW_ID;

  if (!apiKey || !workflowId) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY or OPENAI_WORKFLOW_ID environment variables' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify({
        workflow: { id: workflowId },
        user: `user-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      return res.status(response.status).json({ error: 'Failed to create session', details: error });
    }

    const data = await response.json();
    res.status(200).json({ client_secret: data.client_secret });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

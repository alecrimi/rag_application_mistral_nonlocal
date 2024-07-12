import { supabase } from '../../lib/supabaseClient';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      // Fetch relevant documents from Supabase
      const { data, error } = await supabase
        .from('documents')
        .select('content')
        .textSearch('content', query);

      if (error) {
        throw error;
      }

      // Concatenate the documents' content to pass to Mistral API
      const documentsContent = data.map(doc => doc.content).join(' ');

      // Make a request to Mistral API
      const mistralResponse = await axios.post('MISTRAL_API_ENDPOINT', {
        prompt: `${documentsContent}\n\nQuery: ${query}\nAnswer:`,
        model: 'mistral-model-id', // Replace with the actual model ID
        max_tokens: 200,
      });

      const generatedText = mistralResponse.data.choices[0].text;

      res.status(200).json({ response: generatedText });
    } catch (error) {
      console.error('Error generating response:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

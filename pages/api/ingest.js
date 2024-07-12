import { supabase } from '../../lib/supabaseClient';
import axios from 'axios';

// Mock vectorization function (replace with actual model integration)
const vectorizeDocument = async (content) => {
  // Simulated vectorization process
  const vector = Array.from(content).map((char) => char.charCodeAt(0));
  return vector;
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;

    // Step 1: Vectorize the document
    const vector = await vectorizeDocument(content);

    // Step 2: Store the document and vector in Supabase
    const { data, error } = await supabase
      .from('documents')
      .insert([
        { content, vector }
      ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Document ingested successfully', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

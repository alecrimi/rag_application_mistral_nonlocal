import { useState } from 'react';
import axios from 'axios';

const RagPage = () => {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [response, setResponse] = useState('');

  const handleRagSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/generate', { query, context });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error generating RAG response:', error.message);
    }
  };

  return (
    <div>
      <h1>Perform Retrieval-Augmented Generation (RAG)</h1>

      {/* Interface for RAG with Mistral */}
      <form onSubmit={handleRagSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your query"
        />
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter context (optional)"
          rows="4"
          cols="50"
        />
        <button type="submit">Generate Response</button>
      </form>

      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default RagPage;

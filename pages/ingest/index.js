import { useState } from 'react';
import axios from 'axios';

const LoadDataPage = () => {
  const [document, setDocument] = useState('');

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/ingest', { content: document });
      if (res.data.message) {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error ingesting document:', error.message);
    }
  };

  return (
    <div>
      <h1>Load Data into Vectors</h1>

      {/* Interface for Document Ingestion */}
      <form onSubmit={handleDocumentSubmit}>
        <textarea
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          placeholder="Enter document content"
          rows="4"
          cols="50"
        />
        <button type="submit">Ingest</button>
      </form>
    </div>
  );
};

export default LoadDataPage;

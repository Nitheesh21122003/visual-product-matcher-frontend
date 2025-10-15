import React, { useState } from 'react';
import UploadForm from './UploadForm';
import MatchResults from './MatchResults';

function App() {
  const [image, setImage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        body: formData,
      });
      const matchData = await res.json();
      setImage(URL.createObjectURL(file));
      setMatches(matchData);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!inputUrl) return;
    setLoading(true);
    try {
      const res = await fetch('https://visual-product-matcher-backend-zpjt.onrender.com/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: inputUrl }),
      });
      const matchData = await res.json();
      setImage(inputUrl);
      setMatches(matchData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 rounded-xl shadow-xl max-w-xl w-full p-8">
        <h1 className="text-white text-4xl font-bold mb-6 text-center">Visual Product Matcher</h1>
        
        <UploadForm onUpload={handleUpload} />

        <form onSubmit={handleUrlSubmit} className="mt-6 flex gap-2">
          <input 
            type="text" 
            placeholder="Paste image URL here"
            value={inputUrl}
            disabled={loading}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-grow p-3 rounded text-black"
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-6 py-3 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search by URL'}
          </button>
        </form>

        {image && (
          <div className="mt-6 text-center">
            <h2 className="text-white text-xl font-semibold mb-2">Input Image:</h2>
            <img src={image} alt="Input" className="inline-block max-w-full rounded shadow" />
          </div>
        )}

        {matches.length > 0 && (
          <div className="mt-8">
            <h2 className="text-black text-xl font-semibold mb-4">Similar Products:</h2>
            <MatchResults matches={matches} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

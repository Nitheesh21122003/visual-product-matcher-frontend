import React from 'react';
import ProductCard from './ProductCard';

function MatchResults({ matches }) {
  if (!matches || matches.length === 0) {
    return <div>No similar products found.</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Similar Products:</h2>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
        {matches.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default MatchResults;

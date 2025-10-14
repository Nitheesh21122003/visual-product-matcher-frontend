import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="rounded shadow p-4 bg-white text-center">
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 'auto', borderRadius: 8 }}
      />
      <div><strong>{product.name}</strong></div>
      <div>{product.category}</div>
      <div>Score: {(product.score * 100).toFixed(0)}</div>
    </div>
  );
}

export default ProductCard;

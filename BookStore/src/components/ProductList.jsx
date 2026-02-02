import ProductItem from "./ProductItem";

export default function ProductList({ products, moveToCart }) {
  return (
    <div className="list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          moveToCart={moveToCart}
        />
      ))}
    </div>
  );
}

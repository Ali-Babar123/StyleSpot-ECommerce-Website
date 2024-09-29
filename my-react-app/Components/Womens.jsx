import React, { useContext } from 'react';
import { productContext } from '../Components/Context/ProductContext';
import "./Womens.css";
import { NavLink } from 'react-router-dom';

const Womens = () => {
  const { filteredProducts, setSelectedProduct } = useContext(productContext);


  const handleBuyNow = (product) =>{
    setSelectedProduct(product);
  }
  // Filter the products to only include women's products
  const womensFilteredProducts = filteredProducts.filter(product =>
    product.category === "women's clothing" || product.category === "jewelery"
  );

  const productCount = womensFilteredProducts.length;

  return (
    <div>
      <h2 className='text-green-600 font-bold'>
        {productCount > 0 ? `${productCount} Product${productCount > 1 ? 's' : ''} Available` : 'No Products Available.'}
      </h2>
      <div className="product-lists">
        {productCount > 0 ? (
          womensFilteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price} USD</p>
              <button className='buynow' onClick={() =>  handleBuyNow(product)}>
              <NavLink to="/SingleProduct">
                Add to cart
              </NavLink>
              </button>
            </div>
          ))
        ) : (
          <p className='m-14 font-medium'>No women's Products Available.</p>
        )}
      </div>
    </div>
  );
}

export default Womens;

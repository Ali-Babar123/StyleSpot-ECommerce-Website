import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { productContext } from './Context/ProductContext';
import "./AllProducts.css";

const AllProducts = () => {
  const { filteredProducts, setSelectedProduct } = useContext(productContext);
  const productCount = filteredProducts.length;
  
  const handleBuyNow = (product) =>{
    setSelectedProduct(product);
  }

  return (
    <div>
      <h2 className='text-green-600 font-bold'>
      {productCount > 0 ? `${productCount} Product${productCount > 1 ? 's' : ''} Available` : 'No Products Available.'}
      </h2>
      <div className="product-lists">
        {productCount > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.price} USD</p>
              <button className='buynow' onClick={() => handleBuyNow(product)}>
                <NavLink to="/SingleProduct">
                Add to cart
                </NavLink>
                </button>
            </div>
          ))
        ) : (
          <p className='m-14 font-medium'>No Products Available.</p>
        )}
      </div>
    </div>
  );
}

export default AllProducts;

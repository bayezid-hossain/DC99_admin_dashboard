import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/ecommerce/actions';
import styles from './Product.module.css';
import Link from 'next/link';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { products, loadingInitData, error } = useSelector(
    (state) => state.Ecommerce
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch({ type: actions.INIT_DATA_SAGA });
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts = !loadingInitData
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  return (
    <div className={styles.container}>
      <h1 className={styles['product-header']}>Products</h1>
      <div className={styles['search-div']}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles['search-input']}
        />
      </div>
      {loadingInitData ? (
        <div className={styles['loader-container']}>
          <div className={styles['loader']}></div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : filteredProducts.length > 0 ? (
        <ul className={styles['product-list']}>
          {filteredProducts.map((product) => (
            <li key={product._id} className={styles['product-item']}>
              <Link href={`/dashboard/products/${product._id}`}>
                <img
                  src={`http://localhost:4000/api/v1/images/${product.images[0]}`}
                  alt={product.name}
                  className={styles['product-image']}
                />
              </Link>
              <div className={styles['product-info']}>
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                {/* <p className="product-price">${product.price}</p> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles['no-products']}>No products found.</p>
      )}
    </div>
  );
};

export default ProductPage;

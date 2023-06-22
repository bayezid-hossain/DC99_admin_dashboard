import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/ecommerce/actions';
import styles from './Product.module.css';
import Link from 'next/link';

const CategoryPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: actions.FETCH_CATEGORIES });
  }, [dispatch]);

  const { categories, loadingInitData, error } = useSelector(
    (state) => state.Ecommerce
  );
  console.log(categories);
  if (!categories) {
    // Reload the page
    window.location.reload();
    return null; // Render nothing until the page reloads
  }
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredCategories =
    categories.length > 0
      ? categories.filter((category) =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className={styles.container}>
      <h1 className={styles['product-header']}>Categories</h1>
      <div className={styles['search-div']}>
        <input
          type="text"
          placeholder="Search Categories..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles['search-input']}
        />
      </div>
      {filteredCategories.length > 0 ? (
        <ul className={styles['product-list']}>
          {filteredCategories.map((category) => (
            <li key={category._id} className={styles['product-item']}>
              <Link href={`/dashboard/categories/${category._id}`}>
                <img
                  src={`http://localhost:4000/api/v1/images/${category.image}`}
                  alt={category.name}
                  className={styles['product-image']}
                />
              </Link>
              <div className={styles['product-info']}>
                <h2 className="product-name">{category.name}</h2>
                <p className="product-description">{category.description}</p>
                {/* <p className="product-price">${product.price}</p> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles['no-products']}>No category found.</p>
      )}
    </div>
  );
};

export default CategoryPage;

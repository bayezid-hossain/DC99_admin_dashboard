import React, { useState } from 'react';
import styles from './Product.module.css';
import actions from '../../redux/ecommerce/actions';
import { useDispatch } from 'react-redux';

const SingleProductInfo = ({ product, handleNavigate }) => {
  console.log(product);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Call your delete API endpoint here
      dispatch({
        type: actions.DELETE_PRODUCT,
        payload: {
          productId: product._id,
        },
      });

      handleNavigate('/dashboard/products');
      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      // Handle error if API call fails
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles['product-details']}>
        <div className={styles['product-header']}>
          <h1 className={styles['product-name']}> {product.name}</h1>
          <div className={styles['action-buttons']}>
            <button
              className={`${styles['action-button']} ${styles['edit-button']}`}
              // onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className={`${styles['action-button']} ${styles['delete-button']}`}
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </div>
        <p className={styles['product-description']}>{product.description}</p>
        {/* <p className={styles['product-price']}>Price: ${product.price}</p> */}
      </div>

      <div className={styles['product-header']}>
        <h1 className={styles['product-name']}>Images</h1>
      </div>
      <div className={styles['product-gallery']}>
        <div className={styles['gallery-preview']}>
          <img
            src={`http://localhost:4000/api/v1/images/${product.images[currentImageIndex]}`}
            alt={product.name}
            className={styles['preview-image']}
          />
        </div>
        <div className={styles['gallery-thumbnails']}>
          {product.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:4000/api/v1/images/${image}`}
              alt={product.name}
              className={styles['thumbnail-image']}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </div>
      <div className={styles['product-categories']}>
        {product.category.map((category) => (
          <span
            key={category._id}
            className={styles['category-label']}
            // Add onClick handler to handle category click
          >
            {category.name}
          </span>
        ))}
      </div>
      {isModalOpen && (
        <div className={styles['modal-container']}>
          <div className={styles['modal-content']}>
            <p>Are you sure you want to delete this product?</p>
            <div className={styles['modal-buttons']}>
              <button
                className={`${styles['modal-button']} ${styles['confirm-button']}`}
                onClick={handleDeleteConfirmation}
              >
                Confirm
              </button>
              <button
                className={`${styles['modal-button']} ${styles['cancel-button']}`}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductInfo;

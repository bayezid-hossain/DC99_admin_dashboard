import React, { useState } from 'react';
import styles from './Product.module.css';
import actions from '../../redux/ecommerce/actions';
import { useDispatch } from 'react-redux';

const SingleCategoryInfo = ({ category, handleNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Call your delete API endpoint here
      dispatch({
        type: actions.DELETE_CATEGORY,
        payload: {
          categoryId: category._id,
        },
      });

      handleNavigate('/dashboard/categories');
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
          <h1 className={styles['product-name']}>Thumbnail</h1>
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

        <div className={styles['product-gallery']}>
          <div className={styles['gallery-preview']}>
            <img
              src={`http://localhost:4000/api/v1/images/${category.image}`}
              alt={category.name}
              className={styles['preview-image']}
            />
          </div>
        </div>
        <div className={styles['product-header']}>
          <h1 className={styles['product-name']}> {category.name}</h1>
        </div>
        <p className={styles['product-description']}>{category.description}</p>
        {/* <p className={styles['product-price']}>Price: ${product.price}</p> */}
      </div>

      {isModalOpen && (
        <div className={styles['modal-container']}>
          <div className={styles['modal-content']}>
            <p>Are you sure you want to delete this category?</p>
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

export default SingleCategoryInfo;

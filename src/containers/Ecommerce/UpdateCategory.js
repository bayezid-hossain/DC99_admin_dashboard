import React, { useState } from 'react';
import styles from './Product.module.css';
import actions from '../../redux/ecommerce/actions';
import { useRouter } from 'next/router';
import siteConfig from '../../config/site.config';
import { useDispatch } from 'react-redux';
import SingleFileDropzone from '../../components/Dropzone/SingleFileDropzone';
import formstyles from '../../pages/dashboard/Form.module.css';
const UpdateCategory = ({ category, handleNavigate }) => {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState({
    name: category.name,
    description: category.description,
    image: category.image,
    id: category._id,
  });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDrop = (acceptedFiles) => {
    const imageFile = acceptedFiles;

    setCategoryData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
    console.log(categoryData);
  };
  const handleRemoveFile = (newFiles) => {
    setCategoryData((prevData) => ({
      ...prevData,
      image: category.image,
    }));
  };
  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    try {
      // Call your delete API endpoint here
      categoryData.image !== category.image
        ? dispatch(actions.updateCategories(categoryData, handleNavigate))
        : (() => {
            const { image, ...newCategoryData } = categoryData;
            dispatch(actions.updateCategories(newCategoryData, handleNavigate));
          })();

      //handleNavigate(`/dashboard/categories/${category._id}`);
      // Close the modal
    } catch (error) {
      // Handle error if API call fails
      console.error(error);
    }
  };

  return (
    <div className={styles['page-container']}>
      <div className={styles['content-container']}>
        <div className={styles['product-info-container']}>
          <form
            className={formstyles['product-form']}
            onSubmit={handleUpdateCategory}
          >
            <div className={formstyles['form-group']}>
              <h1 className={styles['product-header']}>
                Update Category Information
              </h1>
              <label htmlFor="name" className={formstyles['form-label']}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={categoryData.name}
                onChange={handleInputChange}
                className={formstyles['form-input']}
              />
            </div>

            <div className={formstyles['form-group']}>
              <label htmlFor="description" className={formstyles['form-label']}>
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={categoryData.description}
                onChange={handleInputChange}
                className={formstyles['form-textarea']}
              />
            </div>

            <div className={formstyles['form-group']}>
              <label className={formstyles['form-label']}>Thumbnail:</label>
              {categoryData.image === category.image && (
                <div className={formstyles['thumbnail-wrapper']}>
                  <div className={formstyles['thumbnail-image']}>
                    <img
                      src={`http://localhost:4000/api/v1/images/${category.image}`}
                      alt={category.name}
                      height={300}
                      width={300}
                      className={formstyles['preview-image']}
                    />
                  </div>
                </div>
              )}
              <div className={formstyles['dropzone-wrapper']}>
                <SingleFileDropzone
                  onDrop={handleDrop}
                  removeFile={handleRemoveFile}
                  maxFiles={1}
                />
              </div>
            </div>

            <button type="submit">Update</button>
          </form>
        </div>
      </div>

      {/* <footer className={styles['footer']}>{siteConfig.footerText}</footer> */}
    </div>
  );
};

export default UpdateCategory;

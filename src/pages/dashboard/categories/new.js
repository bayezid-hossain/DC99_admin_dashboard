import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withAuthSync } from '../../../authentication/auth.utils';
import styles from '../../../containers/Ecommerce/Product.module.css';
import formstyles from '../Form.module.css';
import SingleFileDropzone from '../../../components/Dropzone/SingleFileDropzone';
import Sidebar from '../../../containers/Sidebar/Sidebar';
import siteConfig from '../../../config/site.config';
import actions from '../../../redux/ecommerce/actions';
import { useRouter } from 'next/router';
const CreateNewCategory = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [categoryData, setCategoryData] = useState({
    name: '',
    description: '',
    image: null,
  });
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
      images: newFiles,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(actions.createCategory(categoryData, router));
  };

  return (
    <div className={styles['page-container']}>
      <div className={styles['content-container']}>
        <div className={styles['sidebar-container']}>
          <Sidebar />
        </div>
        <div className={styles['product-info-container']}>
          <form className={formstyles['product-form']} onSubmit={handleSubmit}>
            <div className={formstyles['form-group']}>
              <h1 className={styles['product-header']}>Create New Category</h1>
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
            {/* <div className={formstyles['form-group']}>
              <label htmlFor="price" className={formstyles['form-label']}>
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className={formstyles['form-input']}
              />
            </div> */}
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

              {/* Dropzone or file input for adding images */}
              <SingleFileDropzone
                onDrop={handleDrop}
                removeFile={handleRemoveFile}
                maxFiles={1}
              />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>

      <footer className={styles['footer']}>{siteConfig.footerText}</footer>
    </div>
  );
};

export default withAuthSync(CreateNewCategory);

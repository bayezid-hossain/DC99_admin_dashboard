import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withAuthSync } from '../../../authentication/auth.utils';
import styles from '../../../containers/Ecommerce/Product.module.css';
import formstyles from '../Form.module.css';
import Dropzone from '../../../components/Dropzone/Dropzone';
import Sidebar from '../../../containers/Sidebar/Sidebar';
import siteConfig from '../../../config/site.config';
import actions from '../../../redux/ecommerce/actions';
import { useRouter } from 'next/router';
const CreateNewProduct = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch({ type: actions.FETCH_CATEGORIES });
  }, [dispatch]);

  const ecommerceState = useSelector((state) => state.Ecommerce);
  const categories = ecommerceState.categories;
  console.log(categories);
  console.log(ecommerceState);
  const [productData, setProductData] = useState({
    name: '',
    price: '0',
    description: '',
    images: [],
    categories: [],
  });

  const [selectedImage, setSelectedImage] = useState(null); // Add selectedImage state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDrop = (acceptedFiles) => {
    // Filter the dropped files to include only image files
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith('image/')
    );

    // Filter out duplicates by comparing file names
    const newFiles = imageFiles.filter((newFile) => {
      return !productData.images.some((existingFile) => {
        return existingFile.name === newFile.name;
      });
    });

    const updatedImages = [...productData.images, ...newFiles];

    console.log(updatedImages);
    if (selectedImage == null) setSelectedImage(0);
    setProductData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };
  const handleRemoveFile = (newFiles) => {
    setProductData((prevData) => ({
      ...prevData,
      images: newFiles,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your form submission logic here (e.g., sending data to backend API)
    console.log('Form submitted:', productData);
    dispatch(actions.createProduct(productData, router));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    console.log(productData.categories);
    setProductData((prevData) => ({
      ...prevData,
      categories: checked
        ? [...prevData.categories, value]
        : prevData.categories.filter((category) => category !== value),
    }));
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
              <h1 className={styles['product-header']}>Create New Product</h1>
              <label htmlFor="name" className={formstyles['form-label']}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={productData.name}
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
                value={productData.description}
                onChange={handleInputChange}
                className={formstyles['form-textarea']}
              />
            </div>
            <div className={formstyles['form-group']}>
              <label className={formstyles['form-label']}>Category:</label>

              {/* Render checkboxes for each category */}
              {categories.map((category) => (
                <label
                  key={category._id}
                  className={formstyles['category-checkbox']}
                >
                  <input
                    type="checkbox"
                    name="category"
                    value={category._id}
                    checked={productData.categories.includes(category._id)}
                    onChange={handleCheckboxChange}
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <div className={formstyles['form-group']}>
              <label className={formstyles['form-label']}>Images:</label>

              {/* Dropzone or file input for adding images */}
              <Dropzone
                onDrop={handleDrop}
                removeFile={handleRemoveFile}
                maxFiles={50}
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

export default withAuthSync(CreateNewProduct);

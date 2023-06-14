import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SingleProductInfo from '../../../../containers/Ecommerce/SingleProductInfo';
import siteConfig from '../../../../config/site.config';
import styles from '../../../../containers/Ecommerce/Product.module.css';
import Sidebar from '../../../../containers/Sidebar/Sidebar';
const ProductPage = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:4000/api/v1/products/${productId}`
      );
      const data = await response.json();
      setProduct(data.product);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p className={styles['no-products']}>Product not found.</p>;
  }

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className={styles['page-container']}>
      <div className={styles['content-container']}>
        <div className={styles['sidebar-container']}>
          <Sidebar />
        </div>
        <div className={styles['product-info-container']}>
          <SingleProductInfo
            product={product}
            handleNavigate={handleNavigate}
          />
        </div>
      </div>
      <footer className={styles['footer']}>{siteConfig.footerText}</footer>
    </div>
  );
};

export default ProductPage;

export async function getServerSideProps({ params }) {
  return { props: { productId: params.id } };
}

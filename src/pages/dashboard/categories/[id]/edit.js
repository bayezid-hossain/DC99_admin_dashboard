import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UpdateCategory from '../../../../containers/Ecommerce/UpdateCategory';
import siteConfig from '../../../../config/site.config';
import Sidebar from '../../../../containers/Sidebar/Sidebar';
import styles from '../../../../containers/Ecommerce/Product.module.css';
const CategoryPage = ({ categoryId }) => {
  const [category, setCategory] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(
        `http://localhost:4000/api/v1/categories/${categoryId}`
      );
      const data = await response.json();
      setCategory(data.data);
    };

    fetchCategory();
  }, [categoryId]);

  if (!category) {
    return <p className={styles['no-products']}>Category not found.</p>;
  }

  const handleNavigate = (path) => {
    router.replace(path);
    // router.reload(0);
  };

  return (
    <div className={styles['page-container']}>
      <div className={styles['content-container']}>
        <div className={styles['sidebar-container']}>
          <Sidebar />
        </div>
        <div className={styles['product-info-container']}>
          <UpdateCategory category={category} handleNavigate={handleNavigate} />
        </div>
      </div>
      <footer className={styles['footer']}>{siteConfig.footerText}</footer>
    </div>
  );
};

export default CategoryPage;

export async function getServerSideProps({ params }) {
  return { props: { categoryId: params.id } };
}

import React from 'react';
import Head from 'next/head';
import { withAuthSync } from '../../../authentication/auth.utils';
import styles from '../../../containers/Ecommerce/Product.module.css';
import Sidebar from '../../../containers/Sidebar/Sidebar';
import siteConfig from '../../../config/site.config';
import CategoryPage from '../../../containers/Ecommerce/CategoryPage';

export default withAuthSync(() => (
  <div className={styles['page-container']}>
    <Head>
      <title>Categories</title>
    </Head>
    <div className={styles['content-container']}>
      <div className={styles['sidebar-container']}>
        <Sidebar />
      </div>
      <div className={styles['product-info-container']}>
        <CategoryPage />
      </div>
    </div>
    <footer className={styles['footer']}>{siteConfig.footerText}</footer>
  </div>
));

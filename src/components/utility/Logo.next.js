import React from 'react';
import Link from 'next/link';
import siteConfig from '@iso/config/site.config';
import { IoIosFlash } from 'react-icons/io';

export default function LogoNext({ collapsed }) {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <IoIosFlash size={27} />
          </h3>
        </div>
      ) : (
        <h2
          style={{
            color: '#fff',
            padding: '10px',
          }}
        >
          <Link
            href="/dashboard"
            style={{ color: '#fff', textDecoration: 'none' }}
          >
            {siteConfig.siteName}
          </Link>
        </h2>
      )}
    </div>
  );
}

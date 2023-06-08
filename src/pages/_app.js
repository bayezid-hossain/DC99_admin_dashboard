import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../redux/store';
import 'antd/dist/antd';
import '@glidejs/glide/dist/css/glide.core.min.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import '../style/global.css';

function CustomApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(initStore)(CustomApp);

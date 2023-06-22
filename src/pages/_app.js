import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer />
    </Provider>
  );
}

export default withRedux(initStore)(CustomApp);

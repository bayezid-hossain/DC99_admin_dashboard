import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import themes from '@iso/config/theme/theme.config';
import AppLocale from '@iso/config/translation';
import useWindowSize from '@iso/library/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';

const { toggleAll } = appActions;
export default function AppProvider({ children }) {
  const dispatch = useDispatch();

  const currentAppLocale = AppLocale[locale];
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [dispatch]);
  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider messages={currentAppLocale.messages}>
        <ThemeProvider theme={themes[themeName]}>{children}</ThemeProvider>
      </IntlProvider>
    </ConfigProvider>
  );
}

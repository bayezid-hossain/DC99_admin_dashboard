import React from 'react';

let direction = 'ltr';
if (typeof window !== 'undefined') {
  direction = document.getElementsByTagName('html')[0].getAttribute('dir');
}

const withDirection = (Component) => {
  const WrappedComponent = (props) => {
    return <Component {...props} data-rtl={direction} />;
  };

  WrappedComponent.displayName = `withDirection(${
    Component.displayName || Component.name || 'Component'
  })`;

  return WrappedComponent;
};

export default withDirection;
export { direction };

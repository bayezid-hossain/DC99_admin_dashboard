import React from 'react';
import { EmptyComponent } from './EmptyComponent.style';

const EmptyComponentWrapper = ({ value }) => {
  return (
    <EmptyComponent className="isoEmptyComponent">
      {value ? <span>{value}</span> : 'Please include Config'}
    </EmptyComponent>
  );
};

EmptyComponentWrapper.displayName = 'EmptyComponentWrapper';

export default EmptyComponentWrapper;

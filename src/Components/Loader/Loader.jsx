import Loader from 'react-loader-spinner';

import React from 'react';

const Spinner = () => {
  const style = { textAlign: 'center' };
  return (
    <div style={style}>
      <Loader type="Hearts" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Spinner;

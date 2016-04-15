define(['react'], (React) => {
  'use strict';

  return ({children}) => {
    return (
      <div className='uk-container uk-container-center'>
        {children}
      </div>
    );
  };
});
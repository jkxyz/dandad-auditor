define(['react', 'react-redux', 'jsx!./ViewSelect', 'jsx!./ViewSelectOption'], (React, ReactRedux, ViewSelect, ViewSelectOption) => {
  'use strict';

  const App = ({children}) => {
    return (
      <div className="uk-container uk-container-center">
        {children}
      </div>
    );
  };

  const mapStateToProps = state => {
    return {};
  };

  const mapDispatchToProps = dispatch => {
    return {};
  };

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
});
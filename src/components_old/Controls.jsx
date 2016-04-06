define(['react', 'react-redux', 'jsx!./Login', 'jsx!./PagesRefresh', 'jsx!./PageSelector'],
  (React, ReactRedux, Login, PagesRefresh, PageSelector) => {

    'use strict';

    const Controls = () => {

      return (
        <div className='uk-margin-top uk-margin-bottom'>
          <PageSelector />
          <PagesRefresh />
          <Login />
        </div>
      )

    };

    const mapStateToProps = (state) => {

      return {}

    };

    const mapDispatchToProps = (dispatch) => {

      return {}

    };

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Controls)

  }
);

define(['react', 'react-redux', 'jsx!./Login', 'jsx!./PagesRefresh'], (React, ReactRedux, Login, PagesRefresh) => {

  const Controls = () => {
    return <div className='uk-margin-top uk-margin-bottom'>
      <PagesRefresh />
      <Login />
    </div>
  }

  const mapStateToProps = (state) => {
    return {}
  }

  const mapDispatchToProps = (dispatch) => {
    return {}
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Controls)

})
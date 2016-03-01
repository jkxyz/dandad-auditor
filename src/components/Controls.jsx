define(['react', 'react-redux', 'jsx!./Login'], (React, ReactRedux, Login) => {

  const Controls = () => {
    return <div className='uk-margin-top uk-margin-bottom'>
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

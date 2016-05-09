import React from 'react'
import ViewSelector from './ViewSelector'
import LoginButton from './LoginButton'

export default ({ currentView, children }) => {
  return (
    <div className='uk-margin-top'>
      <ViewSelector current={ currentView } />
      { children }
      <LoginButton className='uk-float-right' />
    </div>
  )
}

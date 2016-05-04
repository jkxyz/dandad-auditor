import React from 'react'
import {Link} from 'react-router'

export default ({current}) => {
  return (
    <div className='uk-button-dropdown' data-uk-dropdown>
      <button className='uk-button'>
        {current}
        <i class='uk-icon-caret-down uk-margin-small-left' />
      </button>
      <div className='uk-dropdown uk-dropdown-bottom'>
        <ul className='uk-nav uk-nav-dropdown'>
          <li><Link to='/'>Pages</Link></li>
          <li><Link to='/components/web-to-leads'>Web to Lead Forms</Link></li>
        </ul>
      </div>
    </div>
  )
}
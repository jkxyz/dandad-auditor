import React from 'npm:react'
import {Link} from 'npm:react-router'

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
        </ul>
      </div>
    </div>
  )
}
define(['react', 'react-router'], (React, {Link}) => {
  'use strict';

  return ({path, children, onClick}) => (
    <li>
      <Link to={path} onClick={onClick}>{children}</Link>
    </li>
  );
});
define(['react', 'jsx!./Controls', 'jsx!./PagesTable'], (React, Controls, PagesTable) => {

  'use strict';

  return () => {

    return (
      <div className='uk-container uk-container-center'>
        <Controls />
        <PagesTable />
      </div>
    )

  }

});

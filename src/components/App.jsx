define(['react', 'jsx!./Controls', 'jsx!./PagesTable'], (React, Controls, PagesTable) => {

  const App = () => {

    return <div className='uk-container uk-container-center'>
      <Controls />
      <PagesTable />
    </div>

  }

  return App

})

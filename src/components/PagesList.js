define(['react', 'jsx!./ViewSelect'], (React, ViewSelect) => {
  'use strict';

  const PagesList = () => {
    return (
      <div className="uk-margin-top">
        <ViewSelect currentPage="Pages List" />
      </div>
    );
  };

  return PagesList;
});
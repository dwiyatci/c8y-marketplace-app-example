import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TenantSearchForm } from 'features/tenantSearch/TenantSearchForm';
import { ManagedObjectListPage } from 'features/managedObjectList/ManagedObjectListPage';
import { ManagedObjectDetailsPage } from 'features/managedObjectDetails/ManagedObjectDetailsPage';

import { RootState } from './rootReducer';

import {
  setCurrentDisplayType,
  setCurrentPage
} from 'features/managedObjectsDisplay/managedObjectsDisplaySlice';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { displayType, page, managedObjectId } = useSelector(
    (state: RootState) => state.managedObjectsDisplay
  );

  const setJumpToPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const showManagedObjectList = () => {
    dispatch(setCurrentDisplayType({ displayType: 'master' }));
  };

  const showManagedObjectDetails = (managedObjectId: string) => {
    dispatch(setCurrentDisplayType({ displayType: 'detail', managedObjectId }));
  };

  let content;

  if (displayType === 'master') {
    content = (
      <>
        <TenantSearchForm setJumpToPage={setJumpToPage} />
        <ManagedObjectListPage
          page={page}
          setJumpToPage={setJumpToPage}
          showManagedObjectDetails={showManagedObjectDetails}
        />
      </>
    );
  } else if (managedObjectId !== undefined) {
    content = (
      <ManagedObjectDetailsPage
        managedObjectId={managedObjectId}
        showManagedObjectList={showManagedObjectList}
      />
    );
  }

  return <div className="App">{content}</div>;
};

export default App;

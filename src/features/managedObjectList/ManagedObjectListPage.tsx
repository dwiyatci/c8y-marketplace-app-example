import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'app/rootReducer';
import { fetchManagedObjectCount } from 'features/tenantSearch/tenantDetailsSlice';

import { ManagedObjectsPageHeader } from './ManagedObjectsPageHeader';
import { ManagedObjectsPagination, OnPageChangeCallback } from './ManagedObjectsPagination';
import { ManagedObjectList } from './ManagedObjectList';
import { fetchManagedObjects } from './managedObjectsSlice';

interface Props {
  page: number;
  setJumpToPage: (page: number) => void;
  showManagedObjectDetails: (managedObjectId: string) => void;
}

export const ManagedObjectListPage = ({
  page = 1,
  setJumpToPage,
  showManagedObjectDetails
}: Props) => {
  const dispatch = useDispatch();

  const {
    currentPageManagedObjects,
    isLoading,
    error: managedObjectsError,
    managedObjectsByIds,
    pageCount
  } = useSelector((state: RootState) => state.managedObjects);

  const managedObjectCount = useSelector(
    (state: RootState) => state.tenantDetails.managedObjectCount
  );

  const managedObjects = currentPageManagedObjects.map(
    managedObjectId => managedObjectsByIds[managedObjectId]
  );

  const currentPage = Math.min(pageCount, Math.max(page, 1));

  useEffect(() => {
    dispatch(fetchManagedObjects(currentPage));
    dispatch(fetchManagedObjectCount());
  }, [currentPage, dispatch]);

  if (managedObjectsError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{managedObjectsError.toString()}</div>
      </div>
    );
  }

  const renderedList = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <ManagedObjectList
      managedObjects={managedObjects}
      showManagedObjectDetails={showManagedObjectDetails}
    />
  );

  const onPageChanged: OnPageChangeCallback = selectedItem => {
    const newPage = selectedItem.selected + 1;
    setJumpToPage(newPage);
  };

  return (
    <div id="managed-object-list-page">
      <ManagedObjectsPageHeader managedObjectCount={managedObjectCount} />
      <ManagedObjectsPagination
        currentPage={currentPage - 1}
        pageCount={pageCount}
        onPageChange={onPageChanged}
      />
      {renderedList}
    </div>
  );
};

import React from 'react';

interface Props {
  managedObjectCount: number;
}

export function ManagedObjectsPageHeader({ managedObjectCount = -1 }: Props) {
  if (managedObjectCount === -1) {
    return <h1>No managed objects for this tenant.</h1>;
  }

  const pluralizedManagedObject = managedObjectCount === 1 ? 'managed object' : 'managed objects';

  return (
    <h1>
      <span className="header__managedObjects">{managedObjectCount}</span> {pluralizedManagedObject}{' '}
      for this tenant
    </h1>
  );
}

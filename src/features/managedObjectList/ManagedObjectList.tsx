import React from 'react';
import { IManagedObject } from '@c8y/client';

import { ManagedObjectListItem } from './ManagedObjectListItem';

import styles from './ManagedObjectList.module.css';

interface Props {
  managedObjects: IManagedObject[];
  showManagedObjectDetails: (managedObjectId: string) => void;
}

export const ManagedObjectList = ({ managedObjects, showManagedObjectDetails }: Props) => {
  const renderedManagedObjects = managedObjects.map(managedObject => (
    <li
      key={managedObject.id}
      onClick={showManagedObjectDetails.bind(showManagedObjectDetails, managedObject.id)}
    >
      <ManagedObjectListItem
        {...managedObject}
        showManagedObjectDetails={showManagedObjectDetails}
      />
    </li>
  ));

  return <ul className={styles.managedObjectList}>{renderedManagedObjects}</ul>;
};

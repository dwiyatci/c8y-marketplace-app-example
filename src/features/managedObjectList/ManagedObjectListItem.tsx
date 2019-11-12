import React, { MouseEvent } from 'react';
import { IManagedObject } from '@c8y/client';

import { ManagedObjectTypeLabel } from 'components/ManagedObjectTypeLabel';
import { OwnerWithAvatar } from 'components/OwnerWithAvatar';

import styles from './ManagedObjectListItem.module.css';

type Props = IManagedObject & {
  showManagedObjectDetails: (managedObjectId: string) => void;
};

export const ManagedObjectListItem = ({
  id,
  name,
  type,
  owner,
  applicationOwner,
  showManagedObjectDetails
}: Props) => {
  const onManagedObjectClicked = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showManagedObjectDetails(id);
  };

  return (
    <div className={styles.managedObject}>
      <OwnerWithAvatar owner={owner || applicationOwner} />
      <div className="managedObject__body">
        <a href="#details" onClick={onManagedObjectClicked}>
          <span className={styles.id}>#{id}</span>
          <span className={styles.name}>{name || '✗'}</span>
        </a>
        <div>
          <ManagedObjectTypeLabel type={type} className={styles.type} />
        </div>
      </div>
    </div>
  );
};

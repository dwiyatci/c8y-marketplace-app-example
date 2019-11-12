import React from 'react';
import classnames from 'classnames';
import { IManagedObject } from '@c8y/client';

import { OwnerWithAvatar } from 'components/OwnerWithAvatar';

import styles from './ManagedObjectMeta.module.css';

interface Props {
  managedObject: IManagedObject;
}

const ManagedObjectId = ({ managedObject }: Props) => (
  <span className={classnames('managedObject-detail__number', managedObject.id)}>
    #{managedObject.id}
  </span>
);

export const ManagedObjectMeta = ({ managedObject }: Props) => {
  return (
    <div className={classnames('managedObject-detail__meta', styles.meta)}>
      <ManagedObjectId managedObject={managedObject} />
      <OwnerWithAvatar
        owner={managedObject.owner || managedObject.applicationOwner}
        orientation="horizontal"
      />
    </div>
  );
};

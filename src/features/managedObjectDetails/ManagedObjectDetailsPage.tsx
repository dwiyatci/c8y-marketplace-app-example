import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import JSONTree from 'react-json-tree';
import classnames from 'classnames';

import { RootState } from 'app/rootReducer';
import { fetchManagedObject } from 'features/managedObjectList/managedObjectsSlice';
import { ManagedObjectTypeLabel } from 'components/ManagedObjectTypeLabel';

import { ManagedObjectMeta } from './ManagedObjectMeta';

import styles from './ManagedObjectDetailsPage.module.css';
import './ManagedObjectDetailsPage.css';

interface Props {
  managedObjectId: string;
  showManagedObjectList: () => void;
}

export const ManagedObjectDetailsPage = ({ managedObjectId, showManagedObjectList }: Props) => {
  const dispatch = useDispatch();

  const managedObject = useSelector(
    (state: RootState) => state.managedObjects.managedObjectsByIds[managedObjectId]
  );

  useEffect(() => {
    if (!managedObject) {
      dispatch(fetchManagedObject(managedObjectId));
    }

    // Since we may have the managed object already, ensure we're scrolled to the top
    window.scrollTo({ top: 0 });
  }, [managedObjectId, managedObject, dispatch]);

  let content;

  const backToManagedObjectListButton = (
    <button className="pure-button" onClick={showManagedObjectList}>
      Back to Managed Object List
    </button>
  );

  if (managedObject === null) {
    content = (
      <div className="managedObject-detail--loading">
        {backToManagedObjectListButton}
        <p>Loading managed object #{managedObjectId}...</p>
      </div>
    );
  } else {
    const theme = {
      scheme: 'monokai',
      author: 'wimer hazenberg (http://www.monokai.nl)',
      base00: '#272822',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633'
    };

    content = (
      <div className={classnames('managedObjectDetailsPage', styles.managedObjectDetailsPage)}>
        <h1 className="managedObject-detail__name">{managedObject.name || '✗'}</h1>
        {backToManagedObjectListButton}
        <ManagedObjectMeta managedObject={managedObject} />
        <ManagedObjectTypeLabel
          type={managedObject.type}
          className={styles.managedObjectTypeLabels}
        />
        <hr className={styles.divider} />
        <div className={styles.summary}>
          <JSONTree data={managedObject} theme={theme} invertTheme={true}></JSONTree>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

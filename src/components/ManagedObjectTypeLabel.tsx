import React from 'react';
import classnames from 'classnames';

interface ManagedObjectTypeLabelProps {
  type: string;
  className?: string;
}

export const ManagedObjectTypeLabel = ({ type, className }: ManagedObjectTypeLabelProps) => (
  <div className={classnames('managedObjectType__labels', className)}>
    <span
      className="managedObjectType__label"
      style={{
        boxShadow: 'rgb(2, 215, 225) 0px 0px 2px',
        borderColor: 'rgb(2, 215, 225)'
      }}
    >
      Type: {type || '✗'}
    </span>
  </div>
);

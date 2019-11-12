import React from 'react';
import classnames from 'classnames';
import Paginate, { ReactPaginateProps } from 'react-paginate';

import styles from './ManagedObjectsPagination.module.css';
import './ManagedObjectsPagination.css';

export type OnPageChangeCallback = ReactPaginateProps['onPageChange'];

interface Props {
  currentPage: number;
  pageCount: number;
  onPageChange?: OnPageChangeCallback;
}

export const ManagedObjectsPagination = ({ currentPage, pageCount, onPageChange }: Props) => {
  return (
    <div className={classnames('managedObjectsPagination', styles.pagination)}>
      <Paginate
        forcePage={currentPage}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageChange}
        nextLabel="&rarr;"
        previousLabel="&larr;"
      />
    </div>
  );
};

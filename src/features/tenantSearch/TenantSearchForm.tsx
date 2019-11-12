import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../app/rootReducer';

import './pure-forms.css';
import './pure-buttons.css';

interface Props {
  setJumpToPage: (page: number) => void;
}

type InputEvent = ChangeEvent<HTMLInputElement>;
type ChangeHandler = (e: InputEvent) => void;

export const TenantSearchForm = ({ setJumpToPage }: Props) => {
  const [currentPageText, setCurrentPageText] = useState('1');
  const { pageCount } = useSelector((state: RootState) => state.managedObjects);

  const onCurrentPageChanged: ChangeHandler = e => {
    setCurrentPageText(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onJumpToPageClicked();
    }
  };

  const onJumpToPageClicked = () => {
    const newPage = parseInt(currentPageText);

    if (newPage >= 1 && newPage <= pageCount) {
      setJumpToPage(newPage);
    }
  };

  return (
    <form className="pure-form">
      <div style={{ marginTop: 5 }}>
        <label htmlFor="jumpToPage" style={{ marginRight: 5 }}>
          Managed Objects Page:
        </label>
        <input
          name="jumpToPage"
          value={currentPageText}
          onChange={onCurrentPageChanged}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="pure-button pure-button-primary"
          style={{ marginLeft: 5 }}
          onClick={onJumpToPageClicked}
        >
          Jump to Page
        </button>
      </div>
    </form>
  );
};

import React from 'react';
import classnames from 'classnames';

import styles from './OwnerWithAvatar.module.css';
import glennAvatar from './glenn.png';
import janAvatar from './jan.png';
import unnamedAvatar from './unnamed.png';

interface OwnerAvatarProps {
  owner: string;
  orientation?: 'vertical' | 'horizontal';
  classes?: { [key: string]: string };
}

export const OwnerWithAvatar = ({
  owner,
  orientation = 'vertical',
  classes = {}
}: OwnerAvatarProps) => {
  const linkClassnames = classnames(styles.managedObjectOwner, {
    [styles.vertical]: orientation === 'vertical',
    [styles.horizontal]: orientation === 'horizontal'
  });

  const avatarClassnames = classnames(styles.avatar, classes.avatar);
  const usernameClassnames = classnames(styles.username, classes.username);

  const avatarUrlsByOwners: Record<string, string> = {
    glenn: glennAvatar,
    jan: janAvatar
  };

  const contents = (
    <>
      <img className={avatarClassnames} src={avatarUrlsByOwners[owner] || unnamedAvatar} alt="" />
      <div className={usernameClassnames}>{owner}</div>
      {orientation === 'vertical' ? <div className={usernameClassnames}>owns ↗</div> : null}
    </>
  );

  return <span className={linkClassnames}>{contents}</span>;
};

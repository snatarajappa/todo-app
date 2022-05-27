import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import logo from './domo.png';
import profile from './profile.png';
import menu from './menu.png';
import pencil from './pencil.png';
import search from './search.png';

interface Props {
  completedTasksCount: number;
  totalTasksCount: number;
  updateMenuFlag(): any;
}

export const Header: FC<Props> = (props) => {
  const [title, setTitle] = useState('My Tasks');
  return (
    <div className={styles.Header}>
      <div className={styles.Start}>
        <img src={logo} alt="logo" className={styles.Logo} />
        <img src={profile} alt="profile" className={styles.Profile} />
      </div>
      <div className={styles.Title}>
        My Tasks
        <img src={pencil} alt="pencil" />
      </div>
      <div className={styles.SubTitle}>
        <div>
          {props.completedTasksCount} of {props.totalTasksCount} Tasks Completed
        </div>
        <div className={styles.SearchIcon}>
          <img src={search} alt="search" />
        </div>
        <div className={styles.DropDownContainer}>
          <div
            className={styles.ThreeDots}
            onClick={() => props.updateMenuFlag()}
          >
            <img src={menu} alt="menu" />
          </div>
        </div>
      </div>
      <div className={styles.End} />
    </div>
  );
};

import { taskCancelled } from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import { Task } from 'components/task';
import React, { FC, useState, useEffect } from 'react';
import styles from './index.module.scss';
import search from './search.png';
import sort from './sort.png';

type TaskType = {
  id: string;
  content: {
    title: string;
    note: string;
    url: string;
    date: string;
    time: string;
    priority: string;
    status: string;
  };
};

interface Props {
  tasks: TaskType[];
  swapOrder(): any;
  openTaskDetails(task: TaskType): any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  searchQuery: string;
  updateSearchQuery(text: string): any;
}

export const Body: FC<Props> = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const openTaskDetails = (task: TaskType) => {
    props.openTaskDetails(task);
  };

  return (
    <div className={styles.Body}>
      <div className={styles.SearchBar}>
        <div className={styles.Search}>
          <img src={search} alt="search" />
          <input
            placeholder="      Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.currentTarget.value);
              props.updateSearchQuery(e.currentTarget.value);
            }}
          />
        </div>
        <div className={styles.Filter} onClick={() => props.swapOrder()}>
          <img src={sort} alt="sort" />
        </div>
      </div>
      <div className={styles.Content}>
        {props.tasks.map((task: TaskType) => (
          <Task
            key={task.id}
            id={task.id}
            content={task.content}
            openTaskDetails={openTaskDetails}
          />
        ))}
      </div>
    </div>
  );
};

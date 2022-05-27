import React, { FC, useState } from 'react';
import domo from 'ryuu.js';
import styles from './index.module.scss';

type ContentType = {
  title: string;
  note: string;
  url: string;
  date: string;
  time: string;
  priority: string;
  status: string;
};

type TaskType = {
  id: string;
  content: ContentType;
};

interface Props {
  id: string;
  content: ContentType;
  openTaskDetails(task: TaskType): any;
}
const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const monthValues = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const Task: FC<Props> = (props) => {
  const [isActive, setIsActive] = useState(props.content.status === 'Active');
  const handleStatus = () => {
    setIsActive(!isActive);
    updateTask();
  };
  const updateTask = () => {
    domo
      .put(`/domo/datastores/v1/collections/tasks/documents/${props.id}`, {
        content: {
          title: props.content.title,
          note: props.content.note,
          url: props.content.url,
          date: props.content.date,
          time: props.content.time,
          priority: props.content.priority,
          status: isActive ? 'Completed' : 'Active',
        },
      })
      .then((data) => console.log(data));
  };
  let status: JSX.Element;
  let title: JSX.Element;
  let priority: JSX.Element;
  if (isActive) {
    status = (
      <input
        className={styles.Status}
        type="checkbox"
        onChange={() => handleStatus()}
      />
    );
    title = <span className={styles.Title}>{props.content.title}</span>;
  } else {
    status = (
      <input
        type="checkbox"
        checked
        onChange={() => handleStatus()}
        className={styles.Status}
      />
    );
    title = <span className={styles.TitleChecked}>{props.content.title}</span>;
  }
  if (props.content.priority === '1') {
    priority = <span className={styles.Priority1}>Low</span>;
  } else if (props.content.priority === '2') {
    priority = <span className={styles.Priority2}>High</span>;
  } else {
    priority = <span className={styles.Priority3}>Urgent</span>;
  }

  const d = new Date(props.content.date);
  const day = weekday[d.getDay()];
  const date = d.getDate();
  const month = monthValues[d.getMonth()];

  return (
    <div className={styles.Task}>
      <span>{status}</span>
      <span
        className={styles.TaskDetails}
        onClick={() => {
          props.openTaskDetails({ id: props.id, content: props.content });
        }}
      >
        {title}
        {priority}
        <div className={styles.Note}>{props.content.note}</div>
        <div className={styles.URL}>{props.content.url}</div>
        <div className={styles.Date}>
          {day}, {month} {date}
        </div>
      </span>
    </div>
  );
};

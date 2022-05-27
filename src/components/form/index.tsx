import React, { FC, useState } from 'react';
import styles from './index.module.scss';
import domo from 'ryuu.js';
import back from './left_arrow.png';

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
  action: string;
  updateFormFlag(): any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  taskObject: TaskType;
}

export const CustomForm: FC<Props> = (props) => {
  const [title, setTitle] = useState(
    props.action === 'Edit' ? props.taskObject.content.title : '',
  );
  const [note, setNote] = useState(
    props.action === 'Edit' ? props.taskObject.content.note : '',
  );
  const [url, setURL] = useState(
    props.action === 'Edit' ? props.taskObject.content.url : '',
  );
  const [date, setDate] = useState(
    props.action === 'Edit' ? props.taskObject.content.date : '',
  );
  const [time, setTime] = useState(
    props.action === 'Edit' ? props.taskObject.content.time : '',
  );
  const [priority, setPriority] = useState(
    props.action === 'Edit' ? props.taskObject.content.priority : '1',
  );

  const radios = [
    { name: 'Low', value: '1' },
    { name: 'High', value: '2' },
    { name: 'Urgent', value: '3' },
  ];

  const handlePriority = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPriority(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.action === 'Add') {
      domo
        .post(`/domo/datastores/v1/collections/tasks/documents/`, {
          content: {
            title,
            note,
            url,
            date,
            time,
            priority,
            status: 'Active',
          },
        })
        .then(() => props.updateFormFlag());
    } else {
      domo
        .put(
          `/domo/datastores/v1/collections/tasks/documents/${props.taskObject.id}`,
          {
            content: {
              title,
              note,
              url,
              date,
              time,
              priority,
              status: 'Active',
            },
          },
        )
        .then(() => props.updateFormFlag());
    }
  };

  const handleDelete = () => {
    domo
      .delete(
        `/domo/datastores/v1/collections/tasks/documents/${props.taskObject.id}`,
      )
      .then(() => props.updateFormFlag());
  };
  return (
    <div className={styles.CustomForm}>
      <div className={styles.Logo}>
        <div className={styles.Header}>
          <div className={styles.BackButton}>
            <img
              src={back}
              alt="back button"
              onClick={() => props.updateFormFlag()}
            />
          </div>
          <div className={styles.Title}>{props.action} your To-Do</div>
        </div>
      </div>
      <div className={styles.Body}>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.Title}>
            <input
              type="text"
              placeholder="    New item title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.Note}>
            <input
              type="text"
              placeholder="    Notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className={styles.URL}>
            <input
              type="text"
              placeholder="    URL"
              value={url}
              onChange={(e) => setURL(e.target.value)}
            />
          </div>
          <div className={styles.DueDate}>
            Completion Due Date
            <input
              className={styles.Date}
              type="date"
              placeholder="    Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className={styles.Time}
              type="time"
              placeholder="    Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className={styles.Priority}>
            Set Priority
            <div className={styles.ButtonGroup}>
              {radios.map((radio, idx) =>
                priority === radio.value ? (
                  <button
                    key={idx}
                    value={radio.value}
                    type="button"
                    onClick={handlePriority}
                    className={styles.SelectedButton}
                  >
                    {radio.name}
                  </button>
                ) : (
                  <button
                    key={idx}
                    value={radio.value}
                    type="button"
                    onClick={handlePriority}
                    className={styles.Button}
                  >
                    {radio.name}
                  </button>
                ),
              )}
            </div>
          </div>
          {props.action === 'Edit' && (
            <div className={styles.DeleteButton}>
              <button onClick={handleDelete}>DELETE TO-DO</button>
            </div>
          )}
          <div className={styles.SubmitButton}>
            <button type="submit">{props.action.toUpperCase()} TO-DO</button>
          </div>
        </form>
      </div>
    </div>
  );
};

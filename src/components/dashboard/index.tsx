import { Body } from 'components/body';
import { Header } from 'components/header';
import React, { FC, useEffect, useState } from 'react';
import { CustomForm } from 'components/form';
import domo from 'ryuu.js';
import styles from './index.module.scss';
import { ResponseBody } from 'ryuu.js/dist/models';

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

type Tasks = {
  tasks: TaskType[];
};
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}

export const Dashboard: FC<Props> = (props) => {
  const initTask = {
    id: '',
    content: {
      title: '',
      note: '',
      url: '',
      date: '',
      time: '',
      priority: '',
      status: '',
    },
  };
  const [tasks, setTasks] = useState([] as any);
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showActiveTasks, setShowActiveTasks] = useState(false);
  const [orderBy, setOrderBy] = useState(false);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([{ count: 0 }] as any);
  const [totalTasks, setTotalTasks] = useState([{ count: 0 }] as any);
  const [taskObject, setTaskObject] = useState(initTask);
  const [formAction, setFormAction] = useState('Add');
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 100;
  const offset = 0;
  let input = {};

  const updateFormFlag = () => {
    setShowForm(!showForm);
    setTaskObject(initTask);
    setSearchQuery('');
  };

  const updateMenuFlag = () => {
    setShowMenu(!showMenu);
  };

  const deleteAllTasks = () => {
    // domo
    //   .post(countURL, inputForCompletedTasks)
    //   .then((data) => setCompletedTasks(data))
    //   .catch((data) => {});
  };

  const swapOrder = () => {
    setOrderBy(!orderBy);
  };

  const openTaskDetails = (task: TaskType) => {
    setFormAction('Edit');
    setShowForm(!showForm);
    setTaskObject(task);
  };

  const updateSearchQuery = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    let orderby;
    if (orderBy) {
      orderby = `content.status ascending, content.priority descending, updatedOn descending`;
    } else {
      orderby = ``;
    }
    const countURL = `/domo/datastores/v1/collections/tasks/documents/query?count=count`;
    const documentsURL = `/domo/datastores/v1/collections/tasks/documents/query?limit=${limit}&offset=${offset}&orderby=${orderby}`;
    const inputForActiveTasks = { 'content.status': { $eq: 'Active' } };
    const inputForCompletedTasks = { 'content.status': { $eq: 'Completed' } };
    if (showActiveTasks && !showCompletedTasks) {
      input = inputForActiveTasks;
    } else if (showCompletedTasks && !showActiveTasks) {
      input = inputForCompletedTasks;
    } else if (searchQuery.length > 0) {
      input = { 'content.title': { $regex: searchQuery, $options: 'i' } };
    }
    if (!showForm) {
      domo
        .post(countURL, inputForCompletedTasks)
        .then((data: ResponseBody) => {
          if (data?.toString() !== '') setCompletedTasks(data);
        })
        .catch((data) => {});

      domo
        .post(countURL, {})
        .then((data) => setTotalTasks(data))
        .catch((data) => {});

      domo
        .post(documentsURL, input)
        .then((data) => setTasks(data))
        .catch((data) => console.log(data));
    }
  }, [
    showForm,
    offset,
    limit,
    showActiveTasks,
    showCompletedTasks,
    orderBy,
    searchQuery,
  ]);
  return (
    <div className={styles.DashBoard}>
      {!showForm && (
        <div className={styles.MainPage}>
          <Header
            completedTasksCount={completedTasks[0].count}
            totalTasksCount={totalTasks[0].count}
            updateMenuFlag={updateMenuFlag}
          />
          <Body
            tasks={tasks}
            swapOrder={swapOrder}
            openTaskDetails={openTaskDetails}
            searchQuery={searchQuery}
            updateSearchQuery={updateSearchQuery}
          />
          {showMenu && (
            <button className={styles.DropDown}>
              <button
                className={styles.All}
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowActiveTasks(true);
                  setShowCompletedTasks(true);
                }}
              >
                Show All
              </button>
              <button
                className={styles.Active}
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowActiveTasks(true);
                  setShowCompletedTasks(false);
                }}
              >
                Show Active
              </button>
              <button
                className={styles.Completed}
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowCompletedTasks(true);
                  setShowActiveTasks(false);
                }}
              >
                Show Completed
              </button>
              <button
                className={styles.Delete}
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowActiveTasks(!showActiveTasks);
                  setShowCompletedTasks(!showCompletedTasks);
                }}
              >
                Delete All
              </button>
            </button>
          )}
          <div onClick={updateFormFlag} className={styles.AddButton}>
            +
          </div>
        </div>
      )}
      {showForm && (
        <div className={styles.FormPage}>
          <CustomForm
            action={formAction}
            updateFormFlag={updateFormFlag}
            taskObject={taskObject}
          />
        </div>
      )}
    </div>
  );
};

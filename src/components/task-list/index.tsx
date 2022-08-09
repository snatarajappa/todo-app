import { List, Typography } from '@material-ui/core';
import { TaskItem } from 'components/task-item';
import { Task } from 'models';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksList } from 'reducers/task/selectors';
import styles from './index.module.scss';

export const TaskList: FC = () => {
  const tasks = useSelector(selectTasksList);
  return (
    <div className={styles.TaskList}>
      {tasks.length === 0 && (
        <div>
          <Typography color="textSecondary" gutterBottom>
            No Items to Display
          </Typography>
        </div>
      )}
      {tasks.length > 0 && (
        <List>
          {tasks.map((task: Task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      )}
    </div>
  );
};

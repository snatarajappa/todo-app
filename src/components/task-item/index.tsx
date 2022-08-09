import {
  Card,
  CardActionArea,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { TaskStatus } from 'models';
import { Task } from 'models/interfaces/task';
import moment from 'moment';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeStatusTask } from 'reducers/task/actions';
import { isNotVoid } from 'utils';
import styles from './index.module.scss';

interface Props {
  task: Task;
}

export const TaskItem: FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChangeStatus = (): void => {
    dispatch(changeStatusTask(task));
  };

  const handleEdit = () => {
    navigate(`/task/${task.id}`);
  };

  const getPrimaryText = (): JSX.Element => (
    <Typography
      variant="h5"
      className={styles.TaskTextColor}
      color="textPrimary"
      noWrap
      style={{
        textDecoration:
          task.status === TaskStatus.COMPLETED ? 'line-through' : 'none',
      }}
    >
      {task.title}
    </Typography>
  );

  const getSecondaryText = (): JSX.Element => {
    const date = isNotVoid(task.dueDate)
      ? moment(task.dueDate).format('dddd, MMMM D')
      : null;
    return (
      <Typography variant="body2" color="textPrimary" noWrap>
        {date}
        {date !== null && <br />}
        {task.notes}
      </Typography>
    );
  };
  return (
    <div className={styles.TaskItem}>
      <Card variant="outlined">
        <CardActionArea>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                color="primary"
                checked={task.status === TaskStatus.COMPLETED}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': task.id }}
                className={styles.CheckBox}
                onClick={() => handleChangeStatus()}
              />
            </ListItemIcon>
            <ListItemText
              primary={getPrimaryText()}
              secondary={getSecondaryText()}
              onClick={handleEdit}
            />
            <ListItemSecondaryAction className={styles.SecondaryText}>
              <div>
                {task.priority === 1 ? (
                  <div className={styles.Priority1}>Low</div>
                ) : task.priority === 2 ? (
                  <div className={styles.Priority2}>High</div>
                ) : (
                  <div className={styles.Priority3}>Urgent</div>
                )}
              </div>
            </ListItemSecondaryAction>
          </ListItem>
        </CardActionArea>
      </Card>
    </div>
  );
};

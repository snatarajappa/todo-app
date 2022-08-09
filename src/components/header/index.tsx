import {
  Avatar,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { FC, useEffect, useState } from 'react';
import styles from './index.module.scss';
import logo from '../../assets/images/domo-logo.svg';
import { Edit, Search as SearchIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDataList,
  selectIsLoadingAll,
  selectShowSearchBar,
} from 'reducers/task/selectors';
import { Task, TaskGroupInput, TaskStatus } from 'models';
import { selectTaskGroup } from 'reducers/task-group/selectors';
import { TaskFilter } from 'components/task-filter';
import { setShowSearchBar } from 'reducers/task/actions';
import { selectUser } from 'reducers/identity/selectors';
import { updateTaskGroup } from 'reducers/task-group/actions';

export const Header: FC = () => {
  const dispatch = useDispatch();

  const isLoadingAll = useSelector(selectIsLoadingAll);
  const tasksList = useSelector(selectDataList);
  const taskGroup = useSelector(selectTaskGroup);
  const user = useSelector(selectUser);

  const [searchBarEnabled, setSearchBarEnabled] = useState(
    useSelector(selectShowSearchBar),
  );
  const [isTaskGroupEditable, setIsTaskGroupEditable] = useState(false);
  const [taskGroupName, setTaskGroupName] = useState('');

  const getCompleteTask = (): number => {
    const result = tasksList.filter(
      (task: Task) => task.status === TaskStatus.COMPLETED,
    );
    return result.length;
  };
  let timeout: ReturnType<typeof setTimeout>;
  const updateTaskGroupName = (name: string) => {
    setTaskGroupName(name);
    const input: TaskGroupInput = {
      name: name.toString(),
      userId: user?.userId.toString(),
    };
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(
        updateTaskGroup({
          id: taskGroup?.id as string,
          data: input,
        }),
      );
    }, 1000);
  };

  const showSearchBar = (flag: boolean) => {
    dispatch(setShowSearchBar(flag));
  };

  useEffect(() => {
    setTaskGroupName(taskGroup?.name as string);
  }, [taskGroup]);

  return (
    <div className={styles.Header}>
      <Grid container className={styles.Container}>
        <Grid container className={styles.TopContainer}>
          <Grid item xs={6} className={styles.Logo}>
            <img src={logo} />
          </Grid>
          <Grid item xs={6} className={styles.Profile}>
            <Avatar />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} className={styles.VerticalDisplay}>
            <Grid className={styles.TitleSide}>
              {!isTaskGroupEditable ? (
                <Typography variant="h3" gutterBottom align="left">
                  {taskGroupName}
                </Typography>
              ) : (
                <TextField
                  autoFocus
                  value={taskGroupName}
                  onChange={(event) => updateTaskGroupName(event.target.value)}
                  onBlur={() => setIsTaskGroupEditable(false)}
                />
              )}
              <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => setIsTaskGroupEditable(true)}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Typography
              align="left"
              className={styles.SubTitle}
              color="textSecondary"
            >
              {getCompleteTask()} of {tasksList.length} Tasks Completed{' '}
              {isLoadingAll && <CircularProgress size={15} color="primary" />}
            </Typography>
          </Grid>
          <Grid item xs={1} className={styles.SearchIcon}>
            <Tooltip title="Enable Search">
              <IconButton
                aria-label="search"
                onClick={() => showSearchBar(!searchBarEnabled)}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1} className={styles.Menu}>
            <TaskFilter />
          </Grid>
        </Grid>
      </Grid>
      <div className={styles.End}>&nbsp;</div>
    </div>
  );
};

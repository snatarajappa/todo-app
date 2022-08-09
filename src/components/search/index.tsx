import {
  CircularProgress,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
} from '@material-ui/core';
import { Search as SearchIcon, Mic, Clear, SwapVert } from '@material-ui/icons';
import { TaskGroup } from 'models';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskGroup } from 'reducers/task-group/selectors';
import { searchTasks, setSearchText, setSort } from 'reducers/task/actions';
import {
  selectFilterBy,
  selectIsSearch,
  selectSort,
} from 'reducers/task/selectors';
import styles from './index.module.scss';

export const Search: FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterBy);
  const isSearch = useSelector(selectIsSearch);
  const taskGroup = useSelector(selectTaskGroup);

  const [value, setValue] = useState('');
  const [sortValue, setSortValue] = useState(useSelector(selectSort));

  let timeout: ReturnType<typeof setTimeout>;

  const filterData = (search: string): void => {
    setValue(search);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(setSearchText(search));
      dispatch(
        searchTasks({
          taskGroupId: (taskGroup as TaskGroup).id,
          search,
          filter,
        }),
      );
    }, 1000);
  };

  const clear = (): void => {
    setValue('');
    dispatch(setSearchText(''));
    dispatch(searchTasks({ taskGroupId: (taskGroup as TaskGroup).id, filter }));
  };

  const swap = (sort: boolean): void => {
    setValue('');
    dispatch(setSearchText(''));
    setSortValue(sort);
    dispatch(setSort(sort));
    dispatch(
      searchTasks({
        taskGroupId: (taskGroup as TaskGroup).id,
        filter,
        sort,
      }),
    );
  };

  return (
    <Grid container justify="space-between" className={styles.Search}>
      <Grid item xs={10} className={styles.SearchBar}>
        <Paper
          style={{
            background: 'rgba(118, 118, 128, 0.12)',
            borderRadius: '30px',
            display: 'flex',
            height: '36px',
          }}
        >
          <IconButton aria-label="search" disabled>
            {!isSearch && <SearchIcon />}
            {isSearch && <CircularProgress color="inherit" size={20} />}
          </IconButton>
          <InputBase
            className={styles.Input}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            value={value}
            onChange={(event) => filterData(event.target.value)}
          />
          {value.length === 0 && (
            <IconButton aria-label="mic">
              <Mic />
            </IconButton>
          )}
          {value.length > 0 && (
            <Tooltip title="clear">
              <IconButton aria-label="clear">
                <Clear onClick={clear} />
              </IconButton>
            </Tooltip>
          )}
        </Paper>
      </Grid>
      <Grid item xs={2} className={styles.SwapButton}>
        <Tooltip title="swap">
          <IconButton aria-label="swap">
            <SwapVert
              className={[
                styles.OrderIcon,
                sortValue ? styles.SortByPriority : '',
              ].join(' ')}
              onClick={() => swap(!sortValue)}
            />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

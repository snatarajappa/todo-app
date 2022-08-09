import { IconButton, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { TaskFilterOption, TaskGroup, TaskStatus } from 'models';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaskGroup } from 'reducers/task-group/selectors';
import { deleteAllTasks, loadTasks, setFilterBy } from 'reducers/task/actions';
import { selectSearchText } from 'reducers/task/selectors';
import styles from './index.module.scss';

const FILTER_OPTIONS = [
  { key: null, option: 'Show All' },
  { key: TaskStatus.ACTIVE, option: 'Show Active' },
  { key: TaskStatus.COMPLETED, option: 'Show Completed' },
];

export const TaskFilter: FC = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchText);
  const taskGroup = useSelector(selectTaskGroup);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleFilter = (filter: TaskStatus | null): void => {
    handleClose();
    dispatch(setFilterBy(filter));
    dispatch(
      loadTasks({ taskGroupId: (taskGroup as TaskGroup).id, filter, search }),
    );
  };

  const deleteAll = () => {
    handleClose();
    dispatch(deleteAllTasks());
  };

  return (
    <div className={styles.TaskFilter}>
      <Tooltip title="Filter Tasks">
        <IconButton
          aria-label="filter tasks"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHoriz />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {FILTER_OPTIONS.map((item: TaskFilterOption) => (
          <MenuItem key={item.key} onClick={() => handleFilter(item.key)}>
            {item.option}
          </MenuItem>
        ))}
        <MenuItem onClick={deleteAll}>Delete All</MenuItem>
      </Menu>
    </div>
  );
};

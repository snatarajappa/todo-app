import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { TaskPriority } from 'models/enums/task-priority';
import { FC } from 'react';
import styles from './index.module.scss';

interface Props {
  value: TaskPriority;
  onChange(value: TaskPriority): void;
}

export const PriorityField: FC<Props> = (props) => {
  const handleChange = (newValue: TaskPriority) => {
    props.onChange(newValue);
  };
  return (
    <div className={styles.PriorityField}>
      <FormControl className={styles.ControlArea}>
        <FormLabel>Set Priority</FormLabel>
        <RadioGroup name="priority" value={props.value}>
          <div className={styles.ItemContainer}>
            <button
              type="button"
              onClick={() => {
                props.onChange(TaskPriority.LOW);
              }}
              className={
                props.value === TaskPriority.LOW
                  ? styles.SelectedButton
                  : styles.Button
              }
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => {
                props.onChange(TaskPriority.HIGH);
              }}
              className={
                props.value === TaskPriority.HIGH
                  ? styles.SelectedButton
                  : styles.Button
              }
            >
              High
            </button>
            <button
              type="button"
              onClick={() => {
                props.onChange(TaskPriority.URGENT);
              }}
              className={
                props.value === TaskPriority.URGENT
                  ? styles.SelectedButton
                  : styles.Button
              }
            >
              Urgent
            </button>
          </div>
        </RadioGroup>
      </FormControl>
    </div>
  );
};

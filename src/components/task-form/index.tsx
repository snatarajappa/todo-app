import { FC, useEffect, useState } from 'react';
import { Grid, IconButton, TextField, Typography } from '@material-ui/core';
import { ArrowBack, AccessTime } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import { Formik } from 'formik';
import styles from './index.module.scss';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { PriorityField } from 'components/priority-field';
import { TaskPriority } from 'models/enums/task-priority';
import { useNavigate, useParams } from 'react-router-dom';
import { isNotVoid } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsSavedFinished } from 'reducers/task/selectors';
import { selectTaskGroup } from 'reducers/task-group/selectors';
import { Task, TaskGroup, TaskInput, TaskStatus } from 'models';
import { createTask, deleteTask, updateTask } from 'reducers/task/actions';
import { apiGetTask } from 'reducers/task/services';

interface TaskFormData {
  title: string;
  notes?: string;
  url?: string;
  dueDate?: Date | null;
  dueTime?: Date | null;
  priority: TaskPriority;
  status: TaskStatus;
}

const getInitialValues = () => {
  const values: TaskFormData = {
    title: '',
    notes: '',
    url: '',
    dueDate: null,
    dueTime: null,
    priority: TaskPriority.LOW,
    status: TaskStatus.ACTIVE,
  };
  return values;
};

export const TaskForm: FC = () => {
  const navigate = useNavigate();
  const { taskId }: { taskId?: string } = useParams();
  const dispatch = useDispatch();
  const redirectToHome = useSelector(selectIsSavedFinished);
  const taskGroup = useSelector(selectTaskGroup);
  const [initialValues, setInitialValues] =
    useState<TaskFormData>(getInitialValues);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>();

  const getDueDateTime = (values: TaskFormData): string => {
    let dueDateTime = '';

    if (values.dueDate && values.dueTime) {
      const initialDate = moment(values.dueDate).toDate();
      const hour = moment(values.dueTime).hour();
      const minute = moment(values.dueTime).minutes();

      initialDate.setHours(hour);
      initialDate.setMinutes(minute);
      dueDateTime = initialDate.toISOString();
    }

    return dueDateTime;
  };
  const removeTask = () => {
    dispatch(deleteTask(taskId as string));
  };

  const submitForm = (values: TaskFormData, { setSubmitting }: any) => {
    const data: TaskInput = {
      title: values.title.trim(),
      notes: values.notes?.trim(),
      url: values.url?.trim(),
      taskGroupId: (taskGroup as TaskGroup).id,
      dueDate: getDueDateTime(values),
      priority: values.priority,
      status: taskToUpdate ? taskToUpdate.status : TaskStatus.ACTIVE,
    };
    if (isNotVoid(taskId)) {
      dispatch(updateTask({ id: taskId as string, data }));
    } else {
      dispatch(createTask(data));
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (redirectToHome) {
      navigate('/home');
    }
  }, [redirectToHome]);

  useEffect(() => {
    (async function () {
      if (isNotVoid(taskId)) {
        const data = await apiGetTask(taskId as string);
        setTaskToUpdate(data);
        if (data) {
          const date = isNotVoid(data.dueDate)
            ? new Date(data.dueDate as string)
            : null;
          const result: TaskFormData = {
            title: data.title,
            notes: isNotVoid(data.notes) ? (data.notes as string) : '',
            url: isNotVoid(data.url) ? (data.url as string) : '',
            dueDate: date,
            dueTime: date,
            priority: data.priority,
            status: data.status,
          };
          setInitialValues(result);
        }
      }
    })();
  }, []);

  return (
    <div className={styles.InputForm}>
      <div className={styles.FormHeader}>
        <IconButton
          onClick={() => {
            navigate('/');
          }}
        >
          <ArrowBack />
        </IconButton>
        <ListItem>
          <Typography variant="h5">
            {isNotVoid(taskId) ? 'Update your To-Do' : 'Add your new To-Do'}
          </Typography>
        </ListItem>
      </div>
      <div className={styles.FormBody}>
        <Grid container className={styles.BodyContainer}>
          <Grid item xs={12} md={8}>
            <div className={styles.Form}>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={submitForm}
              >
                {(formProps) => (
                  <form onSubmit={formProps.handleSubmit}>
                    <TextField
                      id="title"
                      name="title"
                      label="Title"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={formProps.values.title}
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      color="primary"
                    />
                    <TextField
                      id="notes"
                      name="notes"
                      label="Notes"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={2}
                      margin="normal"
                      value={formProps.values.notes}
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      color="primary"
                    />
                    <TextField
                      id="url"
                      name="url"
                      label="URL"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={formProps.values.url}
                      onChange={formProps.handleChange}
                      onBlur={formProps.handleBlur}
                      color="primary"
                    />
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                    >
                      <KeyboardDatePicker
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        format="MM/DD/YYYY"
                        inputVariant="outlined"
                        fullWidth
                        margin="normal"
                        value={formProps.values.dueDate ?? null}
                        onChange={(date: MaterialUiPickersDate) => {
                          formProps.setFieldValue(
                            'dueDate',
                            moment(date).toDate(),
                            true,
                          );
                        }}
                        onBlur={formProps.handleBlur}
                        color="primary"
                      />
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider
                      libInstance={moment}
                      utils={MomentUtils}
                    >
                      <KeyboardTimePicker
                        id="dueTime"
                        name="dueTime"
                        label="Due Time"
                        inputVariant="outlined"
                        fullWidth
                        margin="normal"
                        value={formProps.values.dueTime ?? null}
                        onChange={(date: MaterialUiPickersDate) => {
                          formProps.setFieldValue(
                            'dueTime',
                            moment(date).toDate(),
                            true,
                          );
                        }}
                        keyboardIcon={<AccessTime />}
                        onBlur={formProps.handleBlur}
                        color="primary"
                      />
                    </MuiPickersUtilsProvider>
                    <PriorityField
                      value={formProps.values.priority}
                      onChange={function (value: TaskPriority): void {
                        formProps.setFieldValue('priority', value);
                      }}
                    />
                    <div className={styles.SubmitButton}>
                      <button type="submit">
                        {isNotVoid(taskId) ? 'UPDATE TO-DO' : 'ADD TO-DO'}
                      </button>
                    </div>
                    {isNotVoid(taskId) && (
                      <div className={styles.DeleteButton}>
                        <button onClick={() => removeTask()}>
                          DELETE TO DO
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </Formik>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { TaskForm } from 'components/task-form';
import styles from './index.module.scss';
import { Home } from 'components/home';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterBy, selectSearchText } from 'reducers/task/selectors';
import { selectUser } from 'reducers/identity/selectors';
import { selectTaskGroup } from 'reducers/task-group/selectors';
import { useEffect } from 'react';
import { loadUserTaskGroup, setIsLoading } from 'reducers/task-group/actions';
import { getLoggedUser } from 'reducers/identity/actions';
import { getDataList, loadTasks } from 'reducers/task/actions';

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearchText);
  const filter = useSelector(selectFilterBy);
  const userLogged = useSelector(selectUser);
  const taskGroup = useSelector(selectTaskGroup);

  useEffect(() => {
    (async function () {
      if (!userLogged) {
        dispatch(setIsLoading(true));
        dispatch(getLoggedUser());
      } else {
        dispatch(loadUserTaskGroup({ userId: userLogged.userId.toString() }));
      }
    })();
  }, [userLogged]);

  useEffect(() => {
    (async function () {
      if (taskGroup) {
        dispatch(getDataList({ taskGroupId: taskGroup.id }));
        dispatch(loadTasks({ taskGroupId: taskGroup.id, search, filter }));
      }
    })();
  }, [taskGroup]);

  return (
    <div className={styles.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/task" element={<TaskForm />} />
          <Route path="/task/:taskId" element={<TaskForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

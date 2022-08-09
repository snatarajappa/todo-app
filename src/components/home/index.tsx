import { CircularProgress } from '@material-ui/core';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { Search } from 'components/search';
import { TaskList } from 'components/task-list';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoading, selectShowSearchBar } from 'reducers/task/selectors';
import styles from './index.module.scss';

export const Home: FC = () => {
  const isLoading = useSelector(selectIsLoading);
  const isShowSearchBar = useSelector(selectShowSearchBar);
  return (
    <div className={styles.Home}>
      <Header />
      {isShowSearchBar ? <Search /> : null}
      {isLoading ? <CircularProgress /> : null}
      <TaskList />
      <Footer />
    </div>
  );
};

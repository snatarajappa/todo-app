import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

export const Footer: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.Footer}>
      <Fab className={styles.Button} onClick={() => navigate('/task')}>
        <Add style={{ fill: 'white' }} />
      </Fab>
    </div>
  );
};

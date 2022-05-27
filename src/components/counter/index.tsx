import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from 'reducers/counter/reducer';
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  incrementAsyncThunk,
} from 'reducers/counter/actions';
import styles from './index.module.scss';
import { RestQueryClient as Query } from '@appteam6/domoapps.js';
import domo from 'ryuu.js';

export const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const query = new Query();
  return (
    <div>
      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div> */}
      <div className={styles.row}>
        {/* <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        /> */}
        {/* <button
          className={styles.button}
          onClick={() =>
            dispatch(
              incrementByAmount(
                !Number.isNaN(Number(incrementAmount))
                  ? Number(incrementAmount)
                  : 0,
              ),
            )
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            dispatch(
              incrementAsync(
                !Number.isNaN(Number(incrementAmount))
                  ? Number(incrementAmount)
                  : 0,
              ),
            )
          }
        >
          Add Async
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            dispatch(
              incrementAsyncThunk(
                !Number.isNaN(Number(incrementAmount))
                  ? Number(incrementAmount)
                  : 0,
              ),
            )
          }
        >
          Add Async Thunk
        </button> */}
        <button
          className={styles.asyncButton}
          onClick={
            () =>
              domo
                .get(`/domo/datastores/v1/collections/tasks/documents/`)
                .then((data) => console.log(data))
            // query
            //   .select(['name', 'desc', 'dueDate'])
            //   .from('tasks')
            //   .get()
            //   .then((data) => {
            //     // Do something with the data
            //     // eslint-disable-next-line no-console
            //     console.table(data);
            //   })
          }
        >
          Get To-Dos
        </button>
        <button
          className={styles.asyncButton}
          onClick={
            () =>
              domo
                .post(`/domo/datastores/v1/collections/tasks/documents/`, {
                  content: {
                    name: 'Added one more note',
                    desc: 'New Description',
                    priority: 'High',
                    Note: 'Note added',
                    Status: 'Completed',
                    dueDate: '2022-05-18T19:51:21.639Z',
                  },
                })
                .then((data) => console.log(data))
            // query
            //   .select(['name', 'desc', 'dueDate'])
            //   .from('tasks')
            //   .get()
            //   .then((data) => {
            //     // Do something with the data
            //     // eslint-disable-next-line no-console
            //     console.table(data);
            //   })
          }
        >
          Add To-Dos
        </button>
        <button
          className={styles.asyncButton}
          onClick={
            () =>
              domo
                .put(
                  `/domo/datastores/v1/collections/tasks/documents/ca99a631-4b65-4773-bd34-7f7c3d86758f`,
                  {
                    content: {
                      name: 'Updated one more note',
                      desc: 'New Description',
                      priority: 'High',
                      Note: 'Note Updated',
                      Status: 'Completed',
                      dueDate: '2022-05-18T19:51:21.639Z',
                    },
                  },
                )
                .then((data) => console.log(data))
            // query
            //   .select(['name', 'desc', 'dueDate'])
            //   .from('tasks')
            //   .get()
            //   .then((data) => {
            //     // Do something with the data
            //     // eslint-disable-next-line no-console
            //     console.table(data);
            //   })
          }
        >
          Update To-Dos
        </button>
        <button
          className={styles.asyncButton}
          onClick={
            () =>
              domo
                .delete(
                  `/domo/datastores/v1/collections/tasks/documents/d2bf6b06-ddde-417c-888c-6c5b211eca10`,
                )
                .then((data) => console.log(data))
            // query
            //   .select(['name', 'desc', 'dueDate'])
            //   .from('tasks')
            //   .get()
            //   .then((data) => {
            //     // Do something with the data
            //     // eslint-disable-next-line no-console
            //     console.table(data);
            //   })
          }
        >
          Delete To-Dos
        </button>
      </div>
    </div>
  );
};

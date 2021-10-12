import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from '../action-types';
import {
  Action,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler';
import { RootState } from '../reducers';
import { CellState } from '../reducers/cellsReducer';

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get('/cells');

      dispatch({
        type: ActionTypes.FETCH_CELLS_COMPLEATE,
        payload: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log('hello');
        dispatch({
          type: ActionTypes.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const cellsProperty = getState().cells;
    const { data, order } = cellsProperty as CellState;

    const cells = order.map((id) => data[id]);
    try {
      await axios.post('/cells', { cells });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionTypes.SAVE_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

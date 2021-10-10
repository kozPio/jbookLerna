import { ActionTypes } from "../action-types";
import {Cell, CellTypes} from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  }
};

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: string;
};

export interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  }
};

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  }
};

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START,
  payload: {
    cellId: string;
  }
}


export interface BundleCompleateAction {
  type: ActionTypes.BUNDLE_COMPLETE,
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
};




interface FetchCellsAction {
  type: ActionTypes.FETCH_CELLS;
};

interface  FetchCellsCompleateAction {
  type: ActionTypes.FETCH_CELLS_COMPLEATE;
  payload: Cell[];
};

interface FetchCellsErrorAction {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action = 
  MoveCellAction |
  DeleteCellAction |
  InsertCellAfterAction |
  UpdateCellAction |
  BundleStartAction | 
  BundleCompleateAction |
  FetchCellsAction |
  FetchCellsCompleateAction |
  FetchCellsErrorAction |
  SaveCellsErrorAction;
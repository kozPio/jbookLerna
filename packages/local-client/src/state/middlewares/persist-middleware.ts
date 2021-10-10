import { Dispatch } from "redux";
import {Action} from '../actions';
import { ActionTypes } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware = ({dispatch, getState}: {dispatch: Dispatch<Action>, getState: ()=> RootState}) => {
  return (next: (action: Action)=> void) => {
    let timer: any;
    return (action: Action) => {
      next(action);


      if([ActionTypes.MOVE_CELL, ActionTypes.UPDATE_CELL, ActionTypes.INSERT_CELL_AFTER, ActionTypes.DELETE_CELL].includes(action.type)){
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          saveCells()(dispatch, getState)
        }, 250);
        
      }
    }
  }
}
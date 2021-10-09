import produce from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";


export interface BundleState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  };
}


const initialState: BundleState = {};

const reducer = produce((state: BundleState = initialState, action: Action): BundleState => {
  switch (action.type){
    case ActionTypes.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: ''
      }
      return state;
    case ActionTypes.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err
      }
      return state;
    default:
      return state;
  }
})


export default reducer;
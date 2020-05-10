import { combineReducers } from 'redux';
import data, { DataState } from './data.reducer';

export interface IRootState {
    readonly data: DataState;
  }

const rootReducer = combineReducers<IRootState>({
    data
});
  
export default rootReducer;
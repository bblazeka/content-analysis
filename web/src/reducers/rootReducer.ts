import { combineReducers } from 'redux';
import data, { DataState } from './data.reducer';
import map, { MapState } from './map.reducer';

export interface IRootState {
    readonly data: DataState;
    readonly map: MapState;
  }

const rootReducer = combineReducers<IRootState>({
    data,
    map
});
  
export default rootReducer;
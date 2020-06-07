import { getLocalTweets, getTopicNews } from "./data.reducer";
import { apiUrl } from "../constants/util";

const initialState = {
  place: {},
};

export type MapState = Readonly<typeof initialState>;

export default (state: MapState = initialState, action: any): MapState => {
  switch (action.type) {
    case ACTION_TYPES.GEOCODE_SUCCESS:
      return {
        ...state,
        place: action.payload,
      }
    default:
      return state;
  }
};

export const ACTION_TYPES = {
  GEOCODE_SUCCESS: 'GEOCODE_SUCCESS',
  GEOCODE_FAILURE: 'GEOCODE_FAILURE',
};

export const geolocate = (term: string) => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/map/geocode/${term}`);
  const data = await response.json();
  if (response.status === 200) {
    dispatch(getLocalTweets(term, data.lat, data.lng));
    dispatch(getTopicNews(term));
    dispatch({
      type: ACTION_TYPES.GEOCODE_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.GEOCODE_FAILURE,
    });
  }
}
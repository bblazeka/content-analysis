const apiUrl = 'http://127.0.0.1:5000';

const initialState = {
  loading: false,
  news: {} as News,
  tweets: {} as Twitter,
  wiki: {},
};

export type DataState = Readonly<typeof initialState>;

export type News = {
  "articles": any[],
  "entities": any[]
}

export type Twitter = {
  "tweets": any[],
  "entities": any[]
}

export type Tweets = {}

export default (state: DataState = initialState, action: any): DataState => {
  switch (action.type) {
    case ACTION_TYPES.NEWS_FETCH_SUCCESS:
      return {
        ...state,
        news: action.payload
      }
    case ACTION_TYPES.NEWS_FETCH_FAILURE:
      return {
        ...state,
      }
    case ACTION_TYPES.WIKI_FETCH_SUCCESS:
      return {
        ...state,
        wiki: action.payload,
      }
    case ACTION_TYPES.WIKI_FETCH_FAILURE:
      return {
        ...state,
      }
    case ACTION_TYPES.ENTITY_NEWS_FETCH_SUCCESS:
      return {
        ...state,
        news: action.payload
      }
    case ACTION_TYPES.ENTITY_NEWS_FETCH_FAILURE:
      return {
        ...state,
      }
    case ACTION_TYPES.LOCAL_TWEETS_FETCH_SUCCESS:
      return {
        ...state,
        tweets: action.payload,
      }
    case ACTION_TYPES.TWEETS_FETCH_SUCCESS:
      return {
        ...state,
        tweets: action.payload,
      }
    default:
      return state;
  }
};

export const ACTION_TYPES = {
  LOCAL_TWEETS_FETCH_SUCCESS: 'LOCAL_TWEETS_FETCH_SUCCESS',
  LOCAL_TWEETS_FETCH_FAILURE: 'LOCAL_TWEETS_FETCH_FAILURE',
  TWEETS_FETCH_SUCCESS: 'TWEETS_FETCH_SUCCESS',
  TWEETS_FETCH_FAILURE: 'TWEETS_FETCH_FAILURE',
  NEWS_FETCH_SUCCESS: 'NEWS_FETCH_SUCCESS',
  NEWS_FETCH_FAILURE: 'NEWS_FETCH_FAILURE',
  ENTITY_NEWS_FETCH_SUCCESS: 'ENTITY_NEWS_FETCH_SUCCESS',
  ENTITY_NEWS_FETCH_FAILURE: 'ENTITY_NEWS_FETCH_FAILURE',
  WIKI_FETCH_SUCCESS: 'WIKI_FETCH_SUCCESS',
  WIKI_FETCH_FAILURE: 'WIKI_FETCH_FAILURE'
};

export const getNews = () => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/`);
  const data = await response.json();
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPES.NEWS_FETCH_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.NEWS_FETCH_FAILURE,
    });
  }
}

export const getEntityNews = (name: string) => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/news/${name}`);
  const data = await response.json();
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPES.ENTITY_NEWS_FETCH_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.ENTITY_NEWS_FETCH_FAILURE,
    });
  }
}

export const getWiki = (term: string) => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/wiki/${term}`);
  const data = await response.json();
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPES.WIKI_FETCH_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.WIKI_FETCH_FAILURE,
    });
  }
}

export const getTweets = (term: string) => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/tweets/${term}`);
  const data = await response.json();
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPES.TWEETS_FETCH_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.TWEETS_FETCH_FAILURE,
    });
  }
}

export const getLocalTweets = (lat: number, lng: number) => async (dispatch: any, getState: any) => {
  const response = await fetch(`${apiUrl}/tweets/local/Graz?lat=${lat}&lng=${lng}`);
  const data = await response.json();
  console.log(data)
  if (response.status === 200) {
    dispatch({
      type: ACTION_TYPES.LOCAL_TWEETS_FETCH_SUCCESS,
      payload: data
    })
  } else if (response.status === 401) {
    dispatch({
      type: ACTION_TYPES.LOCAL_TWEETS_FETCH_FAILURE,
    });
  }
}

/*const options = (token: string) => {
  return {
    method: 'GET',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
    }
  }
};*/
export type Entity = {
  "text": string,
  "type": string
}

export type News = {
  "articles": Article[],
  "entities": Entity[]
}

export type Article = {
  "title": string,
  "url": string,
  "author": string,
  "description": string,
  "entities": Entity[]
}

export type Tweets = {
  "tweets": Tweet[],
  "entities": Entity[]
}

export type Tweet = {
  "title": string,
  "url": string,
  "description": string,
  "text": string,
  "entities": Entity[]
}
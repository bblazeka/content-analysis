import * as React from 'react';

import { Feed } from 'semantic-ui-react';

import { EntityList } from '../EntityList/EntityList';

interface INewsFeedProps {
  news: any;
  onEntityClick: any;
}

export const NewsFeed: React.FC<INewsFeedProps> = ({ news, onEntityClick }) => {
  return (
     <Feed>
      {news.map((element: any) => {
        return (<Feed.Event key={element.title}>
          <Feed.Label icon='newspaper' />
          <Feed.Content>
            <Feed.Summary><a href={element.url}>{element.title}</a></Feed.Summary>
            <Feed.Date>{element.author}</Feed.Date>
            <Feed.Extra>
              {element.description}
            </Feed.Extra>
            <Feed.Meta>
              <EntityList entities={element.entities} onEntityClick={(entity) => onEntityClick(entity)} />
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>)
      })}
    </Feed>
  );
}
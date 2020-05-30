import * as React from 'react';

import { Feed, List, Label } from 'semantic-ui-react';

interface ITwitterFeedProps {
  tweets: any;
}

export const TwitterFeed: React.FC<ITwitterFeedProps> = ({ tweets }) => {
  if (!tweets.tweets) {
    return (<div>Loading...</div>);
  }
  return (
     <Feed>
      {tweets.tweets.map((element: any, index: number) => {
        return (<Feed.Event key={` ${element.title} ${index}`}>
          <Feed.Label icon='twitter' />
          <Feed.Content>
            <Feed.Summary><a href={element.url}>{element.title}</a></Feed.Summary>
            <Feed.Date>{element.description}</Feed.Date>
            <Feed.Extra>
              {element.text}
            </Feed.Extra>
            <Feed.Meta>
              <List horizontal>
                {element.entities.map((entity: any, index: number) => {
                  return (<List.Item key={` ${entity.text} ${index}`}>
                    <Label content={` ${entity.text}`} icon={entity.type} />
                  </List.Item>)
                })}
              </List>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>)
      })}
    </Feed>
  );
}
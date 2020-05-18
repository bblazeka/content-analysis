import * as React from 'react';

import { Feed, Grid, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

interface ITwitterFeedProps {
  tweets: any[];
}

export const TwitterFeed: React.FC<ITwitterFeedProps> = ({ tweets }) => {
  return (
     <Feed>
      {tweets.map((element: any) => {
        return (<Feed.Event key={element.title}>
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
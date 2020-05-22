import * as React from 'react';
import { Link } from 'react-router-dom';

import { List, Label } from 'semantic-ui-react';

interface IEntityListProps {
  entities: any[];
  onEntityClick: (name: string) => void;
}

export const EntityList: React.FC<IEntityListProps> = ({ entities, onEntityClick }) => {
  return (
    <List horizontal>
    {entities.map((entity: any, index: number) => {
      return (<List.Item key={` ${entity.text} ${index}`}>
        <Link to={`/${entity.viewType}/${entity.text}`} onClick={() => onEntityClick(entity.text)}>
          <Label content={` ${entity.text}`} icon={entity.type} />
        </Link>
      </List.Item>)
    })}
    </List>
  );
}
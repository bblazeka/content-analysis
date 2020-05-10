import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Feed, Header, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews } from '../../reducers/data.reducer';

interface IProps {
  loading: boolean;
  news: any;
  getNews: () => Promise<boolean>;
}

interface IState {
  loading: boolean;
  activeAccordion: number;
}

export class Dashboard extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      activeAccordion: -1
    }
  }

  componentDidMount() {
    this.props.getNews();
  }

  render() {
    return (
      <div>
        <Search />
        <Segment loading={this.props.news.length === 0}>
          <Feed>
            {this.props.news.map((element: any) => {
              return (<Feed.Event key={element.title}>
                <Feed.Label icon='newspaper' />
                <Feed.Content>
                  <Feed.Summary><a href={element.url}>{element.title}</a></Feed.Summary>
                  <Feed.Date>{element.author}</Feed.Date>
                  <Feed.Extra>
                    {element.description}
                  </Feed.Extra>
                  <Feed.Meta>
                    <List horizontal>
                      {element.entities.map((entity: any) => {
                        return(<List.Item key={entity.type+entity.text}>
                          <Label content={` ${entity.text}`} icon={entity.type} />
                        </List.Item>)
                      })}
                    </List>                    
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>)
            })}
          </Feed>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ data }: IRootState) => ({
  loading: data.loading,
  news: data.news,
});
const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(getNews()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);


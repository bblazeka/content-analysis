import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Feed, Grid, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews, getEntityNews } from '../../reducers/data.reducer';
import { NewsFeed } from '../NewsFeed/NewsFeed';

interface IProps {
  loading: boolean;
  news: any;
  getNews: () => Promise<boolean>;
  getEntityNews: (name: string) => Promise<boolean>;
}

interface IState {
  loading: boolean;
  name: string;
  activeAccordion: number;
}

export class Entity extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      loading: false,
      activeAccordion: -1
    }
  }

  componentDidMount() {
    const { name } = this.state;
    this.props.getEntityNews(name);
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const { name } = props.match.params;
    if (state.name !== name) {
      return {
        name,
      }
    }
    return null
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeAccordion } = this.state
    const newIndex = activeAccordion === index ? -1 : index

    this.setState({ activeAccordion: newIndex })
  }

  render() {
    const { activeAccordion } = this.state;
    const { news } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            wiki
          </Grid.Column>
          <Grid.Column>
            <Accordion fluid styled>
              <Accordion.Title
                active={activeAccordion === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                Related News
              </Accordion.Title>
              <Accordion.Content active={activeAccordion === 0}>
                <NewsFeed news={news} />
              </Accordion.Content>

              <Accordion.Title
                active={activeAccordion === 1}
                index={1}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                Tweets
              </Accordion.Title>
              <Accordion.Content active={activeAccordion === 1}>
                <p>Local tweets here.</p>
              </Accordion.Content>
            </Accordion>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({ data }: IRootState) => ({
  loading: data.loading,
  news: data.news,
});
const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(getNews()),
  getEntityNews: (name: string) => dispatch(getEntityNews(name)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entity);
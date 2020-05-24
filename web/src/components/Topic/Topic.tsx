import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Grid, Icon, Segment } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews, getTopicNews, getWiki, getTweets } from '../../reducers/data.reducer';
import { NewsFeed } from '../NewsFeed/NewsFeed';
import { Keywords } from '../Keywords/Keywords';
import { TwitterFeed } from '../TwitterFeed/TwitterFeed';

interface IProps {
  loading: boolean;
  news: any;
  tweets: any;
  wiki: any;
  getNews: () => Promise<boolean>;
  getTweets: (name: string) => Promise<boolean>;
  getTopicNews: (name: string) => Promise<boolean>;
  getWiki: (term: string) => Promise<boolean>;
}

interface IState {
  loading: boolean;
  name: string;
  activeAccordion: number;
}

export class Topic extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      loading: false,
      activeAccordion: -1
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { name } = this.state;
    this.fetchData(name);
  }

  fetchData(name: any) {
    this.props.getTopicNews(name);
    this.props.getTweets(name);
    this.props.getWiki(name);
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
    const { news, wiki, tweets } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            {wiki && <Segment loading={!wiki}>
              <h3>{wiki.title}</h3>
              {wiki.summary}
              <Keywords entities={ wiki.entities } onEntityClick={this.fetchData} />
            </Segment>}
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
                {news && <NewsFeed news={news} onEntityClick={this.fetchData} />}
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
                {tweets && <TwitterFeed tweets={tweets} />}
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
  wiki: data.wiki,
  tweets: data.tweets,
});
const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(getNews()),
  getTopicNews: (name: string) => dispatch(getTopicNews(name)),
  getTweets: (term: string) => dispatch(getTweets(term)),
  getWiki: (term: string) => dispatch(getWiki(term))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic);
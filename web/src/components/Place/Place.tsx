import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Grid, Icon } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews, getTopicNews, geolocate } from '../../reducers/data.reducer';
import { Map } from '../Map/Map';
import { TwitterFeed } from '../TwitterFeed/TwitterFeed';
import { NewsFeed } from '../NewsFeed/NewsFeed';

interface IProps {
  loading: boolean;
  news: any;
  place: any;
  tweets: any;
  getNews: () => Promise<boolean>;
  getLocalTweets: (lat: number, lng: number) => Promise<boolean>;
  getTopicNews: (term: string) => Promise<boolean>;
  geolocate: (term: string) => Promise<boolean>;
}

interface IState {
  term: string;
  loading: boolean;
  activeAccordion: number;
  lat: number;
  lng: number;
}

export class Place extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      term: "",
      loading: false,
      lat: 47.07103,
      lng: 15.43811,
      activeAccordion: -1
    }

    this.fetchData = this.fetchData.bind(this);
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const { term } = props.match.params;
    if (state.term !== term) {
      return {
        term,
        activeAccordion: -1
      }
    }
    return null
  }

  componentDidMount() {
    this.props.geolocate(this.state.term);
  }

  fetchData(name: any) {
    this.props.getTopicNews(name);
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeAccordion } = this.state
    const newIndex = activeAccordion === index ? -1 : index

    this.setState({ activeAccordion: newIndex })
  }

  render() {
    const { activeAccordion, lat, lng } = this.state;
    const { tweets, news, place } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Map 
              lat={(place.lat ? place.lat : lat)} 
              lng={(place.lng ? place.lng : lng)} 
              bbox={place.bbox}
            />
          </Grid.Column>
          <Grid.Column>
            <Accordion fluid styled>
              <Accordion.Title
                active={activeAccordion === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                News
              </Accordion.Title>
              <Accordion.Content active={activeAccordion === 0}>
                <NewsFeed news={news} onEntityClick={this.fetchData} />
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
                <TwitterFeed tweets={tweets} />
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
  tweets: data.tweets,
  place: data.place,
});
const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(getNews()),
  getTopicNews: (term: string) => dispatch(getTopicNews(term)),
  geolocate: (term: string) => dispatch(geolocate(term))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);


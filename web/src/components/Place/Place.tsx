import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Grid, Icon } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews, getLocalTweets } from '../../reducers/data.reducer';
import { Map } from '../Map/Map';
import { TwitterFeed } from '../TwitterFeed/TwitterFeed';

interface IProps {
  loading: boolean;
  news: any;
  tweets: any;
  getNews: () => Promise<boolean>;
  getLocalTweets: (lat: number, lng: number) => Promise<boolean>;
}

interface IState {
  loading: boolean;
  activeAccordion: number;
  lat: number;
  lng: number;
}

export class Place extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      lat: 47.07103,
      lng: 15.43811,
      activeAccordion: -1
    }
  }

  componentDidMount() {
    this.props.getNews();
    this.props.getLocalTweets(this.state.lat, this.state.lng);
  }

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeAccordion } = this.state
    const newIndex = activeAccordion === index ? -1 : index

    this.setState({ activeAccordion: newIndex })
  }

  render() {
    const { activeAccordion, lat, lng } = this.state;
    const { tweets } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Map lat={lat} lng={lng}/>
          </Grid.Column>
          <Grid.Column>
            <Accordion fluid styled>
              <Accordion.Title
                active={activeAccordion === 0}
                index={0}
                onClick={this.handleClick}
              >
                <Icon name='dropdown' />
                Local News
              </Accordion.Title>
              <Accordion.Content active={activeAccordion === 0}>
                <p>Here come news</p>
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
});
const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(getNews()),
  getLocalTweets: (lat: number, lng: number) => dispatch(getLocalTweets(lat, lng))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);


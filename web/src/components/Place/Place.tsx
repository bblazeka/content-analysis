import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Feed, Grid, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews } from '../../reducers/data.reducer';
import { Map } from '../Map/Map';

interface IProps {
  loading: boolean;
  news: any;
  getNews: () => Promise<boolean>;
}

interface IState {
  loading: boolean;
  activeAccordion: number;
}

export class Place extends React.Component<IProps, IState> {

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

  handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps
    const { activeAccordion } = this.state
    const newIndex = activeAccordion === index ? -1 : index

    this.setState({ activeAccordion: newIndex })
  }

  render() {
    const { activeAccordion } = this.state;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Map />
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
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place);


import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Feed, Grid, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

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

export class Entity extends React.Component<IProps, IState> {

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
      <Grid>
          <Grid.Row columns={2}>
              <Grid.Column>
                wiki
              </Grid.Column>
              <Grid.Column>
                news
                tweets
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
)(Entity);
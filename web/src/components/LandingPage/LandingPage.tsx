import * as React from 'react';
import { connect } from 'react-redux';

import { Segment } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';
import { getNews } from '../../reducers/data.reducer';
import { NewsFeed } from '../NewsFeed/NewsFeed';

interface IProps {
  loading: boolean;
  news: any;
  getNews: () => Promise<boolean>;
}

interface IState {
  loading: boolean;
  activeAccordion: number;
}

export class LandingPage extends React.Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false,
      activeAccordion: -1
    }

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.props.getNews();
  }

  fetchData(name: string) {
    console.log(name)
  }

  render() {
    const { news } = this.props;
    return (
      <div>
        <Segment loading={news.length === 0}>
          <NewsFeed news={news} onEntityClick={this.fetchData}/>
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
)(LandingPage);


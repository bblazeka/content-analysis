import * as React from 'react';
import { connect } from 'react-redux';

import { Accordion, Feed, Header, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

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
    const { news } = this.props;
    return (
      <div>
        <Search />
        <Segment loading={news.length === 0}>
          <NewsFeed news={news}/>
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


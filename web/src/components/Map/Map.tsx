import * as React from 'react';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { Accordion, Feed, Grid, Icon, List, Label, Segment, Search } from 'semantic-ui-react';

import { IRootState } from '../../reducers/rootReducer';

import keys from '../../keys.json';

interface IProps {
}

interface IState {
  loading: boolean;
}

mapboxgl.accessToken = keys["mapbox-API"];

export class Map extends React.Component<IProps, IState> {

  mapContainer: any = document.createElement('div');
  map : any;

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  private loadMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [15.43811, 47.07103],
      zoom: 9
    });

    map.addControl(new mapboxgl.NavigationControl());
    this.map = map;
  }

  render() {
    const { loading } = this.state;
    return (
      <Segment loading={loading}>
        <div ref={el => (this.mapContainer = el)} className="map">
        </div>
      </Segment>
    );
  }
}

const mapStateToProps = ({ data }: IRootState) => ({

});
const mapDispatchToProps = (dispatch: any) => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
import * as React from 'react';
import mapboxgl from 'mapbox-gl';

import { Segment } from 'semantic-ui-react';

import keys from '../../keys.json';
import './Map.scss';

interface IProps {
  lat: number;
  lng: number;
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

  componentDidUpdate() {
    const { lat, lng } = this.props;
    this.map.setCenter([lng, lat]);
  }

  private loadMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.props.lng, this.props.lat],
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


export default Map;
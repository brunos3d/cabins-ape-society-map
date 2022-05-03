import { useRef, HTMLAttributes, useEffect, useContext } from 'react';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Rectangle,
} from 'react-leaflet';
import cn from 'classnames';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import styles from './styles.module.css';
import MapContext from '@/contexts/MapContext';

export type MapProps = HTMLAttributes<HTMLElement>;

function MyComponent() {
  const map = useMapEvents({
    zoomlevelschange: (event) => {
      console.log(event);
    },
    click: (event) => {
      // logs tile number
      console.log(L.latLng);

      console.log(map.getCenter());

      // console.log(event.);
    },
  });

  return null;
}

export default function Map({ className, ...rest }: MapProps) {
  const mapRef = useRef<L.Map>();
  const { config, setConfig } = useContext(MapContext);

  useEffect(() => {
    if (!mapRef?.current) return;
    const map = mapRef.current;
    const bounds = map.getBounds();

    const top = bounds.getNorth();
    const bottom = bounds.getSouth();

    const left = bounds.getWest();
    const right = bounds.getEast();

    console.log(top, bottom, right, left);

    const tileSizeY = (top - bottom) / 100;
    const tileSizeX = (left - right) / 100;

    setConfig({ top, bottom, left, right, tileSizeY, tileSizeX });

    // console.log(tileSizeY, tileSizeX);
  }, [mapRef, setConfig]);

  return (
    <div className={cn(styles.component, className)} {...rest}>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={7}
        scrollWheelZoom
        style={{ height: `100%`, width: `100%` }}
        ref={mapRef as any}
      >
        {/* <TileLayer noWrap tms url="/tileset/{z}/{x}/{y}.png" /> */}
        <TileLayer noWrap tms url="http://localhost:8080/{z}/{x}/{y}.png" />

        <MyComponent />
      </MapContainer>
    </div>
  );
}

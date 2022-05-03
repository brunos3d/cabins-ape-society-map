import { createContext, ReactNode, useState } from 'react';
import L from 'leaflet';

export type MapContextType = {
  map: L.Map;
  setMap: (map: L.Map) => void;
  config: any;
  setConfig: (config: any) => void;
};

const MapContext = createContext<MapContextType>({} as MapContextType);

export default MapContext;

export function MapContextProvider({
  map: initialMap,
  config: initialConfig,
  children,
}: {
  map?: L.Map;
  config?: any;
  children?: ReactNode;
}) {
  const [map, setMap] = useState<L.Map>(initialMap as L.Map);
  const [config, setConfig] = useState(initialConfig);

  return (
    <MapContext.Provider value={{ map, setMap, config, setConfig }}>
      {children}
    </MapContext.Provider>
  );
}

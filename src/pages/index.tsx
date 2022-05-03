import dynamic from 'next/dynamic';

import Toolbox from '@/components/Toolbox';
import Inspector from '@/components/Inspector';

import { MapContextProvider } from '@/contexts/MapContext';

import styles from '@/styles/Home.module.css';

const MapWithNoSSR = dynamic(() => import(`../components/Map`), {
  ssr: false,
});

export default function Home() {
  return (
    <MapContextProvider>
      <div className={styles.container}>
        <Toolbox />

        <MapWithNoSSR />

        <Inspector />
      </div>
    </MapContextProvider>
  );
}

import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

export type InspectorProps = HTMLAttributes<HTMLElement>;

export default function Inspector({ className, ...rest }: InspectorProps) {
  return <div className={cn(styles.inspector, className)} {...rest}></div>;
}

import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

export type ToolboxProps = HTMLAttributes<HTMLElement>;

export default function Toolbox({ className, ...rest }: ToolboxProps) {
  return <div className={cn(styles.toolbox, className)} {...rest}></div>;
}

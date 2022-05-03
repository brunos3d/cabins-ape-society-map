import { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

export type TEMPLATEProps = HTMLAttributes<HTMLElement> & {
  foo: string;
};

export default function TEMPLATE({
  foo,
  className,
  children,
  ...rest
}: TEMPLATEProps) {
  return (
    <div className={cn(styles.component, className)} {...rest}>
      <span>{foo}</span>
      {children}
    </div>
  );
}

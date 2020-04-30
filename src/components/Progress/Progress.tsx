import React, { FC } from 'react';
import { ThemeProps } from '../Icon/Icon';

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = ({
  percent,
  strokeHeight,
  showText,
  styles,
  theme,
}) => {
  return (
    <div className="antd-progress-bar" style={styles}>
      <div
        className="antd-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`antd-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;

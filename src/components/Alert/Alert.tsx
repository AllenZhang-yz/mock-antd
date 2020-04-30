import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
export type AlertType = 'success' | 'default' | 'danger' | 'warning';

export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  closable?: boolean;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { title, description, type, closable, onClose } = props;
  const classes = classNames('antd-alert', { [`antd-alert-${type}`]: type });
  const titleClass = classNames('antd-alert-title', {
    'bold-title': description,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  };
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-right">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="antd-alert-desc">{description}</p>}
        {closable && (
          <span
            className="antd-alert-close"
            onClick={handleClose}
            data-testid="icon"
          >
            <Icon icon="times-circle" />
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: 'default',
  closable: true,
};

export default Alert;

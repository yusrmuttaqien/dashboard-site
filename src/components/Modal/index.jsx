import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { useHookstate, none } from '@hookstate/core';
import { MDOAL_STACK_STATE_PROVIDER } from '@/utils/states';
import { Overlay, Content } from './styles';

export default function Modal(props) {
  const { children, isOpen, className, id, onClose } = props;
  const [earlyRemoval, setEarlyRemoval] = useState(0);
  const stackState = useHookstate(MDOAL_STACK_STATE_PROVIDER);
  const idx = stackState.findIndex((register) => register.get() === id);
  const stackInfo = idx >= 0 ? idx + 1 : false;
  const uniqueID = `modal-overlay-${id}`;

  const _handleClose = (e) => {
    if (e.target.dataset.id === uniqueID) {
      onClose?.();
    }
  };

  useEffect(() => {
    const isRegistered = stackState.find((register) => register.get() === id);
    let timeout;

    if (isOpen && !isRegistered) {
      stackState.merge([id]);
    } else {
      idx >= 0 && stackState[idx].set(null);
      timeout = setTimeout(() => setEarlyRemoval(0), 200);
    }

    return () => clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!earlyRemoval) {
      setEarlyRemoval(stackInfo);
    }
  }, [stackInfo]);

  return createPortal(
    <Overlay
      data-id={uniqueID}
      key={uniqueID}
      $stack={stackInfo}
      $index={earlyRemoval}
      onClick={_handleClose}
    >
      <Content $stack={stackInfo} className={className}>
        {children}
      </Content>
    </Overlay>,
    document.getElementById('portal-root')
  );
}

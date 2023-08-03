import React, { useEffect, useRef, useState } from 'react';
import { SvgDotVertical } from '../../assets';
import { useEvent } from '../../hooks/useEvent';
import './ContextMenu.scss';

// ----------------------------------------------------------------------

interface UseOutsideClickOptions {
  elementRef: React.RefObject<HTMLElement>;
  triggerRef?: React.RefObject<HTMLElement>;
  enabled?: boolean;
  onOutsideClick(e: MouseEvent | TouchEvent): void;
}

type positionType = 'top' | 'left';
interface IContextMenuProps {
  opened: boolean;
  triggerRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
  buttonsInMenu: IContextMenuButtonsProps[];
  position?: positionType;
}

type buttonsColorType = 'red' | 'white';
interface IContextMenuButtonsProps {
  svg?: React.ReactNode;
  title: string;
  color?: buttonsColorType;
  cb: () => void;
}

interface IProps {
  buttons: IContextMenuButtonsProps[];
  position?: positionType;
}

// ----------------------------------------------------------------------

function useOutsideClick({ elementRef, triggerRef, enabled = true, onOutsideClick }: UseOutsideClickOptions) {
  const handleOutsideClick = useEvent(onOutsideClick);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!elementRef.current) {
        return;
      }

      const ignoreElements = [elementRef.current];

      if (triggerRef?.current) {
        ignoreElements.push(triggerRef.current);
      }

      if (!ignoreElements.some((element) => element.contains(target))) {
        handleOutsideClick(e);
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [enabled, elementRef, triggerRef, handleOutsideClick]);
}

// ----------------------------------------------------------------------

const ContextMenu: React.FC<IProps> = ({ buttons, position = 'left' }) => {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };

  const contextMenuContent = ({ opened, triggerRef, onClose, buttonsInMenu, position }: IContextMenuProps) => {
    const tooltipRef = useRef<HTMLDivElement>(null);

    const clickOnButton = (cb: () => void) => {
      cb();
      onClose();
    };

    useOutsideClick({
      elementRef: tooltipRef,
      triggerRef,
      onOutsideClick: onClose,
      enabled: opened,
    });

    if (!opened) return null;

    return (
      <div
        ref={tooltipRef}
        className={`ContextMenu-Container
      ${position === 'top' ? 'ContextMenu-Container-TopPosition' : ''}
      ${position === 'left' ? 'ContextMenu-Container-LeftPosition' : ''}
      `}
      >
        <span className="pointer" />
        <ul>
          {buttonsInMenu.map((item, i) => (
            <li
              key={i}
              onClick={() => clickOnButton(item.cb)}
              style={{ color: item.color === 'red' ? 'rgb(255, 86, 48)' : '' }}
            >
              <div className="svgContainer">
                <span className="svg">{item.svg}</span>
              </div>
              <span className="title">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="ContextMenu-MainContainer">
      {contextMenuContent({ opened, triggerRef: buttonRef, onClose, buttonsInMenu: buttons, position })}

      <button
        ref={buttonRef}
        className={`ContextMenuButton ${opened ? 'ContextMenuButton-Active' : ''}`}
        onClick={() => setOpened((v) => !v)}
      >
        <span>
          <SvgDotVertical />
        </span>
      </button>
    </div>
  );
};

// ----------------------------------------------------------------------

export default ContextMenu;

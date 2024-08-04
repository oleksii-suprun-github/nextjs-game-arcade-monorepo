'use client';

import { createContext, Dispatch, ReactElement, ReactNode, RefObject, SetStateAction } from 'react';

interface DrawerContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

function Drawer({
  icon,
  toggleRef,
  children,
}: {
  icon: ReactElement;
  toggleRef: RefObject<HTMLInputElement>;
  children: ReactNode;
}) {
  return (
    <div className="drawer">
      <input className="drawer-toggle" id="drawer-mobile" ref={toggleRef} type="checkbox" />
      <div className="drawer-content">
        <label className="drawer-button text-stone-300" htmlFor="drawer-mobile">
          {icon}
        </label>
      </div>
      <div className="drawer-side z-20">
        <label aria-label="close sidebar" className="drawer-overlay" htmlFor="drawer-mobile" />
        <div className="menu min-h-full w-80 bg-slate-800 p-4 text-stone-300">{children}</div>
      </div>
    </div>
  );
}

export default Drawer;

'use client';

import { useRef } from 'react';
import { UserButton } from '@clerk/nextjs';
import { FiMenu } from 'react-icons/fi';
import { Drawer, Header, PromptCounter } from '@global-ui-lib';
import LanguageSwitcher from '../LanguageSwitcher';
import Navigation from '../Navigation';

function Navbar() {
  const drawerToggleRef = useRef<HTMLInputElement>(null);

  const drawerToggleHandler = () => {
    if (drawerToggleRef.current) {
      drawerToggleRef.current.checked = false;
    }
  };

  return (
    <Header>
      <div className="navbar-start">
        <div className="hidden lg:flex">
          <Navigation />
        </div>
        <div className="lg:hidden">
          <Drawer icon={<FiMenu size={38} />} toggleRef={drawerToggleRef}>
            <Navigation onClick={drawerToggleHandler} />
            <PromptCounter />
          </Drawer>
        </div>
      </div>
      <div className="navbar-center">
        <div className="hidden lg:block">
          <PromptCounter />
        </div>
      </div>
      <div className="navbar-end">
        <div className="mr-8 md:mr-10">
          <LanguageSwitcher />
        </div>
        <div className="pt-2 text-center">
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </Header>
  );
}

export default Navbar;

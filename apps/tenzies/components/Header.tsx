import { PropsWithChildren } from 'react';

function Header({ children }: PropsWithChildren) {
  return (
    <header className="text-center" id="header">
      {children}
    </header>
  );
}
export default Header;

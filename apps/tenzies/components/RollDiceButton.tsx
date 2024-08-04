import { MouseEventHandler, PropsWithChildren } from 'react';

function RollDiceButton({
  onClick,
  children,
  disabled,
}: PropsWithChildren<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}>) {
  return (
    <button
      className={`btn border-none bg-yellow-500 text-black hover:bg-yellow-400 ${disabled ? 'tooltip tooltip-open' : ''} tooltip-top mx-auto my-[25px] mt-[50px] w-fit min-w-32 text-2xl`}
      data-testid="roll-dice-button"
      data-tip="Please select all equal dice before rolling."
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RollDiceButton;

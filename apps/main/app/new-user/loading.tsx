import { Loading as Spinner } from '@ui-lib';

function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;

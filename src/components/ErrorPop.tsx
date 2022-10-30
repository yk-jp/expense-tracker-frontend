import React from 'react';

type Props = {
  message: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const ErrorPop = ({ message, setError }: Props) => (
  <div
    className="bg-rose-400 text-center p-5 rounded-md absolute w-2/5 min-w-mobile errorMessage"
    onAnimationEnd={() => setError(null)}
  >
    <p className="text-white">{message}</p>
  </div>
);

export default ErrorPop;

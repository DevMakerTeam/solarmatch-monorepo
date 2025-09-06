import { ButtonHTMLAttributes } from 'react';

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='px-4 py-2 rounded-md border hover:opacity-90 transition'
      {...props}
    />
  );
}

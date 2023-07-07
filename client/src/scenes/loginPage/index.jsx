 import React from 'react';
 import Form from './Form';

const LoginPage = () => {
  return (
    <div className='bg-[#f9f6f6] dark:bg-stone-950 min-h-screen'>
      <div className='flex justify-center items-center bg-white min-h-[10vh]'>
      <h1 className='text-3xl font-bold select-none text-cyan-500'>Sociopedia</h1>
      </div>
      <Form />
    </div>
  )
}

export default LoginPage;
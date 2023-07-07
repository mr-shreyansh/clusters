import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout, setMode } from '../../state';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const [hidden, setHidden] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.token);
  const user = useSelector((state) => state.user);
  const mode = useSelector((state) => state.mode);
  const fullname = `${user ? user.firstname : "first"} ${user ? user.lastname : "last"}`
  const toggleMode = () => {

    // localStorage.setItem("mode", "dark");
    dispatch(setMode(mode));
  };
  const togglebtn = () => {
    setHidden(!hidden)
  }

  return (
    <div className=' relative flex items-center min-h-[10vh] justify-between w-full px-8 bg-white dark:bg-stone-900'>
      {/* left side */}
      <div className='flex items-center gap-4'>
        <h1 className='text-3xl font-bold select-none text-cyan-500'>Sociopedia</h1>
        <div className='relative justify-around hidden rounded-lg md:flex bg-stone-200 dark:bg-stone-700'>
          <input type='text' className='px-2 py-1 bg-transparent rounded-lg' placeholder='Search' />
          <span>
            <svg className='absolute w-4 h-4 dark:text-white top-2 right-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>      
          </span>
        </div>
          
      </div>
      {/* right side */}
      <div className='flex justify-end'>
      <svg onClick={()=>{setSidebar(true)}} className={`md:hidden`} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="40" zoomAndPan="magnify" viewBox="0 0 30 30.000001" height="40" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="id1"><path d="M 3.386719 7.164062 L 26.613281 7.164062 L 26.613281 22.40625 L 3.386719 22.40625 Z M 3.386719 7.164062 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#id1)"><path fill="rgb(0%, 0%, 0%)" d="M 3.398438 22.40625 L 26.601562 22.40625 L 26.601562 19.867188 L 3.398438 19.867188 Z M 3.398438 16.054688 L 26.601562 16.054688 L 26.601562 13.515625 L 3.398438 13.515625 Z M 3.398438 7.164062 L 3.398438 9.703125 L 26.601562 9.703125 L 26.601562 7.164062 Z M 3.398438 7.164062 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
        <div className={`absolute md:relative top-0 md:justify-end bottom-0 w-[50vw]  right-0 bg-white dark:bg-stone-900 md:bg-inherit pt-[5vh] md:p-0  h-[100vh] md:h-auto ${sidebar ? 'flex' : 'hidden'} md:flex flex-col  gap-4 px-3 md:items-center md:gap-6 md:flex-row`}>
          <svg onClick={(e)=>{setSidebar(false)}} className='absolute w-10 h-10 md:hidden top-4 right-7' xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M13.4,12l6.3-6.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l6.3,6.3l-6.3,6.3C4.1,18.5,4,18.7,4,19c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L13.4,12z"/></svg>
          {
            mode === 'dark' ? (
              <svg onClick={toggleMode} className='w-6 h-6 text-white ' width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="white"></path> </svg>

            ) : (
              <svg onClick={toggleMode} className='w-6 h-6 text-white ' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16"> <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" /> </svg>
            )
          }
          {/* <img src='' alt='a' />
          <img src='' alt='a' />
          <img src='' alt='a' /> */}
          <button className='relative max-w-[150px] flex justify-around gap-3 px-3 py-[3.4px] items-center rounded-md dark:text-white bg-stone-200 dark:bg-stone-700'>
            {fullname}
            {
              hidden ? (
                <svg onClick={togglebtn} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z" /> </svg>
              ) : (
                <svg onClick={togglebtn} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-short" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" /> </svg>
              )

            }
            <div className={`absolute ${hidden && 'hidden duration-100'} dark:bg-stone-900 left-0 w-full bg-white rounded-md shadow-md top-8`}>
              <div className=''>
                {fullname}
              </div>
              <button onClick={()=>{
                dispatch(setLogout({user,token}))
              navigate('/')
            }}>
                logout
              </button>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;

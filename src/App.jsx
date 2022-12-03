import React, { useState } from 'react';
import Timer from './components/Timer';
import Description from './components/Description'
import Footer from './components/Footer'

export default function App() {
  
  const [isOpen, setOpened] = useState(false);  // Menu state

  // Default time
  const time = {
    workMinutes: 25,
    workSeconds: 0,
    breakMinutes: 5,
    breakSeconds: 0
  };

  /**
   * Toggles menu state
   */
  const toggleMenu = () => {
    setOpened(!isOpen);
  };

  let menuCSS = "fixed z-10 top-7 left-7 bg-neutral-900 rounded-3xl w-[300px] h-fit duration-300".concat(isOpen ? " " : " translate-x-[-130%]");

  return (
    <>

      <button className="fixed left-7 top-7" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-neutral-600 hover:text-red-500 duration-300 hover:rotate-90 active:scale-90">
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
        </svg>
      </button>

      <div className={menuCSS}>
        <div className="flex flex-col items-center text-red-500 text-xl py-5">

          <button className="mb-5" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-red-500 hover:text-neutral-600 duration-300 hover:rotate-90 active:scale-90">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>

          <form className='flex flex-col items-center'>
            <div>
              <label>Work Minutes</label>
              <input type="number" name="settings" placeholder="25" className="text-neutral-900 bg-neutral-50 focus:outline-none focus:ring focus:ring-red-500 p-1 w-16 m-2"></input>
            </div>
            <div>
              <label>Break Minutes</label>
              <input type="number" name="settings" placeholder="5" className="text-neutral-900 bg-neutral-50 focus:outline-none focus:ring focus:ring-red-500 p-1 w-16 m-2"></input>
            </div>
            <button className='bg-neutral-700 w-32 h-10 text-2xl rounded-2xl mt-5'>
              Apply
            </button>
          </form>

        </div>
      </div>

      <div className="bg-neutral-800 text-red-500 min-h-screen">
        <Timer time={time} />
        <Description />
        <Footer />
      </div>

    </>
  )
}

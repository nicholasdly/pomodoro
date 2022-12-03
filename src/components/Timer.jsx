import React, { useState, useEffect } from "react";
import button from "/sounds/button.mp3";
import alarm from "/sounds/alarm.mp3"

export default function Timer({time}) {
    
    // Timer state
    const [[minutes, seconds], setTime] = useState([
        time.workMinutes,
        time.workSeconds
    ]);

    const [paused, setPaused] = useState(true);  // Pause state
    const [working, setWorking] = useState(true);  // Work state
    const [isOpen, setOpened] = useState(false);  // Menu state

    const buttonSound = new Audio(button);
    const alarmSound = new Audio(alarm);
    buttonSound.volume = 0.25;

    /**
     * Updates the time state
     */
    const tick = () => {
        if (minutes === 0 && seconds === 0) {
            // Automatically reset timer and toggle working state
            setWorking(!working);
            if (working) {
                setTime([time.breakMinutes, time.breakSeconds]);
            } else {
                setTime([time.workMinutes, time.workSeconds]);
            }
            alarmSound.play();
        } else if (seconds === 0) {
            setTime([minutes - 1, 59]);  // Decrement minutes
        } else {
            setTime([minutes, seconds - 1]); // Decrement seconds
        }
    };

    /**
     * Toggles pause state
     */
    const togglePause = () => {
        buttonSound.play();
        setPaused(!paused);
    };

    /**
     * Resets the timer
     */
    const onReset = () => {
        buttonSound.play();
        setPaused(true);
        setWorking(true);
        document.title = "Tomatera";
        setTime([time.workMinutes, time.workSeconds]);
    };

    /**
     * Toggles menu state
     */
    const toggleMenu = () => {
        setOpened(!isOpen);
    };

    /**
     * Sets time to new values.
     */
    const onApply = () => {
        let inputWorkMinutes = Number(document.getElementById("workMinutes").value);
        let inputBreakMinutes = Number(document.getElementById("breakMinutes").value);

        if (inputWorkMinutes > 0) {
            time.workMinutes = inputWorkMinutes;
        } else {
            time.workMinutes = 25;
        }

        if (inputBreakMinutes > 0) {
            time.breakMinutes = inputBreakMinutes;
        } else  {
            time.breakMinutes = 5;
        }

        onReset();
    };

    let timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    let labelText = working ? "WORK TIME" : "BREAK TIME";
    let pauseText = paused ? "Start" : "Stop";

    // Updates the timer every 1000ms
    useEffect(function() {
        if (!paused) {
            document.title = `Tomatera :: ${timerText}`;
            const timer = setInterval(() => { tick(); }, 1000);
            return function() { clearInterval(timer); }
        } else {
            return function() { clearInterval(); }
        }
    });

    let menuCSS = "fixed z-10 top-7 left-7 bg-neutral-900 rounded-3xl w-[300px] h-fit duration-300".concat(isOpen ? " " : " translate-x-[-130%]");

    return (
        <>
            <button className="fixed left-7 top-7 rounded-[50%]" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-neutral-600 hover:text-red-500 duration-300 hover:rotate-90 active:scale-90">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
            </button>

            <div className={menuCSS}>
                <div className="flex flex-col items-center text-red-500 text-xl py-5">
                
                <button className="mb-5 rounded-[50%]" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-red-500 hover:text-neutral-600 duration-300 hover:rotate-90 active:scale-90">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>

                <div>
                    <label className="m-1">
                        Work Minutes
                    </label>
                    <input type="number" min="1" id="workMinutes" placeholder="25" className="text-neutral-900 bg-neutral-50 focus:outline-none focus:ring focus:ring-red-500 p-1 w-16 m-2" />
                </div>
                <div>
                    <label className="m-1">
                        Break Minutes
                    </label>
                    <input type="number" min="1" id="breakMinutes" name="settings" placeholder="5" className="text-neutral-900 bg-neutral-50 focus:outline-none focus:ring focus:ring-red-500 p-1 w-16 m-2" />
                </div>
                <button onClick={onApply} className='bg-neutral-700 py-2 px-5 text-2xl rounded-2xl mt-5 duration-300 hover:bg-red-500 hover:text-neutral-700 active:scale-90'>
                    Apply & Reset
                </button>

                </div>
            </div>

            <div className="flex flex-col items-center text-center pt-[24vh] h-[100vh]">
                
                <span id="label" className="text-3xl sm:text-5xl opacity-50 duration-300">
                    {labelText}
                </span>

                <span className="text-8xl sm:text-[180px] font-mono font-[400] duration-300 py-4">
                    {timerText}
                </span>

                <div className="flex items-center justify-center text-center">
                    <button onClick={togglePause} className="bg-neutral-700 w-24 h-9 text-2xl sm:w-52 sm:h-14 sm:text-4xl rounded-2xl mx-5 duration-300 hover:bg-red-500 hover:text-neutral-700 active:scale-90">
                        {pauseText}
                    </button>
                    <button onClick={onReset} className="bg-neutral-700 w-24 h-9 text-2xl sm:w-52 sm:h-14 sm:text-4xl rounded-2xl mx-5 duration-300 hover:bg-red-500 hover:text-neutral-700 active:scale-90"> 
                        Reset
                    </button>
                </div>

                <div className="absolute bottom-12 px-10">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-16 h-16 animate-bounce">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                    </svg>
                </div>
                
            </div>
        </>
    )
}
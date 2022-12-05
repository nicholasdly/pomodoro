import React, { useState, useEffect } from "react";
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

    const alarmSound = new Audio(alarm);

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
        setPaused(!paused);
    };

    /**
     * Resets the timer
     */
    const onReset = () => {
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

    let timerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    let labelText = working ? "WORK TIME" : "BREAK TIME";
    let pauseText = paused ? "Start" : "Stop";

    // Updates the timer every 1000ms
    useEffect(() => {
        let workSlider = document.getElementById("workSlider");
        let breakSlider = document.getElementById("breakSlider");

        workSlider.oninput = function() {
            time.workMinutes = this.value;
            onReset();
        };
    
        breakSlider.oninput = function() {
            time.breakMinutes = this.value;
            onReset();
        };

        if (!paused) {
            document.title = `${timerText}`;
            const timer = setInterval(() => { tick(); }, 1000);
            return function() { clearInterval(timer); }
        } else {
            return function() { clearInterval(); }
        }
    });

    let openMenuCSS = "fixed left-5 top-5 rounded-[50%] duration-300".concat(isOpen ? " opacity-0" : "")
    let menuCSS = "fixed z-10 bg-neutral-900 bg-opacity-75 w-80 h-[100vh] px-4 duration-300".concat(isOpen ? "" : " translate-x-[-100%]");

    return (
        <>
            <button className={openMenuCSS} onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-neutral-600 hover:text-red-500 duration-300 hover:rotate-90 active:scale-90">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
            </button>

            <div className={menuCSS}>
                <div className="flex flex-col items-center text-red-500 text-xl py-5">
                
                    <button className="self-start ml-1 mb-5 rounded-[50%]" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-12 h-12 text-red-500 hover:text-neutral-600 duration-300 hover:rotate-90 active:scale-90">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>

                    <label className="m-1">
                        Work Minutes: {time.workMinutes}
                    </label>
                    <input type="range" min="1" max="60" defaultValue="25" id="workSlider" className="accent-red-500 focus:outline-none mb-4" />

                    <label className="m-1">
                        Break Minutes: {time.breakMinutes}
                    </label>
                    <input type="range" min="1" max="60" defaultValue="5" id="breakSlider" className="accent-red-500 focus:outline-none mb-4" />

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
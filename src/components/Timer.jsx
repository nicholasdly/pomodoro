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

    const buttonSound = new Audio(button);
    buttonSound.volume = 0.25;
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

    return (
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
    )
}
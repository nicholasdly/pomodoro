import React from "react";

export default function Timer() {
    return (
        <div className="flex flex-col items-center text-center pt-[24vh] h-[100vh]">
            
            <span className="text-3xl sm:text-5xl opacity-50 duration-300">
                WORK TIME
            </span>

            <span className="text-8xl sm:text-[180px] font-mono font-[400] duration-300 py-4">
                25:00
            </span>

            <div className="flex items-center justify-center text-center">
                <button className="bg-neutral-700 w-24 h-9 text-2xl sm:w-52 sm:h-14 sm:text-4xl rounded-2xl mx-5 duration-300 hover:bg-red-500 hover:text-neutral-700 active:scale-90">
                    Start
                </button>
                <button className="bg-neutral-700 w-24 h-9 text-2xl sm:w-52 sm:h-14 sm:text-4xl rounded-2xl mx-5 duration-300 hover:bg-red-500 hover:text-neutral-700 active:scale-90"> 
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
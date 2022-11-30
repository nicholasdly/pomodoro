import React from "react";

export default function Description() {
    return (
        <div className="flex flex-col item-center text-center px-[10vw] pb-20 text-xl sm:text-2xl duration-300">

            <h1 className="pb-8 text-3xl sm:text-4xl font-bold">
                Tomatera is an automatic pomodoro timer.
            </h1>

            <p>
                The <em>pomodoro</em> technique is a method of time management through intervals.
                <br/>
                By taking routine breaks, you stay <b>motivated</b> and therefore more <b>productive</b>.
                <br/><br/>
                <b>Tomatera</b> aims to help you apply the pomodoro technique and keep track of your time by automatically switching between 25 minute and 5 minute work/break timers.
                <br/><br/>
                <b>A short jingle will play at the end of each timer.</b>
            </p>

        </div>
    )
}
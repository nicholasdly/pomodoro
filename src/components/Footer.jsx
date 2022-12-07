import React from "react";

export default function Footer() {
    return (
        <div className="bg-neutral-900 text-center w-[100vw] p-4">
            <p>
                Tomatera is a student's individual web development project,<br/>
                and will stay free to use and free of ads <b>forever</b>.<br/>
            </p>
            <br/>
            <p>
                If there are any issues, please contact me through my website.<br/>
                Check it out at {}
                <a className="underline" href="https://nicholasly.com/" target="_blank" rel="noreferrer noopener">
                    nicholasly.com
                </a>
                !
            </p>
        </div>
    )
}
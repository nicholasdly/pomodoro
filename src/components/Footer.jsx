import React from "react";

export default function Footer() {
    return (
        <div className="flex flex-col bg-neutral-900 items-center justify-center text-center w-[100vw] p-4">

            <p>
                Check out the {}
                <a className="underline" href="" target="_blank" rel="noreferrer noopener">
                    source code
                </a>
                !
            </p>
            <p>
                To learn more about me, visit {}
                <a className="underline" href="https://www.nicholasly.com/" target="_blank" rel="noreferrer noopener">
                    my website
                </a>
                !
            </p>
            

        </div>
    )
}
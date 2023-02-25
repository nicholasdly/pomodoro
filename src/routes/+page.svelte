<script>
    import { onMount } from "svelte";
    import Timer from "$lib/components/Timer.svelte";
    import Header from "$lib/components/Header.svelte";

    let theme = 'light';
    
    onMount(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            theme = 'dark';
        }

        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
</script>
    
<svelte:head>
    <meta name="description" content="Tomatera is a minimalist, online automatic pomodoro timer designed to help you stay productive and keep you from distractions.">
</svelte:head>

<main>
    <section class="flex flex-col items-center justify-center h-screen">
        <Header />
        <Timer />
    </section>
    <section class="flex flex-col items-center mb-16 md:mb-10">
        <p class="font-mono font-semibold md:text-xl mx-10 max-w-[800px] text-center">
            Tomatera is an open source automatic pomodoro timer, meaning the timer above will automatically switch between a "work" timer and a "break" timer. A sound will be played at the end of each timer.<br/><br/>
            By taking short, routine breaks during a designated time of focus, people generally find it easier to stay motivated and productive. <br/><br/>
            Check out the source code <a href="https://github.com/nicholasdly/tomatera.dev" rel="noopener noreferrer" target="_blank" class="underline">here</a>, or take a look at my personal website <a href="https://www.nicholasly.com" rel="noopener noreferrer" target="_blank" class="underline">here</a>.
        </p>
    </section>
    <section>
        <p class="flex flex-col items-center mt-20 mb-3 text-center">
            &copy; {new Date().getFullYear()} Nicholas Ly. All rights reserved. <br/>
            This website is open source under a MIT License.
        </p>
    </section>
</main>
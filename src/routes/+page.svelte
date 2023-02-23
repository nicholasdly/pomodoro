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
    
<main>
    <section class="flex flex-col items-center my-16 md:my-10">
        <Header />
        <Timer />
        <p class="font-mono font-semibold md:text-xl mt-16 mx-10 max-w-[600px] text-center">
            Tomatera is an automatic pomodoro timer, meaning the timer above will automatically switch between a "work" timer and a "break" timer. A sound will be played at the end of each timer.<br/><br/>
            By taking short, routine breaks during a designated time of focus, people generally find it easier to stay motivated and productive. <br/><br/>
            Check out the source code <a href="https://github.com/nicholasdly/tomatera.dev" rel="noopener noreferrer" target="_blank" class="underline">here</a>, or take a look at my personal website <a href="https://www.nicholasly.com" rel="noopener noreferrer" target="_blank" class="underline">here</a>.
        </p>
    </section>
</main>
<script>
    import { onMount } from 'svelte';
    import Header from '$lib/components/Header.svelte';
    import ascii from '$lib/data/ascii';

    let break_audio, work_audio;

    let header_text = 'TOMATERA';

    // Duration of each interval
    let work_minutes = 25;
    let break_minutes = 5;
    
    // Displayed time values
    let minutes = 0;
    let seconds = 0;

    let clock;
    let paused = true;
    let breaktime = false;
    let configurable = true;

    onMount(() => {
        break_audio.volume = 0.7;
        work_audio.volume = 0.7;

        // Retrieve and set interval durations from browser local storage
        const local_work = localStorage.getItem('work_minutes');
        const local_break = localStorage.getItem('break_minutes');
        if (local_work != null) { work_minutes = +local_work; }
        if (local_break != null) { break_minutes = +local_break; }

        minutes = work_minutes;
    });

    // Moves the clock forward one second
    function tick() {
        if (minutes === 0 && seconds === 0) {
            if (breaktime) {
                breaktime = false;
                minutes = work_minutes;
                work_audio.play();
            } else {
                breaktime = true;
                minutes = break_minutes;
                break_audio.play();
            }
            seconds = 0;
            header_text = breaktime ? 'BREAK' : 'FOCUS';
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }

    // Toggle pause state; on start/resume, start the clock
    function toggle_pause() {
        if (paused) {
            clock = setInterval(() => {
                if (!breaktime) { fetch('/api/inc_collective_time'); }
                tick();
            }, 1000);
            paused = false;
        } else {
            clearInterval(clock);
            paused = true;
        }
        header_text = breaktime ? 'BREAK' : 'FOCUS';
    }

    // Reset timer
    function reset() {
        clearInterval(clock);
        paused = true;
        breaktime = false;
        configurable = true;
        minutes = work_minutes;
        seconds = 0;
        header_text = 'TOMATERA';
    }

    // Fetches collective productive time in seconds
    async function getCollectiveTime() {
        const response = await fetch('/api/get_collective_time');
        if (response.ok) return await response.json();
        throw new Error( await response.text() );
    }
</script>

<!-- Page title matches timer display -->
<svelte:head>
    <title>
        {paused ? 'TOMATERA' : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
    </title>
</svelte:head>

<audio src="sounds/work.mp3" type="audio/mpeg" bind:this={work_audio} />
<audio src="sounds/break.mp3" type="audio/mpeg" bind:this={break_audio} />

<section class="flex flex-col items-center justify-center h-screen">

    <div class="flex flex-col gap-10 max-md:max-w-[400px]">
    
        <!-- Metrics -->
        {#await getCollectiveTime()}
            <p class="text-center md:text-xl font-mono font-semibold mx-10">
                Collectively, Tomatera users have been productive for over ? minutes!
            </p>
        {:then time} 
            <p class="text-center md:text-xl font-mono font-semibold mx-10">
                Collectively, Tomatera users have been productive for over {Math.floor(time / 60).toLocaleString()} minutes!
            </p>
        {:catch error}
            <p class="text-center md:text-xl font-mono font-semibold mx-10">
                Unable to load collective productive time!
            </p>
        {/await}
    
        <Header text={header_text} />
    
    </div>
    
    <!-- Timer Display -->
    <div class="flex gap-6 md:gap-10 mt-8">
        {#each `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}` as symbol}
            {#key symbol}
                <div class="font-mono text-[10px] md:text-xl whitespace-pre font-black md:leading-5 leading-none text-start">
                    {ascii[symbol]}
                </div>
            {/key}
        {/each}
    </div>
    
    <!-- Timer Settings -->
    <div class="flex flex-col items-end mb-12">
        <div class="flex items-center font-mono gap-2">
            <label for="work_minutes" class="whitespace-pre">
                {work_minutes.toString().padStart(3, ' ')} work minutes
            </label>
            <input class="accent-neutral-500" id="work_minutes" type=range bind:value={work_minutes} min=5 max=90 step=5 on:input={() => { minutes = work_minutes; }} on:change={() => localStorage.setItem('work_minutes', work_minutes.toString())} disabled={!configurable}>
        </div>
        <div class="flex items-center font-mono gap-2">
            <label for="break_minutes">
                {break_minutes} break minutes
            </label>
            <input class="accent-neutral-500" id="break_minutes" type=range bind:value={break_minutes} min=1 max=20 step=1 on:change={() => localStorage.setItem('break_minutes', break_minutes.toString())} disabled={!configurable}>
        </div>
    </div>
    
    <!-- Timer Controls -->
    <div class="flex flex-row items-center gap-x-8 md:gap-x-16">
        <button on:click={() => { toggle_pause(); configurable=false; }} class="flex gap-1 md:gap-2 group">
            {#each (paused ? (configurable ? 'START' : 'RESUME') : 'PAUSE') as symbol}
                <div class="font-mono text-[5px] md:text-[8px] whitespace-pre font-bold leading-none text-start opacity-60 group-hover:opacity-100">
                    {ascii[symbol]}
                </div>
            {/each}
        </button>
        <button on:click={reset} class="flex gap-1 md:gap-2 group">
            {#each 'RESET' as symbol}
                <div class="font-mono text-[5px] md:text-[8px] whitespace-pre font-bold leading-none text-start opacity-60 group-hover:opacity-100">
                    {ascii[symbol]}
                </div>
            {/each}
        </button>
    </div>

</section>


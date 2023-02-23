<script>
    import { onMount } from 'svelte';
    import ascii from '../../data/ascii';

    let break_audio, work_audio;

    // Duration of each round
    let work_minutes = 50;
    let break_minutes = 10;

    // Displayed time variables
    let minutes = work_minutes;
    let seconds = 0;
    
    let clock;
    let paused = true;
    let breaktime = false;
    
    onMount(() => {
        break_audio.volume = 0.7;
        work_audio.volume = 0.7;
        const local_work = +localStorage.getItem('work_minutes');
        const local_break = +localStorage.getItem('break_minutes');
        if (local_work != null) {
            work_minutes = local_work;
            minutes = work_minutes;
        }
        if (local_break != null) { break_minutes = local_break; }
    });

    /**
     * Registers a single tick on the timer.
     */
    function tick() {
        if (paused) return;
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
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }

    /**
     * Toggles the pause state of the timer.
     */
    function toggle_pause() {
        if (paused) {
            clock = setInterval(() => {
                tick();
                fetch('/api/inc_collective_time');
            }, 1000);
            paused = false;
        } else {
            clearInterval(clock);
            paused = true;
        }
    }

    /**
     * Resets the timer.
     */
    function reset() {
        clearInterval(clock);
        paused = true;
        minutes = work_minutes;
        seconds = 0;
    }
</script>

<!-- Audio Files -->
<audio src="sounds/work.mp3" type="audio/mpeg" bind:this={work_audio} />
<audio src="sounds/break.mp3" type="audio/mpeg" bind:this={break_audio} />

<!-- Head -->
<svelte:head>
    <title>
        {paused ? 'Tomatera' : `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`}
    </title>
</svelte:head>

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
        <label for="minutes" class="whitespace-pre">
            {work_minutes.toString().padStart(3, ' ')} work minutes
        </label>
        <input class="accent-neutral-500" id="minutes" type=range bind:value={work_minutes} min=5 max=60 step=5 on:input={reset} on:change={() => localStorage.setItem('work_minutes', work_minutes.toString())} disabled={!paused}>
    </div>
    <div class="flex items-center font-mono gap-2">
        <label for="minutes">
            {break_minutes} break minutes
        </label>
        <input class="accent-neutral-500" id="minutes" type=range bind:value={break_minutes} min=1 max=30 step=1 on:input={reset} on:change={() => localStorage.setItem('break_minutes', break_minutes.toString())} disabled={!paused}>
    </div>
</div>

<!-- Timer Controls -->
<div class="flex flex-row items-center gap-x-8 md:gap-x-16">
    <button on:click={toggle_pause} class="flex gap-1 md:gap-2 group">
        {#each (paused ? 'START' : 'PAUSE') as symbol}
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

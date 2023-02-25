<script>
    import { header_text } from '../stores'; 
    import ascii from '../../data/ascii';

    let text;

    header_text.subscribe(value => {
        text = value;
    });

    async function getCollectiveTime() {
        const response = await fetch('/api/get_collective_time');
        if (response.ok) return await response.json();
        throw new Error( await response.text() );
    }
</script>

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

    <!-- Header -->
    <div class="flex gap-1 md:gap-3 justify-center opacity-60">
        {#each text as symbol}
            <div class="font-mono text-[5px] md:text-[11px] whitespace-pre font-bold leading-none text-start">
                {ascii[symbol]}
            </div>
        {/each}
    </div>

</div>


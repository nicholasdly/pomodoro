<script>
    import ascii from '$lib/data/ascii';

    export let text;
</script>

<div class="flex gap-1 md:gap-3 justify-center opacity-60">
    {#each text as symbol}
        <div class="font-mono text-[5px] md:text-[11px] whitespace-pre font-bold leading-none text-start">
            {ascii[symbol]}
        </div>
    {/each}
</div>


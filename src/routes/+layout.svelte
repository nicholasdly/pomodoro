<script>
    import "../app.css";
    import { onMount } from "svelte";

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
    <meta name="description" content="The open-source, online pomodoro timer made to streamline your productivity.">
</svelte:head>

<slot />
<script>
    import Timer from "$lib/components/Timer.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<main class="flex flex-col items-center">

    <Timer />

    <section class="flex flex-col font-mono font-semibold md:text-xl mx-10 mb-20 max-w-[800px] gap-10">
        
        <h1 class="text-2xl md:text-4xl text-center">
            The open-source pomodoro timer made to streamline your productivity.
        </h1>

        <div>
            <h2 class="text-xl md:text-3xl underline">
                What is Tomatera?
            </h2>
            <p>
                Tomatera is an ad-free, open-source pomodoro timer developed by an undergraduate computer science student.
                With a focus on simple yet effective and functional design, Tomatera can boost your productivity by helping you apply the famous pomodoro technique to your life.
                Automated with audio cues, Tomatera is fully functional on desktop and mobile internet browsers, with plans to expand to standalone software.
            </p>
        </div>

        <div>
            <h2 class="text-xl md:text-3xl underline">
                What is the pomodoro technique?
            </h2>
            <p>
                Developed by Francesco Cirillo in the late 1980s, the pomodoro technique is a method of time management that utilizes designated work and break intervals.
                The technique was named after the Spanish word for tomato, due to Cirillo's use of a tomato shaped kitchen timer which he used as a university student.
            </p>
        </div>

        <div>
            <h2 class="text-xl md:text-3xl underline">
                How do I use Tomatera?
            </h2>
            <ol>
                <li>1. Add tasks to the to-do list.</li>
                <li>2. Adjust the timer intervals to your liking.</li>
                <li>3. Start the timer and focus on your tasks during the work interval.</li>
                <li>4. When the alarm rings, take a break during the break interval.</li>
                <li>5. When the alarm rings again, focus again and repeat until all your tasks are done!</li>
            </ol>
        </div>

    </section>

    <Footer />

</main>
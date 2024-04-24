<script>
    import {
        Skeleton,
        Button,
    } from "flowbite-svelte";
    import { Heading, P } from "flowbite-svelte";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
</script>

<div class="max-w-5xl mx-auto pt-10 flex flex-col gap-24 mb-48">
    <div class="max-h-full">
        <PageHeaderArea title="Quuli is Back ..." text="... und diese erweiterte Version bringt eine ganze Reihe an leckeren Features mit sich!" />
        <img src="logo.svg" alt="" class="p-8 bg-white rounded-3xl">
    </div>

    <div>
        <Heading tag="h2" customSize="text-4xl font-bold mb-3">Komplett Gratis</Heading>
        <p class="text-2xl">Quuli kostet nichts. Du kannst also sorgenfrei einen <a href="/login" class="underline">Account anlegen</a> und los besserwissen.</p>
    </div>

    <div>
        <Heading tag="h2" customSize="text-4xl font-bold mb-3">Fortschritt</Heading>
        <p class="text-2xl">Auch wenn du ohne unangemeldet <a href="/quiz" class="underline">Fragen beantworten</a> kannst, empfiehlt es sich, einen <a href="/login" class="underline">Account ganz einfach per E-Mail anzulegen</a>, denn dann wird dein Fortschritt getrackt, du hast die Möglichkeit, auf der Rangliste zu erscheinen und du kannst <a href="/fragen/vorschlagen" class="underline">Fragen vorschlagen</a>.</p>
    </div>
    
    <div>
        <Heading tag="h2" customSize="text-4xl font-bold mb-3">Rangliste</Heading>
        <p class="text-2xl">Du kannst dich mit anderen Quuli-Nutzern messen und auf der <a href="/rangliste" class="underline">Rangliste</a> sehen, wie gut du im Vergleich abschneidest.</p>
    </div>

    <div>
        <Heading tag="h2" customSize="text-4xl font-bold mb-3">Fragen vorschlagen</Heading>
        <p class="text-2xl">
            Du hast eine Frage, die du gerne in Quuli sehen würdest? Dann <a href="/fragen/vorschlagen" class="underline">schlag sie vor</a>! 
            Wenn sie gut ist, wird sie in die Datenbank aufgenommen und du kannst sie in einem der nächsten Quizze beantworten.
        </p>
    </div>

    <div class="text-center text-2xl">
        Also worauf wartest du noch ... <a href="/login" class="underline text-primary-600 font-semibold">lege dir einen Account an</a> und fang an, besser zu wissen!
    </div>
</div>
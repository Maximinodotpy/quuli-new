<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import NumberInputContainer from "$lib/Components/FormElements/NumberInputContainer.svelte";
    import jsPDF from "jspdf";
    import { jsonToFormData } from "$lib/helpers";
    import type { Question } from '@prisma/client'
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import {
        Button,
        ButtonGroup,
        Card,
        Heading,
    } from "flowbite-svelte";

    let iframe: HTMLIFrameElement;
    let questions: Question[] = [];

    // User Settings
    let amount = 25;

    $: {
        amount;

        if (browser && iframe) {
            refreshQuestions()
                .then(() => createPDF());
        }
    }

    async function refreshQuestions() {
        const res = await fetch(
            '/api/questions/get-random-collection',
            {
                method: 'POST',
                body: jsonToFormData({ amount })
            }
        );

        questions = await res.json();
    }

    function createPDF(download = false) {
        console.log('create pdf');
        const pdf = new jsPDF();

        
        const Padding = 20;
        const Space = 7
        const innerWidth = pdf.internal.pageSize.width - Padding * 2;

        function renderOnEachPage() {
            const url = 'https://www.quuli.ch'
            const qr_code = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&margin=0&bgcolor=ffffff&color=000000`

            pdf.addImage(qr_code, 'PNG', pdf.internal.pageSize.width - 30, 10, 20, 20, undefined, 'FAST');

            pdf.text('Quuli.ch', pdf.internal.pageSize.width - 10, 37, { align: 'right' });

            // Add a page number
            pdf.text(`Seite ${pdf.internal.getNumberOfPages()}`, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10, { align: 'right' });
        }

        renderOnEachPage();

        let content: Array<Array<string>> = [
            [
                '',
                '',
                'Quuli Fragen Ausdruck',
                '',
            ],
        ]

        questions.forEach((question, index) => {
            let group = []

            group.push(
                ...pdf.splitTextToSize(
                    `${index + 1}. ${question.question}`,
                    innerWidth
                )
            );
            group.push(...pdf.splitTextToSize(
                `Antwort: ${question.answer}, ${question.wrongAnswer1}, ${question.wrongAnswer2}, ${question.wrongAnswer3}`,
                innerWidth,
                {}
            ));
            group.push('');

            content.push(group);
        });

        // Turn every top level string into an array
        content = content.map(group => {
            if (Array.isArray(group)) {
                return group;
            } else {
                return [group];
            }
        });

        /* pdf.html(document.body.querySelector('#hello'), {
            x: 10,
            y: 10,
            callback: () => {
                console.log('callback');
            },
            width: 200,
        }); */

        // Render
        let i = 0;
        content.forEach((group, index) => {            
            let y = Padding + i * Space;
            let groupHeight = group.length * Space + Padding;

            console.log(y, groupHeight, pdf.internal.pageSize.height);

            if (y + groupHeight > pdf.internal.pageSize.height) {
                pdf.addPage();
                y = Padding;
                i = 0;
                renderOnEachPage();
            }

            let indexWithinGroup = 0;
            group.forEach((line, index) => {
                pdf.text(line, Padding, y + indexWithinGroup * Space);
                indexWithinGroup++;
            });

            // Check if this item string or array would wrap then add a new page

            i += group.length;
        });

        var string = pdf.output('datauristring');
        iframe.setAttribute('src', string);

        if (download) {
            pdf.save("quizfragen.pdf");
        }
    }

    onMount(() => {
        refreshQuestions()
            .then(() => createPDF());
    });


    enum OutputModes {
        QUESTION_AND_ANSWER,
        QUESTION_AND_ANSWERS,
        QUESTION_AND_ANSWERS_SEPERATED,
    }
</script>

<PageHeaderArea title="Fragen als PDF exportieren" text="Möchtest du deine Freunde auch noch im echten Leben mit Quiz Fragen nerven, dann bist hier genau richtig." />

<div class="grid md:grid-cols-2 gap-10 items-start">
    <div class="grid gap-8">
        <Card class="max-w-full">
            <Heading tag="h3">Ausdruck</Heading>
    
            <ButtonGroup divClass="gap-0 flex w-full justify-stretch pt-8">
                <Button class="w-full" on:click={() => { createPDF(true) }}>PDF Herunterladen</Button>
                <Button class="w-full" on:click={() => { refreshQuestions() }}>Neue Fragen</Button>
            </ButtonGroup>
        </Card>

        <Card class="max-w-full grid gap-8">
            <Heading tag="h3">Einstellungen</Heading>

            <NumberInputContainer id="amount" title="Anzahl Fragen" bind:value={amount} />
        </Card>
    </div>
    
    <iframe bind:this={iframe} title="PDF" class="w-full aspect-[210/297]" />

    <div id="hello">
        <h1>flaöksdjf</h1>
        fflaskjdflöakjs
    </div>
</div>
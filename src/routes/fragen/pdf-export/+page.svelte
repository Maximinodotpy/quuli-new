<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import jsPDF from "jspdf";
    import { getPlaceholderImage, jsonToFormData } from "$lib/helpers";
    import type { Question } from '@prisma/client'
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import {
        Button,
        ButtonGroup,
        Checkbox,
        CheckboxButton,
        Card,
        Heading,
    } from "flowbite-svelte";

    let iframe: HTMLIFrameElement;
    let questions: Question[] = [];

    $: {
        questions;

        if (browser && iframe) {
            createPDF();
        }
    }

    async function refreshQuestions() {
        const res = await fetch(
            '/api/questions/get-random-collection',
            {
                method: 'POST',
                body: jsonToFormData({ amount: 25 })
            }
        );

        questions = await res.json();

        console.log(questions);
    }

    function createPDF(download = false) {
        console.log('create pdf');

        const pdf = new jsPDF();

        pdf.text("Quuli Fragen Audruck", 10, 10);

        questions.forEach((question, index) => {
            pdf.text(`${index + 1}. ${question.question}`, 10, 20 + index * 10);
            pdf.text(`A: ${question.answer}`, 10, 35 + index * 10);
        });

        const url = 'https://www.quuli.ch'
        const qr_code = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&margin=0&bgcolor=ffffff&color=000000`

        pdf.addImage(qr_code, 'PNG', pdf.internal.pageSize.width - 30, 10, 20, 20, undefined, 'FAST');

        var string = pdf.output('datauristring');
        iframe.setAttribute('src', string);

        if (download) {
            pdf.save("quizfragen.pdf");
        }
    }

    onMount(() => {
        refreshQuestions();
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

        <Card class="max-w-full">
            <Heading tag="h3">Einstellungen</Heading>
        </Card>
    </div>
    
    <iframe bind:this={iframe} title="PDF" class="w-full aspect-[210/297]" />
</div>
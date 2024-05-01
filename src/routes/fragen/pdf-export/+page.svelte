<script lang="ts">
    import {} from "flowbite-svelte";
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import jsPDF from "jspdf";
    import { getPlaceholderImage, jsonToFormData } from "$lib/helpers";

    let iframe: HTMLIFrameElement;

    async function refreshQuestions() {
        const res = await fetch(
            '/api/questions/get-random-questions',
            {
                method: 'POST',
                body: jsonToFormData({ amount: 10 })
            }
        );
    }

    function createPDF(download = false) {
        const pdf = new jsPDF();

        pdf.text("Hello world!", 10, 10);

        pdf.addImage(getPlaceholderImage('fasd'), 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'FAST');

        var string = pdf.output('datauristring');
        iframe.setAttribute('src', string);

        if (download) {
            pdf.save("quizfragen.pdf");
        }
    }

    createPDF();
</script>

<PageHeaderArea title="Fragen als PDF exportieren" text="Möchtest du deine Freunde auch noch im echten Leben mit Quiz Fragen nerven, dann bist hier genau richtig." />

<div class="grid md:grid-cols-2">
    <div class="container">
        <button on:click={() => { createPDF() }}>PDF erstellen</button>
    </div>
    
    <iframe bind:this={iframe} title="PDF" class="w-full aspect-[210/297]" />
</div>
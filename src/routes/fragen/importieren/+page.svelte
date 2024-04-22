<script lang="ts">
    import PageHeaderArea from "$lib/Components/PageHeaderArea.svelte";
    import { Textarea, Button, Table, TableBody, TableBodyCell, TableHead, TableHeadCell, Input, TableBodyRow } from "flowbite-svelte";
    import Papa from "papaparse";
    import type { Result } from "papaparse";
    import type { Question } from "@prisma/client";

    const FIELDS = ["Frage", "Antwort", "Falsch1", "Falsch2", "Falsch3"];
    const PAPAPARSE_CONFIG = {
        header: true,
        skipEmptyLines: true,
    };

    enum Steps {
        CSV,
        TableCorrection,
        Import,
        Success,
    }

    let step: Steps = Steps.CSV;

    let csvInput = FIELDS.join(",") + "\n";
    let csvStatus = {};

    let questionsList: Question[] = [];

    $: {
        csvStatus = Papa.parse(csvInput, PAPAPARSE_CONFIG);
        console.log(csvStatus);
    }

    function checkCSV() {
        const parsed = Papa.parse(csvInput, PAPAPARSE_CONFIG);
        
        step = Steps.TableCorrection;

        questionsList = parsed.data.map((question: { Frage: string, Antwort: string, Falsch1: string, Falsch2: string, Falsch3: string }) => {
            console.log(question);
            
            return {
                question: question.Frage,
                answer: question.Antwort,
                wrong1: question.Falsch1,
                wrong2: question.Falsch2,
                wrong3: question.Falsch3,
            };
        });
    }
</script>

<PageHeaderArea title="Fragen importieren" text="Hier kannst du Fragen importieren von einem CSV Text." />

<div>
    {#if step == Steps.CSV }
        <div>
            <div class="font-mono">
                <Textarea id="textarea-id" placeholder="Frage,Antwort,Falsch1,Falsch2,Falsch3" rows="4" name="message" wrappedClass="w-full" bind:value={csvInput} />
            </div>

            {#each csvStatus.errors as error}
                <p>{error.message}</p>
            {/each}

            <!-- Check if the fields from the status and the defined ones are the same -->
            {#if csvStatus.meta.fields && csvStatus.meta.fields.length == FIELDS.length}
                {#each csvStatus.meta.fields as field}
                    {#if FIELDS.indexOf(field) == -1}
                        <p>Das Feld {field} ist nicht erlaubt.</p>
                    {/if}
                {/each}
            {:else}
                <p>Die Felder sind nicht korrekt.</p>
            {/if}
        
            <Button disabled={csvInput == ''} on:click={checkCSV}>Struktur überprüfen</Button>
        </div>

    {:else if step == Steps.TableCorrection}
        <div>

            {JSON.stringify(questionsList)}
            <!-- Show the question list in an interactive table with input -->
            <Table divClass="border dark:border-slate-600 rounded-xl overflow-hidden">
                <TableHead>
                    {#each FIELDS as field}
                        <TableHeadCell>{field}</TableHeadCell>
                    {/each}
                </TableHead>
                <TableBody tableBodyClass="divide-y">
                    {#each questionsList as question, q_index}
                        <TableBodyRow>
                            {#each Object.keys(question) as key}
                                <TableBodyCell tdClass="w-1/5 p-3 px-6">
                                    <Input bind:value={ question[key] } />
                                </TableBodyCell>
                            {/each}
                        </TableBodyRow>
                    {/each}
                </TableBody>
            </Table>
            
        
            <Button>Importieren</Button>
        </div>

    {:else if step == Steps.Import}
        <div>
            <div class="font-mono">
                <Textarea id="textarea-id" placeholder="Frage,Antwort,Falsch1,Falsch2,Falsch3" rows="4" name="message" wrappedClass="w-full" />
            </div>
        
            <Button>Importieren</Button>
        </div>

    {:else if step == Steps.Success}
        <div>
            <div class="font-mono">
                <Textarea id="textarea-id" placeholder="Frage,Antwort,Falsch1,Falsch2,Falsch3" rows="4" name="message" wrappedClass="w-full" />
            </div>
        
            <Button>Importieren</Button>
        </div>
    {/if}
</div>
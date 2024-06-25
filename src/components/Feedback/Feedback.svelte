<script>
    import DatapointTable from "../../plots/DatapointTable.svelte";
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
    import { documentation } from "../../store";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { allClasses } from "../../config";
  
    export let datapoint;
    export let prediction;
  
    let class_names = allClasses
    $: confirmed = false;
  
    let [trustworthyPrediction, prevTrustworthyPrediction] = [null, null];
    let [mostLikelyPrediction, prevMostLikelyPrediction] = [null, null];
    let [responseText, prevResponseText] = [null, null];
  
    const handleConfirm = () => {
      confirmed = true;
      prevTrustworthyPrediction = trustworthyPrediction;
      trustworthyPrediction = null;
      prevMostLikelyPrediction = mostLikelyPrediction;
      mostLikelyPrediction = null;
      prevResponseText = responseText;
      responseText = null;
    };
  
    const handleUndoConfirm = () => {
      confirmed = false;
      trustworthyPrediction = prevTrustworthyPrediction;
      prevTrustworthyPrediction = null;
      mostLikelyPrediction = prevMostLikelyPrediction;
      prevMostLikelyPrediction = null;
      responseText = prevResponseText;
      prevResponseText = null;
    };
  </script>
  
  <div class="flex flex-col items-center">
    <h2>Provide Feedback</h2>

    <div class="flex flex-col items-center m-5 gap-y-10">
        <p>Based on your assessment in collaboration with the assistant, how does your feedback look like?</p>
        <p>Here is the datapoint and the model prediction for reference:</p>
      <DatapointTable datapoint={datapoint.values.values} prediction={prediction.values.prediction} hideImpact shapValues={null}/>
      <div class="flex flex-col items-center bg-muted p-5 m-2 gap-y-5">
        <div class="flex flex-col items-center justify gap-x-5 gap-y-2">
          <p>Do you think that the model prediction is trustworthy?</p>
          <ToggleGroup.Root type="single" bind:value={trustworthyPrediction}>
            <ToggleGroup.Item value="yes" aria-label="Toggle yes" bind>
              <p>Yes</p>
            </ToggleGroup.Item>
            <ToggleGroup.Item value="no" aria-label="Toggle no">
              <p>No</p>
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
        <div class="flex flex-col items-center justify gap-x-5 gap-y-2">
          <p>What is the most likely prediction in your opinion?</p>
          <ToggleGroup.Root type="single" bind:value={mostLikelyPrediction}>
            {#each class_names as class_name}
              <ToggleGroup.Item value={class_name} aria-label="Toggle yes">
                <p>{class_name}</p>
              </ToggleGroup.Item>
            {/each}
          </ToggleGroup.Root>
        </div>
        <div class="flex flex-col items-center justify gap-5">
          <p>How do you come to that conclusion?</p>
          <Textarea bind:value={responseText}/>
        </div>
        {#if !confirmed}
          <Button on:click={handleConfirm}>Confirm</Button>
        {:else}
          <div class="flex items-center gap-x-2">
            <p>Your Feedback has been sent.</p>
            <Button variant="secondary" on:click={handleUndoConfirm}>Undo</Button>
          </div>
        {/if}
      </div>
    </div>
    <h3>Your Documentation</h3>
    <div class="grid grid-cols-4 gap-4 mt-5">
      {#each Object.keys($documentation) as elem_key}
        <div>
          <p class="font-semibold">{elem_key}</p>
          <p>{$documentation[elem_key]}</p>
        </div>
      {/each}
    </div>
  </div>
  
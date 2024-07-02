<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import MultiLinePlot from "../../plots/MultiLinePlot.svelte";
  import MultiDropdown from "../BasicInteractions/MultiDropdown.svelte";
  import DocPopover from "../documentation/DocPopover.svelte";

  export let data;
  export let types = ["train"];

  let chosenTypes = types;
  let learning_curves = [];
  $: {
    learning_curves = [];
    for (let type of chosenTypes) {
      learning_curves.push(data[type]);
    }
  }

  const handleReset = () => {
    chosenTypes = types;
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center relative">
    <Button on:click={handleReset}
      ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
    >
    <MultiDropdown
      items={["train", "test"]}
      bind:values={chosenTypes}
      title={"Kind of data"}
      instruction={"Choose kind"}
      atLeastOne={true}
    />
    <DocPopover id={"LearningCurve_" + chosenTypes}/>
  </div>
  <MultiLinePlot data={learning_curves} title="Learning Curve"/>
</div>

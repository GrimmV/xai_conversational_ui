<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import PredConfusionPlot from "../../plots/PredConfusionPlot.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";
  import DocPopover from "../documentation/DocPopover.svelte";

  export let data;
  export let type = "train";

  let chosenType = type;

  const xKey = "actual";
  const yKey = "predicted";
  const zKey = "count";

  const handleReset = () => {
    chosenType = type;
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center relative">
    <Button on:click={handleReset}
      ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
    >
    <SingleDropdown
      items={["train", "test"]}
      bind:value={chosenType}
      title={"Kind of data"}
      instruction={"Choose kind"}
    />
    <DocPopover id={"ConfusionMatrix_" + chosenType}/>
  </div>
  <PredConfusionPlot
    data={data[chosenType]}
    props={{ xKey: xKey, yKey: yKey, zKey: zKey, title: "" }}
  />
</div>

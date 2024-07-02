<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import PredConfusionPlot from "../../plots/PredConfusionPlot.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";
  import DocPopover from "../documentation/DocPopover.svelte";

  export let data;

  console.log(data);

  const xKey = "f1";
  const yKey = "f2";
  const zKey = "correlation";
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center relative">
    <DocPopover id={"Correlation"}/>
  </div>
  <PredConfusionPlot
    data={data}
    props={{ xKey: xKey, yKey: yKey, zKey: zKey, title: "" }}
    xLabelRotation={45}
  />
</div>

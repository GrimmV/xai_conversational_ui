<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import PredConfusionPlot from "../../plots/PredConfusionPlot.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";

  export let data;

  console.log(data);

  const xKey = "f1";
  const yKey = "f2";
  const zKey = "correlation";
</script>

<div class="flex flex-col gap-2">
  <PredConfusionPlot
    data={data}
    props={{ xKey: xKey, yKey: yKey, zKey: zKey, title: "" }}
    xLabelRotation={45}
  />
</div>

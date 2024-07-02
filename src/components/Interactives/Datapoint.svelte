<script>
  import DatapointTable from "../../plots/DatapointTable.svelte";
  import DocPopover from "../documentation/DocPopover.svelte";

  export let datapoint;
  export let prediction;
  export let shapValues;
  export let hideImpact;
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center relative">
    <DocPopover id={`Datapoint_${hideImpact ? "hideImpact" : "showImpact"}`} />
  </div>
  <DatapointTable {datapoint} {prediction} {shapValues} {hideImpact} />
</div>

<script>
  import ProgressBar from "./ProgressBar.svelte";
  import { allClasses } from "../config"

  export let prediction;
</script>

<div>
  {#each prediction.values.probs as prob, index}
    <ProgressBar value={prob} max={1} label={`Class ${allClasses[index]}`} />
  {/each}
</div>

<script>
  import ProgressBar from "./ProgressBar.svelte";
  import { allClasses } from "../config"

  export let probabilities;
</script>

<div class="bg-slate-200 p-2">
  {#each probabilities as prob, index}
    <ProgressBar value={prob} max={1} label={`Class ${allClasses[index]}`} />
  {/each}
</div>

<script>
  import DocPopover from '../documentation/DocPopover.svelte';

    export let prediction;
    export let all_classes;
    export let trustscore;
    // Assume a ProgressBar component exists or you can create one
    import ProgressBar from './ProgressBar.svelte';
  import TrustScoreVisualization from './TrustScoreVisualization.svelte';
  </script>
  
  <div>
    <h2>Prediction: {prediction.values.prediction}</h2>
    <div class="grid grid-cols-2 gap-6 m-2 mb-6">
      <div class="relative">
        {#each prediction.values.probs as prob, index}
          <DocPopover id={`Prediction probability class ${all_classes[index]}`}/>
          <ProgressBar value={prob} max={1} label={`Class ${all_classes[index]}`} />
        {/each}
      </div>
      <div class="relative">
        <DocPopover id="Prediction trustscore"/>
        <TrustScoreVisualization trustScoreData={trustscore} />
      </div>

    </div>
  </div>
  
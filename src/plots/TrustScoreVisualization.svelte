<script>
  export let trustScoreData;

  const high_threshold = 75
  const medium_threshold = 30

  function getWarningText() {
    if (trustScoreData.percentile >= high_threshold) {
        return "high trust"
    } else if (trustScoreData.percentile >= medium_threshold) {
        return "medium trust"
    } else {
        return "low trust"
    }
  }
</script>

<div>
  <h3 class="mb-2">
    Trustscore: {trustScoreData.score.toFixed(3)} (Closest Class: {trustScoreData.neighbour})
  </h3>
  <div class="progress-bar-container">
    <div
      class="progress-bar flex justify-center items-center {trustScoreData.percentile >= high_threshold
        ? 'bg-positive'
        : trustScoreData.percentile >= medium_threshold
          ? 'bg-neutral'
          : 'bg-negative'}"
      style="width: {trustScoreData.percentile < 100 ? trustScoreData.percentile : 100}%;"
    >
      <p>{getWarningText()}</p>
    </div>
  </div>
  {#if trustScoreData.extreme}
    <div class="flex content-center text-destructive">
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="extreme-svg"
        ><circle cx="12" cy="12" r="10"></circle><line
          x1="12"
          y1="8"
          x2="12"
          y2="12"
        ></line><line x1="12" y1="16" x2="12" y2="16"></line></svg
      >
      <span
        >Warning: This datapoint is considered extreme, i.e. shows an unusual trust value</span
      >
    </div>
  {/if}
</div>

<style>
  .progress-bar-container {
    width: 100%;
    background-color: #eee;
    border-radius: 8px;
  }

  .progress-bar {
    height: 40px;
    border-radius: 8px;
    transition: width 0.5s ease-in-out;
  }

  .extreme-svg {
    margin-right: 5px;
  }
</style>

<script>
    // Props for the progress value, max value, and the label
    export let value = 0;
    export let max = 1;
    export let label = "";
  </script>
  
  <style>
  
    .label {
      margin-bottom: 5px;
      font-size: 14px;
    }
  </style>
  
  <div>
    <div class="label">{label} ({(value * 100).toFixed(2)}%)</div>
    <div class="w-full bg-muted overflow-hidden rounded">
      <div class="h-8 bg-secondary w-0 rounded transition ease-in-out delay-150" style="width: {Math.min((value / max) * 100, 100)}%;">
      </div>
    </div>
  </div>
  
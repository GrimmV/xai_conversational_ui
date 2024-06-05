<script>
  import { getContext } from "svelte";

  const { xScale } = getContext("LayerCake");

  export let dataValue;
</script>

<div class="tick-mark w-full h-9">
  <p style:left="{$xScale(dataValue)}%">{dataValue.toFixed(4)}</p>
</div>

<style>
  div {
    position: relative;
  }
  div p {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
  }
</style>

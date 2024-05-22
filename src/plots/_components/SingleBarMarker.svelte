<script>
  import { getContext } from "svelte";

  const { xScale } = getContext("LayerCake");

  export let fill = "black";
  export let height = "50px";
  export let width = 1;
  export let dataValue;
</script>

<g class="column-group">
  <rect x={$xScale(dataValue)} {fill} {height} {width} />
</g>

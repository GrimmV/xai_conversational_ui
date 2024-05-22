<script>
  import { LayerCake, ScaledSvg, Html } from "layercake";

  import Line from "./_components/Line.svelte";
  import Area from "./_components/Area.svelte";
  import SingleBarMarker from "./_components/SingleBarMarker.svelte";
  import TabNav from "../navs/TabNav.svelte";

  export let data;
  export let domain;
  export let yDomain = [null, null];
  export let xKey;
  export let yKey;
  export let dataValue;
  export let variableDataValue;

  export let choice = "smoothed"

  data.forEach((d) => {
    d[yKey] = +d[yKey];
  });
</script>

<div class="chart-container">
  <LayerCake
    ssr
    percentRange
    padding={{ top: 5, right: 5, bottom: 5, left: 5 }}
    x={xKey}
    y={yKey}
    xDomain={domain}
    {yDomain}
    {data}
  >
    <ScaledSvg>
      <Line />
      <Area flipAtZero/>
      <SingleBarMarker {dataValue} width={0.5} height="100%" />
      <SingleBarMarker dataValue={variableDataValue} fill="green" width={0.5} height="100%" />
    </ScaledSvg>
  </LayerCake>
</div>

<TabNav options={["real", "smoothed"]} bind:state={choice}/>

<style>
  /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
  .chart-container {
    width: 100%;
    height: 80px;
  }
</style>

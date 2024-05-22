<script>
  import { LayerCake, Svg, bin } from "layercake";

  import { scaleBand } from "d3-scale";

  import Column from "./_components/Column.svelte";

  import calcThresholds from "./_modules/calcThresholds.js";

  export let data;
  export let domain;
  export let subData;

  $: internalDomain = domain ? domain : [0, 1];

  const xKey = ["x0", "x1"];
  const yKey = "length";

  let binCount = 60;

  $: thresholds = calcThresholds(internalDomain, binCount);

  $: binnedData = bin(data, (d) => d, {
    internalDomain,
    thresholds,
  });

  $: binnedSubData = bin(subData, (d) => d, {
    internalDomain,
    thresholds,
  });
</script>

<div class="chart-container">
  <LayerCake
    padding={{ top: 20, right: 5, bottom: 5, left: 5 }}
    x={xKey}
    y={yKey}
    xDomain={thresholds}
    xScale={scaleBand().paddingInner(0)}
    yDomain={[0, null]}
    data={binnedData}
  >
    <Svg>
      <Column fill="#f93" strokeWidth={0} />
      <Column subData={binnedSubData} fill="#39e" strokeWidth={0} />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 50px;
  }
</style>

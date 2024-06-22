<script>
  import { LayerCake, Svg, bin, takeEvery } from "layercake";

  import { scaleBand } from "d3-scale";
  import { format } from "d3-format";

  import Column from "./_components/Column.svelte";
  import AxisX from "./_components/AxisX.percent-range.html.svelte";
  import AxisY from "./_components/AxisY.percent-range.html.svelte";

  import calcThresholds from "./_modules/calcThresholds.js";

  export let data;
  export let domain;
  export let title = "";

  $: console.log(data)

  const f = format(".2f");

  const xKey = ["x0", "x1"];
  const yKey = "length";

  let binCount = 60;

  $: thresholds = calcThresholds(domain, binCount);
  $: slimThresholds = takeEvery(thresholds, 5);

  $: binnedData = bin(data, (d) => d, {
    domain,
    thresholds,
  });
</script>

{#if data.length > 0}
  <div class="flex flex-col items-center">
    <h3>{title}</h3>
    <div class="chart-container">
      <LayerCake
        padding={{ top: 20, right: 5, bottom: 20, left: 30 }}
        x={xKey}
        y={yKey}
        xDomain={thresholds}
        xScale={scaleBand().paddingInner(0)}
        yDomain={[0, null]}
        data={binnedData}
      >
        <Svg>
          <AxisX
            gridlines={false}
            baseline
            ticks={slimThresholds}
            format={(d) => +f(d)}
          />
          <AxisY gridlines={false} ticks={3} />
          <Column fill="#f93" strokeWidth={0} />
        </Svg>
      </LayerCake>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center">
    <p class="text-4xl">No Predictions</p>
  </div>
{/if}

<style>
  .chart-container {
    width: 100%;
    height: 250px;
  }
</style>

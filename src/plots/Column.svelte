<script>
  import { LayerCake, ScaledSvg, Html, Svg } from "layercake";
  import { scaleBand } from "d3-scale";

  import Column from "./_components/Column.svelte";
  import AxisX from "./_components/AxisX.percent-range.html.svelte";
  import AxisY from "./_components/AxisY.percent-range.html.svelte";
  import Annotations from "./_components/Annotations.svelte";
  import ArrowheadMarker from "./_components/ArrowheadMarker.svelte";
  import Arrows from "./_components/Arrows.svelte";

  export let data = [];
  export let title = "";

  $: console.log(data);

  export let xKey = "feature";
  export let yKey = "shapSum";
  export let order = true;

  // Use a reactive declaration to sort data
  let sortedData = [];
  // Your sorted data as before
  $: sortedData = order
    ? [...data].sort((a, b) => b[yKey] - a[yKey])
    : [...data];

  // Extract the featureNames in sorted order for the xScale domain
  $: sortedFeatureNames = sortedData.map((d) => d[xKey]);

  // Define your xScale with the sorted domain
  $: xScale = scaleBand()
    .domain(sortedFeatureNames)
    .paddingInner(0.028)
    .round(true);

  const annotations = [
    {
      text: "On average, these are the most influential features",
      top: "5%",
      left: "30%",
      arrows: [
        {
          clockwise: false, // true or false, defaults to true
          source: {
            anchor: "left-bottom", // can be `{left, middle, right},{top-middle-bottom}`
            dx: -10,
            dy: -20,
          },
          target: {
            x: "11%",
            y: "5%",
          },
        },
        {
          clockwise: false,
          source: {
            anchor: "left-bottom",
            dy: -7,
            dx: -5,
          },
          target: {
            x: "15%",
            y: "22%",
          },
        },
      ],
    },
  ];
</script>

<h3>{title}</h3>
<div class="chart-container">
  <LayerCake
    ssr
    percentRange
    padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
    x={xKey}
    y={yKey}
    {xScale}
    xDomain={sortedFeatureNames}
    yDomain={[0, null]}
    data={sortedData}
  >
    <ScaledSvg>
      <Column strokeWidth={2} />
    </ScaledSvg>

    <Html>
      <Annotations {annotations} />
      <AxisX gridlines={false} rotation={45} />
      <AxisY ticks={4} gridlines={false} />
    </Html>

    <Svg>
      <ArrowheadMarker />
      <Arrows {annotations} />
    </Svg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
    position: relative;
  }
</style>

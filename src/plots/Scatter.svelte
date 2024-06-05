<script>
  import { LayerCake, Html } from "layercake";
  import Scatter from "./_components/Scatter.html.svelte";
  import AxisX from "./_components/AxisX.percent-range.html.svelte";
  import AxisY from "./_components/AxisY.percent-range.html.svelte";
  import { extent } from "d3";
  import { allClasses, allFeatures } from "../config";
  import TabNav from "../components/Navigation/TabNav.svelte";

  let coloring = {
    "3": "#8B0000",
    "4": "#00008B",
    "5": "#006400",
    "6": "#800080",
    "7": "#654321",
    "8": "#404040",
  };

  export let datapoints;
  export let xKey;
  export let yKey;
  export let title;
  export let state = "all";
  export let colorKey = "pred";
  export let label = "quality";

  let variableXkey = xKey;
  let variableYkey = yKey;
  let variableState = state;

  const predictions = datapoints.map((v) => {
    return { value: v.values[label], index: v.index };
  });

  function transformData(dataArray, state) {
    if (state === "all") {
      return dataArray.map((entry) => {
        let pred = predictions.find((v) => v.index === entry.index);
        return { ...entry.values, pred: pred.value };
      });
    } else {
      let filtered_preds = predictions.filter(
        (v) => v.value.toString() === state
      );
      return filtered_preds.map((v) => {
        let entry = dataArray[v.index];
        return { ...entry.values, pred: v.value };
      });
    }
  }

  const allData = transformData(datapoints, "all");

  $: data = transformData(datapoints, variableState);

  // Convert numeric values to numbers
  $: data.forEach((d) => {
    d[variableYkey] = +d[variableYkey];
  });

  const r = 3;
  const padding = 1;
  const fill = "#ffffff00";
  const strokeWidth = 1;
  $: xDomain = extent(allData.map((v) => v[variableXkey]));
  $: yDomain = extent(allData.map((v) => v[variableYkey]));

  // Generate color mapping for the categorical dimension
  $: categoryColors = data.reduce((acc, d) => {
    if (!acc[d[colorKey]]) {
      acc[d[colorKey]] = coloring[d[colorKey]];
    }
    return acc;
  }, {});
</script>

<div class="w-96 h-96">
  <h3>{title}</h3>
  <div class="flex gap-2 m-2">
    <TabNav
      options={allClasses.concat("all")}
      label="Focus Class"
      bind:selected={variableState}
    />
    <TabNav
      options={allFeatures}
      label="X-Feature"
      bind:selected={variableXkey}
    />
    <TabNav
      options={allFeatures}
      label="Y-Feature"
      bind:selected={variableYkey}
    />
  </div>
  <div class="chart-container">
    <LayerCake
      ssr
      percentRange
      padding={{ top: 10, right: 5, bottom: 20, left: 25 }}
      x={variableXkey}
      y={variableYkey}
      {xDomain}
      {yDomain}
      xPadding={[padding, padding]}
      yPadding={[padding, padding]}
      {data}
    >
      <Html>
        <AxisX />
        <AxisY />
        <Scatter {r} {fill} {strokeWidth} {categoryColors} {colorKey} />
      </Html>
    </LayerCake>
  </div>
</div>

<style>
  /*
      The wrapper div needs to have an explicit width and height in CSS.
      It can also be a flexbox child or CSS grid element.
      The point being it needs dimensions since the <LayerCake> element will
      expand to fill it.
    */
  .chart-container {
    width: 100%;
    height: 250px;
  }
</style>

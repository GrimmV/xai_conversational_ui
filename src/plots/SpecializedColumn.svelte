<script>
    import { LayerCake, ScaledSvg, Html, Svg } from "layercake";
    import { scaleBand } from "d3-scale";
  
    import Column from "./_components/Column.svelte";
    import AxisX from "./_components/AxisX.percent-range.html.svelte";
    import AxisY from "./_components/AxisY.percent-range.html.svelte";
  
    export let data = [];
    export let title = "";
    export let featureOrder = [];
    export let yDomain = [0, null];
  
    export let xKey = "feature";
    export let yKey = "value";
  
    // Define your xScale with the sorted domain
    $: xScale = scaleBand()
      .domain(featureOrder)
      .paddingInner(0.028)
      .round(true);

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
      xDomain={featureOrder}
      yDomain={yDomain}
      data={data}
    >
      <ScaledSvg>
        <Column strokeWidth={2} />
      </ScaledSvg>
  
      <Html>
        <AxisX gridlines={false} rotation={45} />
        <AxisY ticks={4} gridlines={false} />
      </Html>
    </LayerCake>
  </div>
  
  <style>
    .chart-container {
      width: 100%;
      height: 400px;
      position: relative;
    }
  </style>
  
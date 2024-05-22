<script>
  import { LayerCake, ScaledSvg, Html } from "layercake";
  import { scaleBand, scaleLinear } from "d3-scale";
  import { format } from "d3-format";

  import AxisX from "./_components/AxisX.percent-range.html.svelte";
  import AxisY from "./_components/AxisY.percent-range.html.svelte";
  import Confusion from "./_components/Confusion.svelte";

  export let data;
  export let props = {
    title: "",
    xKey: "predicted",
    yKey: "actual",
    zKey: "count",
  };

  export let xLabelRotation = 0;

  const f = format(".2f");

  let maxCount = Math.max(...data.map((d) => d[props.zKey]));
  let colorScale = scaleLinear()
    .domain([0, maxCount])
    .range(["#a55", "#69b3a2"]);

  const n_cols = Math.sqrt(data.length);
</script>

<div class="relative flex flex-col justify-center items-center">
  <h3>{props.title}</h3>
  <div class="chart-container">
    <LayerCake
      ssr
      percentRange
      padding={{ top: 10, right: 5, bottom: 20, left: 30 }}
      x={props.xKey}
      y={props.yKey}
      z={props.zKey}
      xScale={scaleBand().paddingInner(0)}
      yScale={scaleBand().paddingInner(0)}
      {data}
    >
      <Html>
        <AxisX gridlines={false} ticks={n_cols} rotation={xLabelRotation} />
        <AxisY gridlines={false} ticks={n_cols} />
      </Html>
      <ScaledSvg>
        <Confusion strokeWidth={0} {colorScale} />
      </ScaledSvg>
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
    width: 400px;
    height: 400px;
  }
</style>

<script>
  import { LayerCake, ScaledSvg, Html, flatten } from "layercake";
  import { scaleOrdinal } from "d3-scale";
  import { format } from "d3-format";

  import MultiLine from "./_components/MultiLine.svelte";
  import AxisX from "./_components/AxisX.percent-range.html.svelte";
  import AxisY from "./_components/AxisY.percent-range.html.svelte";
  import GroupLabels from "./_components/GroupLabels.html.svelte";
  import SharedTooltip from "./_components/SharedTooltip.percent-range.html.svelte";

  export let data;
  export let title;

  const xKey = "n";
  const yKey = "score";
  const zKey = "type";


  const seriesColors = ["#00e4b8", "#ff00cc"];
  const formatLabelY = (d) => format(".0%")(d);
  const formatLabelX = (d) => parseInt(d);
</script>

<div class="flex flex-col items-center relative">
  <h3>{title}</h3>
  <div class="chart-container mt-5">
    <LayerCake
      ssr
      percentRange
      padding={{ top: 7, right: 10, bottom: 20, left: 25 }}
      x={xKey}
      y={yKey}
      z={zKey}
      zScale={scaleOrdinal()}
      zRange={seriesColors}
      flatData={flatten(data, "values")}
      yDomain={[0, null]}
      {data}
    >
      <Html>
        <AxisX
          gridlines={false}
          ticks={data
            .flatMap((d) => d.values.map((v) => v[xKey]))
            .sort((a, b) => a - b)}
          format={formatLabelX}
          tickMarks
        />
        <AxisY format={formatLabelY} />
      </Html>

      <ScaledSvg>
        <MultiLine />
      </ScaledSvg>
      <Html>
        <GroupLabels />
        <SharedTooltip formatTitle={(d) => "# samples: " + parseInt(d)} dataset={data} />
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
    width: 500px;
    height: 250px;
  }
</style>

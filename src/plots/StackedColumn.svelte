<script>
  import { LayerCake, ScaledSvg, Html, flatten } from 'layercake';
  import { stack } from 'd3-shape';
  import { scaleBand, scaleOrdinal } from 'd3-scale';
  import { format } from 'd3-format';

  import ColumnStacked from './_components/ColumnStacked.svelte';
  import AxisX from './_components/AxisX.percent-range.html.svelte';
  import AxisY from './_components/AxisY.percent-range.html.svelte';
  import generateColorScale from './_modules/generateColorScale';

  export let data;
  export let xKey;

  export let yKey = [0, 1];
  const zKey = 'value';

  $: seriesNames = Object.keys(data[0]).filter(d => d !== xKey);
  let seriesColors = generateColorScale(data.length)

  $: data.forEach(d => {
    seriesNames.forEach(name => {
      d[name] = +d[name];
    });
  });

  $: stackData = stack()
    .keys(seriesNames);

  $: series = stackData(data);
  $: console.log(series[series.length-1].map(v => v[1]).sort((a, b) => b - a))

  const formatLabelY = d => format(`~s`)(d);
</script>

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

<div class="flex flex-col items-center w-11/12">
  <div class="chart-container">
    <LayerCake
      ssr
      percentRange
      padding={{ top: 0, right: 0, bottom: 20, left: 20 }}
      x={d => d.data[xKey]}
      y={yKey}
      z={zKey}
      xScale={scaleBand().paddingInner(0.028).round(true)}
      xDomainSort={true}
      zScale={scaleOrdinal()}
      zDomain={seriesNames}
      zRange={seriesColors}
      flatData={flatten(series)}
      data={series}
    >
      <Html>
        <AxisX
          gridlines={false}
          rotation={45}
        />
        <AxisY
          ticks={4}
          gridlines={false}
          format={formatLabelY}
        />
      </Html>
      <ScaledSvg>
        <ColumnStacked/>
      </ScaledSvg>
    </LayerCake>
  </div>
</div>
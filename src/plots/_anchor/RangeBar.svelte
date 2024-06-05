<script>
  import { scaleLinear } from 'd3-scale';


  import {LayerCake, ScaledSvg, Html} from 'layercake';
  import AxisX from '../_components/AxisX.percent-range.html.svelte';
  import SingleBar from '../_components/SingleBar.svelte';
  import SingleBarMarker from '../_components/SingleBarMarker.svelte';
  import SingleBarMarkerText from '../_components/SingleBarMarkerText.svelte';

  export let domain;
  export let lowerBound;
  export let upperBound
  export let dataValue;

  $: console.log(lowerBound)
  $: console.log(upperBound)

</script>

<div class="chart-container">
  <LayerCake
    ssr
    percentRange
    padding={{ top: 5, right: 5, bottom: 5, left: 5 }}
    xDomain={domain}
    xScale={scaleLinear()}
    data={{lowerBound: lowerBound, upperBound: upperBound, dataValue: dataValue}}
  >
    <Html zIndex=0>
      <AxisX/>
      <SingleBarMarkerText {dataValue}/>
    </Html>
    <ScaledSvg>
      <SingleBar/>
      <SingleBarMarker {dataValue}/>
    </ScaledSvg>
  </LayerCake>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 40px;
  }
</style>
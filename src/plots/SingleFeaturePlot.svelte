<script>
  import RangeBar from "../plots/_anchor/RangeBar.svelte";
  import DistributionPlot from "../plots/DistributionPlot.svelte";
  import LineAreaPlot from "../plots/LineAreaPlot.svelte";
  import { extent } from "d3";
  import { allClasses, allFeatures } from "../config";
  import { Select } from "bits-ui";
  import TabNav from "../components/Navigation/TabNav.svelte";

  export let feature;
  export let activeClass;
  export let calcAnchorBound;
  export let calcDatapointValue;
  export let density;
  export let calcClassShaps;
  export let calcFeatureShap;
  export let calcPredictionIndexes;
  export let calcFeatureDataStats;
  export let showDistribution;
  export let showPartialDependence;
  export let showShapValue;

  $: movingAverageNumber = 50;

  const y_shap_pd = "shap_value";
  const x_shap_pd = "feature_value";

  let selectedClass = activeClass;
  let selectedFeature = feature;

  $: lowerBound = calcAnchorBound(selectedFeature, "lower_bound");
  $: upperBound = calcAnchorBound(selectedFeature, "upper_bound");
  $: classShaps = calcClassShaps(selectedClass);
  $: featureShap = calcFeatureShap(selectedFeature, selectedClass);
  $: predictionIndexes = calcPredictionIndexes(selectedClass);
  $: dataValue = calcDatapointValue(selectedFeature);
  $: dataStats = calcFeatureDataStats(selectedFeature);

  $: console.log(lowerBound);
  $: console.log(upperBound);

  $: subdata = predictionIndexes
    .map((index) => density[index])
    .map((v) => v[selectedFeature]);

  // Define min and max within a reactive statement
  $: domain = null;
  $: yDomain = null;
  $: if (Object.keys(dataStats).length !== 0) {
    domain = [dataStats.statistics.min, dataStats.statistics.max];
    yDomain = extent(classShaps.map((v) => v[selectedFeature]));
  }

  $: prepLineplotData = (feature) => {
    const preppedData = [];

    if (classShaps.length > 0) {
      classShaps.forEach((element, index) => {
        preppedData[index] = {
          [x_shap_pd]: density[index][feature],
          [y_shap_pd]: element[feature],
        };
      });
    }

    preppedData.sort((a, b) => a[x_shap_pd] - b[x_shap_pd]);

    const smoothedData = movingAverage(preppedData, movingAverageNumber);

    return smoothedData;
  };

  function movingAverage(data, windowSize) {
    const result = [];

    for (let i = 0; i < data.length; i++) {
      let sum = 0;
      let count = 0;
      for (
        let j = Math.max(0, i - windowSize);
        j < Math.min(data.length, i + windowSize + 1);
        j++
      ) {
        sum += data[j][y_shap_pd];
        count++;
      }
      const avg = sum / count;
      result.push({
        [x_shap_pd]: data[i][x_shap_pd],
        [y_shap_pd]: avg,
      });
    }

    return result;
  }

  const updateFocusClass = () => {
    console.log("updated");
  };
</script>

<div class="p-8 m-2 bg-muted shadow rounded relative">
  <div class="flex gap-2">
    <TabNav
      options={allClasses}
      label="Focus Class"
      bind:selected={selectedClass}
    />
    <TabNav
      options={allFeatures}
      label="Focus Feature"
      bind:selected={selectedFeature}
    />
  </div>
  <div class="flex gap-4 mt-4">
    <div class="flex flex-col items-center h-auto w-64">
      <RangeBar {domain} {upperBound} {lowerBound} {dataValue} />

      {#if showDistribution}
        <DistributionPlot
          data={density.map((v) => v[selectedFeature])}
          {domain}
          subData={subdata}
        />
      {/if}
      {#if showPartialDependence}
        <LineAreaPlot
          data={prepLineplotData(selectedFeature)}
          {domain}
          {yDomain}
          {dataValue}
          xKey={x_shap_pd}
          yKey={y_shap_pd}
        />
      {/if}
    </div>
    {#if showShapValue}
      <div class="w-24">
        <p class="text-center">
          Feature Importance: {(featureShap * 100).toFixed(2)}
        </p>
      </div>
    {/if}
  </div>
</div>

<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { allClasses, allFeatures } from "../../config";
  import SingleFeaturePlot from "../../plots/SingleFeaturePlot.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";
  import DocPopover from "../documentation/DocPopover.svelte";

  export let density;
  export let shapValues;
  export let anchor;
  export let predictions;
  export let index;
  export let feature;
  export let datapoints;
  export let featureStats;
  export let activeClass;
  export let showDistribution = true;
  export let showShapValue = true;
  export let showPartialDependence = true;

  console.log(shapValues)

  let activeFeature = feature === "auto" ? "alcohol" : feature; 
  let tmpActiveClass = activeClass === "auto" ? "5" : activeClass;

  const getAnchorBound = (feature, key = "lower_bound") => {
    const anchor_tmp = anchor.find((v) => v.value === feature);
    if (!anchor_tmp) return null;
    else return anchor_tmp[key];
  };

  const calcFeatureShap = (feature, activeClass) => {
    return shapValues.find((v) => {
      return v.index === index && v.class.toString() === activeClass;
    }).values[feature];
  };

  const calcClassShaps = (activeClass) =>
    shapValues
      .filter((v) => v.class.toString() === activeClass)
      .map((v) => v.values);

  const calcPredictionIndexes = (activeClass) => {
    return predictions.values
      .filter((v) => v.prediction.toString() === activeClass)
      .map((v) => v.index);
  };

  const getDatapointValue = (feature) => {
    return datapoints[index].values[feature];
  };

  const getFeatureDataStats = (feature) => {
    return featureStats.find((v) => v.name === feature);
  };
  const handleReset = () => {
    activeFeature = feature;
    tmpActiveClass = activeClass;
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 relative">
      <Button on:click={handleReset}
        ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
      >
      <SingleDropdown
        items={[...allClasses]}
        bind:value={tmpActiveClass}
        title={"Class"}
        instruction={"Choose class"}
      />
      <SingleDropdown
        items={[...allFeatures]}
        bind:value={activeFeature}
        title={"Feature"}
        instruction={"Choose feature"}
      />
      <DocPopover id={`Context_${tmpActiveClass}_${activeFeature}`}/>
    </div>
  </div>
  <SingleFeaturePlot
    feature={activeFeature}
    calcAnchorBound={getAnchorBound}
    {density}
    {calcClassShaps}
    {calcFeatureShap}
    {calcPredictionIndexes}
    calcDatapointValue={getDatapointValue}
    calcFeatureDataStats={getFeatureDataStats}
    activeClass={tmpActiveClass}
    {showDistribution}
    {showShapValue}
    {showPartialDependence}
  />
</div>

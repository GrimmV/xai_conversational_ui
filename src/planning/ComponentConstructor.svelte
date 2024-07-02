<script>
  import { getContext } from "svelte";
  import Textbox from "../components/Textbox.svelte";
  import Scatter from "../plots/Scatter.svelte";
  import ProgressBars from "../plots/ProgressBars.svelte";
  import TrustScoreVisualization from "../plots/TrustScoreVisualization.svelte";
  import FeatureRelevance from "../components/Interactives/FeatureRelevance.svelte";
  import ConfusionMatrix from "../components/Interactives/ConfusionMatrix.svelte";
  import CorrelationMatrix from "../components/Interactives/CorrelationMatrix.svelte";
  import LearningCurves from "../components/Interactives/LearningCurves.svelte";
  import Statistics from "../components/Interactives/Statistics.svelte";
  import { allFeatures } from "../config";
  import Histogram from "../components/Interactives/Histogram.svelte";
  import Datapoint from "../components/Interactives/Datapoint.svelte";
  import Context from "../components/Interactives/Context.svelte";

  // Retrieve user store from context
  const data = getContext("data");

  const getPredConfusionMatrices = () =>
    data.modelPerformance.confusion_matrices;
  const getFeatureCorrelation = () => {
    return data.featureCorrelation;
  };
  const getLearningCurves = () => {
    return data.modelPerformance.learning_curve;
  };
  const getShapGlobalImportance = () => {
    return data.shapGlobalImportance;
  };

  const getStatistics = () => {
    return data.statistics;
  };

  const getTestInteractions = () => {
    return data.datapointsTest;
  };

  const getDatapoint = () => {
    return data.datapoint.values.values;
  };

  const getPrediction = () => {
    return data.singlePred.values.prediction;
  };
  const getProbabilities = () => {
    return data.singlePred.values.probs;
  };

  const getSingleShap = () => {
    return data.singleShap;
  };

  const getSingleTrustscore = () => {
    return data.singleTrustscore;
  };

  const getAllDensity = () => {
    return data.allDensity;
  };

  const getDatapointValue = (feature) => {
    return data.datapoint.values.values[feature];
  };

  const getFeatureDataStats = (feature) => {
    return data.featureStats.find((v) => v.name === feature);
  };

  export let component = "";
  export let title = "";
  export let dataParams = {};
</script>

<div class="m-6">
  {#if component === "textbox"}
    <Textbox {dataParams} />
  {:else if component === "confusion matrix"}
    <ConfusionMatrix data={getPredConfusionMatrices()} type={dataParams.kind} />
  {:else if component === "correlation"}
    <CorrelationMatrix data={getFeatureCorrelation()} />
  {:else if component === "learning curve"}
    <LearningCurves data={getLearningCurves()} types={dataParams.kinds} />
  {:else if component === "feature relevance"}
    <FeatureRelevance
      data={getShapGlobalImportance()}
      initialActiveClass={dataParams.class}
    />
  {:else if component === "statistics"}
    <Statistics
      data={getStatistics()}
      type={dataParams.type}
      feature={dataParams.feature_list === "all"
        ? allFeatures[0]
        : dataParams.feature_list[0]}
      activeClass={dataParams.class_list === "all"
        ? "all"
        : dataParams.class_list[0]}
    />
  {:else if component === "distribution"}
    <Histogram
      data={data.density}
      feature={dataParams.feature}
      activeClass={dataParams.activeClass}
      kind={dataParams.kind}
    />
  {:else if component === "interactionScatter"}
    <Scatter
      {title}
      datapoints={getTestInteractions()}
      xKey={dataParams.feature1}
      yKey={dataParams.feature2}
      state={dataParams.class}
    />
  {:else if component === "datapoint"}
    <Datapoint
      datapoint={getDatapoint()}
      prediction={getPrediction()}      
      shapValues={getSingleShap().find(
        (v) => v.class === getPrediction()
      ).values}
      hideImpact={dataParams.hideImpact}
    />
  {:else if component === "probabilities"}
    <ProgressBars probabilities={getProbabilities()} />
  {:else if component === "trustscore"}
    <TrustScoreVisualization trustScoreData={getSingleTrustscore()} />
  {:else if component === "context"}
  <Context
      density={getAllDensity()}
      shapValues={data.shaps}
      anchor={data.singleAnchor.anchor}
      predictions={data.predictions}
      index={data.index}
      feature={dataParams.feature}
      datapoints={data.datapointsTest}
      featureStats={data.featureStats}
      activeClass={dataParams.class}
      showDistribution={dataParams.showDistribution}
      showShapValue={dataParams.showShapValue}
      showPartialDependence={dataParams.showPartialDependence}
  />
  {/if}
</div>

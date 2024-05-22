<script>
  import { getContext } from "svelte";
  import Textbox from "../components/Textbox.svelte";
  import PredConfusionPlot from "../plots/PredConfusionPlot.svelte";
  import MultiLinePlot from "../plots/MultiLinePlot.svelte";
  import Column from "../plots/Column.svelte";
  import FeatureStatistics from "../plots/FeatureStatistics.svelte";
  import HistPlot from "../plots/HistPlot.svelte";
  import Scatter from "../plots/Scatter.svelte";

  // Retrieve user store from context
  const data = getContext("data");

  const getPredConfusionMatrices = ({ type }) =>
    data.modelPerformance.confusion_matrices[type];
  const getFeatureCorrelation = () => {
    return data.featureCorrelation;
  };
  const getLearningCurves = ({ types }) => {
    const learning_curves = [];
    for (let type of types) {
      learning_curves.push(data.modelPerformance.learning_curve[type]);
    }
    return learning_curves;
  };
  const getShapGlobalImportance = () => {
    return data.shapGlobalImportance;
  };

  const getStatistics = () => {
    return data.statistics
  }

  const getTestInteractions = () => {
    return data.testDatapoints
  }

  function transformDensityData(featureKey) {
    const dataDictionary = {};

    densityData = data.density

    for (const [key, value] of Object.entries(densityData)) {
      // Initialize an array for each class, if not already initialized
      if (!dataDictionary[key]) {
        dataDictionary[key] = [];
      }

      // Push the value of the specified feature for each entry into the array
      value.forEach((entry) => {
        if (entry[featureKey] !== undefined) {
          dataDictionary[key].push(entry[featureKey]);
        }
      });
    }

    return dataDictionary;
  }

  export let component = "";
  export let title = "";
  export let dataParams = {};
</script>

{#if component === "textbox"}
  <Textbox {dataParams} />
{:else if component === "predConfMatrix"}
  <PredConfusionPlot
    data={getPredConfusionMatrices(dataParams)}
    props={{ xKey: "actual", yKey: "predicted", zKey: "count", title: title }}
  />
{:else if component === "corrMatrix"}
  <PredConfusionPlot
    data={getFeatureCorrelation()}
    props={{ xKey: "f1", yKey: "f2", zKey: "correlation", title: title }}
    xLabelRotation={45}
  />
{:else if component === "learningCurve"}
  <MultiLinePlot data={getLearningCurves(dataParams)} {title} />
{:else if component === "shapGlobalImportance"}
  <Column data={getShapGlobalImportance()} {title} />
{:else if component === "statistics"}
    <FeatureStatistics
      data={getStatistics()}
      feature={dataParams.feature}
      activeClass={dataParams.activeClass}
    />
{:else if component === "featureDistribution"}
    <HistPlot
      {title}
      data={transformDensityData(density, dataParams.feature)[dataParams.activeClass]}
    />
{:else if component === "interactionScatter"}
    <Scatter
      datapoints={getTestInteractions()}
      xKey={dataParams.feature1}
      yKey={dataParams.feature2}
      state={dataParams.class}
    />
{/if}

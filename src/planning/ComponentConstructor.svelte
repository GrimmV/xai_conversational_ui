<script>
  import { getContext } from "svelte";
  import Textbox from "../components/Textbox.svelte";
  import PredConfusionPlot from "../plots/PredConfusionPlot.svelte";
  import MultiLinePlot from "../plots/MultiLinePlot.svelte";
  import Column from "../plots/Column.svelte";
  import FeatureStatistics from "../plots/FeatureStatistics.svelte";
  import HistPlot from "../plots/HistPlot.svelte";
  import Scatter from "../plots/Scatter.svelte";
  import DatapointTableAndShap from "../plots/DatapointTableAndShap.svelte";
  import ProgressBars from "../plots/ProgressBars.svelte";
  import TrustScoreVisualization from "../plots/TrustScoreVisualization.svelte";
  import SingleFeaturePlot from "../plots/SingleFeaturePlot.svelte";

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
    return data.statistics;
  };

  const getTestInteractions = () => {
    return data.datapointsTest;
  };

  const getDatapoint = () => {
    return data.datapoint;
  };

  const getPrediction = () => {
    return data.singlePred;
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

  function transformDensityData(featureKey) {
    const dataDictionary = {};

    const densityData = data.density;

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
  const getAnchorBound = (feature, key = "lower_bound") => {
    const anchor_tmp = data.singleAnchor.anchor.find(
      (v) => v.value === feature
    );
    if (!anchor_tmp) return null;
    else return anchor_tmp[key];
  };

  const calcFeatureShap = (feature, activeClass) => {
    return data.shaps.find((v) => {
      return v.index === data.index && v.class.toString() === activeClass;
    }).values[feature];
  };

  const calcClassShaps = (activeClass) =>
    data.shaps
      .filter((v) => v.class.toString() === activeClass)
      .map((v) => v.values);

  const calcPredictionIndexes = (activeClass) => {
    return data.predictions.values
      .filter((v) => v.prediction.toString() === activeClass)
      .map((v) => v.index);
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
    data={transformDensityData(dataParams.feature)[
      dataParams.activeClass
    ]}
  />
{:else if component === "interactionScatter"}
  <Scatter
    {title}
    datapoints={getTestInteractions()}
    xKey={dataParams.feature1}
    yKey={dataParams.feature2}
    state={dataParams.class}
  />
{:else if component === "datapointAndShapTable"}
  <DatapointTableAndShap
    datapoint={getDatapoint()}
    shapValues={getSingleShap().find(
      (v) => v.class === getPrediction().values.prediction
    )}
  />
{:else if component === "predictionProbabilities"}
  <ProgressBars prediction={getPrediction()} />
{:else if component === "trustscore"}
  <TrustScoreVisualization trustScoreData={getSingleTrustscore()} />
{:else if component === "featureContext"}
  <SingleFeaturePlot
    feature={dataParams.feature}
    lowerBound={getAnchorBound(dataParams.feature, "lower_bound")}
    upperBound={getAnchorBound(dataParams.feature, "upper_bound")}
    density={getAllDensity()}
    classShaps={calcClassShaps(dataParams.activeClass)}
    featureShap={calcFeatureShap(dataParams.feature, dataParams.activeClass)}
    predictionIndexes={calcPredictionIndexes(dataParams.activeClass)}
    dataValue={getDatapointValue(dataParams.feature)}
    dataStats={getFeatureDataStats(dataParams.feature)}
    showDistribution={dataParams.showDistribution}
    showShapValue={dataParams.showShapValue}
    showPartialDependence={dataParams.showPartialDependence}
  />
{/if}

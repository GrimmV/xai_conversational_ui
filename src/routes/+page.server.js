import { datapoint_index } from "../config";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const index = datapoint_index;
  const modelPerformanceRaw = await fetch(
    "http://localhost:5000/api/v1/model/scores"
  );
  const featureCorrelationRaw = await fetch(
    "http://localhost:5000/api/v1/data/datapoints/correlation"
  );
  const shapGlobalImportanceRaw = await fetch(
    "http://localhost:5000/api/v1/shap/globalimportance"
  );
  const statisticsRaw = await fetch(
    "http://localhost:5000/api/v1/data/statistics/classbased"
  );
  const densityRaw = await fetch(
    "http://localhost:5000/api/v1/data/density/class"
  );
  const datapointsTestRaw = await fetch(
    "http://localhost:5000/api/v1/data/datapoints/test"
  );
  const datapointRaw = await fetch(
    "http://localhost:5000/api/v1/data/datapoints/test/" + index
  );
  const singlePredRaw = await fetch(
    "http://localhost:5000/api/v1/data/predictions/test/" + index
  );
  const singleShapRaw = await fetch(
    "http://localhost:5000/api/v1/shap/index/" + index
  );
  const singleTrustscoreRaw = await fetch(
    "http://localhost:5000/api/v1/trustscore/" + index
  );
  const predictionsRaw = await fetch(
    "http://localhost:5000/api/v1/data/predictions/test"
  );
  const singleAnchorRaw = await fetch(
    "http://localhost:5000/api/v1/anchor/" + index
  );
  const allDensityRaw = await fetch(
    "http://localhost:5000/api/v1/data/density"
  );
  const shapsRaw = await fetch("http://localhost:5000/api/v1/shaps");
  const featureStatsRaw = await fetch(
    "http://localhost:5000/api/v1/data/feature_stats/full"
  );
  const distributionRaw = await fetch(
    "http://localhost:5001/api/v1/data/distribution/full"
  );

  if (
    !modelPerformanceRaw.ok ||
    !featureCorrelationRaw.ok ||
    !shapGlobalImportanceRaw.ok ||
    !statisticsRaw.ok ||
    !densityRaw.ok ||
    !datapointsTestRaw.ok ||
    !datapointRaw.ok ||
    !singlePredRaw.ok ||
    !singleShapRaw.ok ||
    !singleTrustscoreRaw.ok ||
    !predictionsRaw.ok ||
    !singleAnchorRaw.ok ||
    !allDensityRaw.ok ||
    !shapsRaw.ok ||
    !featureStatsRaw.ok ||
    !distributionRaw.ok
  ) {
    throw new Response("Not Found", { status: 404 });
  }
  const modelPerformance = await modelPerformanceRaw.json();
  const featureCorrelation = await featureCorrelationRaw.json();
  const shapGlobalImportance = await shapGlobalImportanceRaw.json();
  const statistics = await statisticsRaw.json();
  const density = await densityRaw.json();
  const datapointsTest = await datapointsTestRaw.json();
  const datapoint = await datapointRaw.json();
  const singlePred = await singlePredRaw.json();
  const singleShap = await singleShapRaw.json();
  const singleTrustscore = await singleTrustscoreRaw.json();
  const predictions = await predictionsRaw.json();
  const singleAnchor = await singleAnchorRaw.json();
  const allDensity = await allDensityRaw.json();
  const shaps = await shapsRaw.json();
  const featureStats = await featureStatsRaw.json();
  const distribution = await distributionRaw.json();
  return {
    modelPerformance,
    featureCorrelation,
    shapGlobalImportance,
    statistics,
    density,
    datapointsTest,
    datapoint,
    singlePred,
    singleShap,
    singleTrustscore,
    predictions,
    singleAnchor,
    allDensity,
    shaps,
    featureStats,
    distribution,
    index,
  };
}

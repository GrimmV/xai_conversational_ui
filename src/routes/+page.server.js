/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
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
  
  const datapointsTestRaw = await fetch("http://localhost:5000/api/v1/data/datapoints/test");
  if (
    !modelPerformanceRaw.ok ||
    !featureCorrelationRaw.ok ||
    !shapGlobalImportanceRaw.ok ||
    !statisticsRaw.ok ||
    !densityRaw.ok ||
    !datapointsTestRaw.ok
  ) {
    throw new Response("Not Found", { status: 404 });
  }
  const modelPerformance = await modelPerformanceRaw.json();
  const featureCorrelation = await featureCorrelationRaw.json();
  const shapGlobalImportance = await shapGlobalImportanceRaw.json();
  const statistics = await statisticsRaw.json();
  const density = await densityRaw.json();
  const datapointsTest = await datapointsTestRaw.json();
  return {
    modelPerformance,
    featureCorrelation,
    shapGlobalImportance,
    statistics,
    density,
    datapointsTest
  };
}

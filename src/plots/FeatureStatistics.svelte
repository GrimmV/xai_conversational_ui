<script>

  export let data;
  export let feature;
  export let activeClass;

  function calculateAllMetric(metric) {
    let values = [];
    Object.keys(data).forEach((classKey) => {
      if (data[classKey][feature] && data[classKey][feature][metric]) {
        values.push(data[classKey][feature][metric]);
      }
    });
    switch(metric) {
      case "count":
        return values.reduce(function (a, b) {return a + b;}, 0)
      case "max":
        return Math.max(...values)
      case "min":
        return Math.min(...values)
      case "mean":
      case "median":
      case "std":
        return values.reduce(function (a, b) {return a + b;}, 0) / Object.keys(data).length
      default:
        return 0
    }
  }
</script>

<div class="relative">
  <div class="w-full flex mr-24">
    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table
        class="min-w-full divide-y divide-gray-200"
        aria-label={`Statistics for ${feature}`}
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
              >Predicted Score</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Count</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Max</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Mean</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Median</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Min</th
            >
            <th
              scope="col"
              class="px-6 py-3 text-right text-xs font-medium text-black uppercase tracking-wider"
              >Std</th
            >
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr class="hover:cursor-pointer hover:bg-muted">
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >ALL</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("count").toFixed(2)}</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("max").toFixed(2)}</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("mean").toFixed(2)}</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("median").toFixed(2)}</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("min").toFixed(2)}</td
            >
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
              >{calculateAllMetric("std").toFixed(2)}</td
            >
          </tr>
          {#each Object.keys(data) as classKey, index}
            <tr
              class="hover:cursor-pointer hover:bg-muted"
              class:bg-yellow-100={classKey === activeClass}
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >{classKey}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].count).toFixed(2)}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].max).toFixed(2)}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].mean).toFixed(2)}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].median).toFixed(2)}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].min).toFixed(2)}</td
              >
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500"
                >{parseFloat(data[classKey][feature].std).toFixed(2)}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>

<style>
  .bg-yellow-100 {
    background-color: #fefcbf; /* Light yellow background for highlighting */
  }
</style>

<script>
  import { allFeatures } from "../config";
  import { findFirstNonZeroDecimal } from "../utils";

  export let datapoint;
  export let prediction;
  export let shapValues;
  export let hideImpact;

  let features = allFeatures;
  let label_name = "Quality rating";
  let factor = 100;

  const formatDecimal = (value) => {
    const decimality = findFirstNonZeroDecimal(value);
    return value.toFixed(decimality + 3);
  };
</script>

<div class="flex flex-col items-center gap-y-2">
  <table class="bg-card">
    <thead>
      <tr>
        <th class="feature-name"></th>
        {#each features as feature}
          <th class="feature-name">{feature}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="row-name">Values</td>
        {#each features as feature}
          <td
            ><div class="flex items-center justify-center">
              <p>{formatDecimal(datapoint[feature])}</p>
            </div></td
          >
        {/each}
      </tr>
      {#if shapValues && !hideImpact}
        <tr>
          <td class="row-name">Impact</td>
          {#each features as feature}
            <td>
              <div class="flex items-center justify-center gap-x-1">
                {(shapValues[feature] * factor).toFixed(3)}
                {#if shapValues[feature] < 0}
                  <i class="fa-solid fa-arrow-down text-pink-600" />
                {:else if shapValues[feature] === 0}
                  <i class="fa-solid fa-arrow-right text-grey-600" />
                {:else}
                  <i class="fa-solid fa-arrow-up text-green-600" />
                {/if}
              </div>
            </td>
          {/each}
        </tr>
      {/if}
    </tbody>
  </table>
  <div class="flex w-11/12 p-4 justify-center bg-card">
    <p class="font-bold">{label_name}: {prediction}</p>
  </div>
</div>

<style>
  /* Style for the rest of your table */
  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }
  .feature-name {
    vertical-align: bottom;
  }
  .row-name {
    vertical-align: bottom;
    font-weight: bold;
  }
</style>

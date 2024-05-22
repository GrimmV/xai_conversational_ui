<script>
  export let datapoint;
  export let shapValues; // Assuming this is the object containing SHAP values

  let features = Object.keys(datapoint.values.values)
  const factor = 100;
</script>

<style>
  /* Style for the rest of your table */
  td, th {
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

<table>
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
        <td>{datapoint.values.values[feature].toFixed(2)}</td>
      {/each}
    </tr>
    <tr>
      <td class="row-name">Impact</td>
      {#each features as feature}
        <td class="{shapValues.values[feature] <= 0 ? 'bg-positive' : 'bg-negative'}">
          {(shapValues.values[feature] * factor).toFixed(3)}
        </td>
      {/each}
    </tr>
  </tbody>
</table>

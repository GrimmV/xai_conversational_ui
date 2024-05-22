<script>
    import { PUBLIC_LABEL_NAME as label_name } from "$env/static/public";
    export let datapoint;
    export let pred;
  
    let features = Object.keys(datapoint.values.values)
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
        <th class="bg-accent">{label_name} (prediction)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="row-name">Values</td>
        {#each features as feature}
          <td>{datapoint.values.values[feature]}</td>
        {/each}
        <td class="bg-accent">{pred}</td>
      </tr>
    </tbody>
  </table>
  
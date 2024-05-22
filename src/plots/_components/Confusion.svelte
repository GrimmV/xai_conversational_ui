<!--
  @component
  Generates an SVG column chart.
 -->
 <script>
    import { getContext } from 'svelte';
  
    const { data, xGet, yGet, x, yRange, xScale, y, height, zGet, zScale, z } = getContext('LayerCake');
  
    export let colorScale;

    /** @type {String} [stroke='#000'] - The shape's stroke color. */
    export let stroke = '#000';
  
    /** @type {Number} [strokeWidth=0] - The shape's stroke width. */
    export let strokeWidth = 0;
  
    /** @type {Boolean} [false] - Show the numbers for each column */
    export let showLabels = true;

  </script>
  
  <g class="column-group">
    {#each $data as d, i}
      {@const xGot = $xGet(d)}
      {@const yGot = $yGet(d)}
      {@const count = $z(d)}
      {@const width = 90 / Math.sqrt($data.length)}
      {@const height = 90 / Math.sqrt($data.length)}
      <rect
        class='group-rect'
        data-id="{i}"
        x="{xGot}"
        y="{yGot}"
        width="{width}"
        height="{height}"
        fill={colorScale(count)}
        {stroke}
        stroke-width="{strokeWidth}"
      />
      {#if showLabels && count}
        <text x="{xGot + width / 2}" y="{yGot + height / 2}" text-anchor="middle" font-size={24 / Math.sqrt($data.length)}>{count.toFixed(2)}</text>
      {/if}
    {/each}
  </g>

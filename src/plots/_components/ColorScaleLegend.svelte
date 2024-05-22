<script>
  export let colorScale;
  export let maxCount;

  // Decide on the dimensions of your legend
  const width = 20; // Width of the legend bar
  const height = 100; // Height of the legend bar
  const numStops = 10; // Number of gradient stops

  // Generate gradient stops based on the color scale
  const stops = Array.from({ length: numStops }, (_, i) => {
    const value = (maxCount * i) / (numStops - 1);
    const color = colorScale(value);
    return { offset: (i / (numStops - 1)) * 100, color };
  });
</script>

<div class="absolute top-0 right-0">
  <svg {width} {height}>
    <defs>
      <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
        {#each stops as { offset, color }}
          <stop offset={`${offset}%`} stop-color={color} />
        {/each}
      </linearGradient>
    </defs>
  
    <rect x="0" y="0" {width} {height} fill="url(#gradient)" />
  
    <text fill="black" x={width + 5} y={0} alignment-baseline="hanging">{maxCount}</text>
    <text fill="black" x={width + 5} y={height} alignment-baseline="baseline">0</text>
  </svg>

</div>

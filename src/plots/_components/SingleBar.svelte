<script>
  import { getContext } from "svelte";

  const { data, xDomain, xScale } = getContext("LayerCake");

  export let outerFill = "grey";
  export let innerFill = "blue";
  export let height = "30px";

  $: lowerBound = $data["lowerBound"];
  $: upperBound = $data["upperBound"];


  $: computeAnchorWidth = () => {
    let tmpLowerBound = lowerBound ? lowerBound : $xDomain[0];
    let tmpUpperBound = upperBound ? upperBound : $xDomain[1];

    return [tmpLowerBound, tmpUpperBound];
  };

  $: [anchorStart, anchorEnd] = computeAnchorWidth();
</script>


<g class="column-group">
  <rect
    y={10}
    x={$xScale($xDomain[0])}
    class="group-rect"
    width={$xScale($xDomain[1])}
    {height}
    fill={outerFill}
  />
  <rect
    y={10}
    x={$xScale(anchorStart)}
    class="group-rect"
    width={$xScale(anchorEnd) - $xScale(anchorStart)}
    {height}
    fill={innerFill}
  />
</g>

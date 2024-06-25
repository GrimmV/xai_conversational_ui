<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { allClasses } from "../../config";
  import SpecializedColumn from "../../plots/SpecializedColumn.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";
  import { extent } from "d3";

  export let data;
  export let initialActiveClass = "5";

  let xKey = "feature";
  let yKey = "value";

  let activeClass = initialActiveClass;
  let myDataAll = data.map((v) => {
    let sum = 0;
    for (let [key, value] of Object.entries(v)) {
      if (key !== "feature") {
        sum += value;
      }
    }
    return { value: sum, feature: v["feature"] };
  });
  let sortedAll = [...myDataAll].sort((a, b) => b[yKey] - a[yKey])
  let sortedFeatureNames = sortedAll.map((d) => d[xKey]);

  let myData = [];
  $: if (activeClass !== "all") {
    myData = data.map(v => {
      return { value: v[activeClass], feature: v["feature"] };
    });
  } else {
    myData = myDataAll;
  }

  // let yDomain = extent(myDataAll.map(v => v.value))

  const handleReset = () => {
    activeClass = initialActiveClass;
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center">
    <Button on:click={handleReset}
      ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
    >
    <SingleDropdown
      items={[...allClasses, "all"]}
      bind:value={activeClass}
      title={"Class"}
      instruction={"Choose class"}
    />
  </div>
  <SpecializedColumn data={myData} {xKey} {yKey} featureOrder={sortedFeatureNames}/>
</div>

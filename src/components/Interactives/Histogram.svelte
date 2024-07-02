<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { allClasses, allFeatures } from "../../config";
  import HistPlot from "../../plots/HistPlot.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";
  import { extent } from 'd3-array';
  import DocPopover from "../documentation/DocPopover.svelte";

  export let data;
  export let feature = "alcohol";
  export let activeClass = "5";
  export let kind = "train";

  console.log(data);

  let activeClassVar = activeClass;
  let featureVar = feature;
  let kindVar = kind;

  const handleReset = () => {
    activeClassVar = activeClass;
    featureVar = feature;
    kindVar = kind;
  };

  function transformData(data, featureKey) {
    const dataDictionary = {};

    for (const [key, value] of Object.entries(data)) {
      // Initialize an array for each class, if not already initialized
      if (!dataDictionary[key]) {
        dataDictionary[key] = [];
      }

      // Push the value of the specified feature for each entry into the array
      value.forEach((entry) => {
        if (entry[featureKey] !== undefined) {
          dataDictionary[key].push(entry[featureKey]);
        }
      });
    }

    return dataDictionary;
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center relative">
    <Button on:click={handleReset}
      ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
    >
    <SingleDropdown
      items={["train", "test", "full"]}
      bind:value={kindVar}
      title={"Kind of data"}
      instruction={"Choose kind of data"}
    />
    <SingleDropdown
      items={[...allFeatures, "all"]}
      bind:value={featureVar}
      title={"Feature"}
      instruction={"Choose feature"}
    />
    <SingleDropdown
      items={[...allClasses, "all"]}
      bind:value={activeClassVar}
      title={"Class"}
      instruction={"Choose class"}
    />
  </div>
  <DocPopover id={`Histogram_${kindVar}_${featureVar}_${activeClassVar}`}/>
  <HistPlot 
    data={transformData(data, featureVar)[activeClassVar]}
    domain={extent(Object.values(transformData(data, featureVar)).flat())}
  />
</div>

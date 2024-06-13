<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { allClasses, allFeatures } from "../../config";
  import FeatureStatistics from "../../plots/FeatureStatistics.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";

  export let data;
  export let type = "train";
  export let feature = "alcohol";
  export let activeClass = "5";

  let chosenType = type;
  let chosenFeature = feature;
  let chosenClass = activeClass;

  const handleReset = () => {
    chosenFeature = feature;
    chosenClass = activeClass;
    chosenType = type;
  };
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center">
    <Button on:click={handleReset}
      ><i class="fa-solid fa-arrow-rotate-right mr-2"></i>Reset</Button
    >
    <SingleDropdown
      items={["train", "test", "both"]}
      bind:value={chosenType}
      title={"Kind of data"}
      instruction={"Choose data kind"}
    />
    <SingleDropdown
      items={allFeatures}
      bind:value={chosenFeature}
      title={"Focus Feature"}
      instruction={"Choose feature"}
    />
    <SingleDropdown
      items={["all", ...allClasses]}
      bind:value={chosenClass}
      title={"Focus Class"}
      instruction={"Choose class"}
    />
  </div>
  <FeatureStatistics {data} feature={chosenFeature} activeClass={chosenClass} />
</div>

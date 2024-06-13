<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { allClasses } from "../../config";
  import StackedColumn from "../../plots/StackedColumn.svelte";
  import SingleDropdown from "../BasicInteractions/SingleDropdown.svelte";

  export let data;
  export let initialActiveClass = "5";

  let xKey = "feature";

  let activeClass = initialActiveClass;
  let myData = [];
  $: if (activeClass === "all") {
    myData = data;
  } else {
    myData = data.map((v) => {
      return { [activeClass]: v[activeClass], "feature": v["feature"] };
    });
  }

  const handleReset = () => {
    activeClass = initialActiveClass;
  }
</script>

<div class="flex flex-col gap-2">
  <div class="flex gap-2 items-center">
    <Button on:click={handleReset}><i class="fa-solid fa-arrow-rotate-right mr-2" ></i>Reset</Button>
    <SingleDropdown items={[...allClasses, "all"]} bind:value={activeClass} title={"Class"} instruction={"Choose class"}/>
  </div>
  <StackedColumn data={myData} {xKey} />
</div>

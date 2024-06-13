<script>
  import * as Accordion from "$lib/components/ui/accordion/index.js";
  import ComponentConstructor from "../../planning/ComponentConstructor.svelte";
  import Hiding from "../Navigation/Hiding.svelte";

  export let components = [];
  export let isHidden = true;
</script>

<div class="m-2 ml-10">
  {#if isHidden}
    <Hiding title="Visualization of relevant data" bgColor="bg-secondary">
      <div class="gap-2">
        {#each components as component}
          <ComponentConstructor
            dataParams={component.params}
            component={component.component}
          />
        {/each}
      </div>
    </Hiding>
  {:else}
    <div class="gap-2">
      {#each components as component}
        <ComponentConstructor
          dataParams={component.params}
          component={component.component}
        />
      {/each}
    </div>
  {/if}
</div>

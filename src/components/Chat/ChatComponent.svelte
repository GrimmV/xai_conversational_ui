<script>
  import ComponentConstructor from "../../planning/ComponentConstructor.svelte";

  export let components = [];
</script>

<div class="ml-10">
    {#each components as component}
        <ComponentConstructor dataParams={component.dataParams} component={component.component}/>
    {/each}
</div>
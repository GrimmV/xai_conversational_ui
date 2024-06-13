<script>
  import { Toggle } from "$lib/components/ui/toggle/index.js";

  export let text;
  export let isToggled;
</script>

<Toggle aria-label="toggle bold" bind:pressed={isToggled}>
  {#if isToggled}
    <i class="fa-solid fa-eye mr-1" />
  {:else}
    <i class="fa-solid fa-eye-slash mr-1" />
  {/if}
  {text}
</Toggle>

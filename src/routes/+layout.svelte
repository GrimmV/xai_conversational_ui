<script>
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import "../app.pcss";
  import { documentation } from "../store";
</script>

<div class="max-w-[1200px] mx-auto">
  <header class="flex flex-col justify-center items-center">
    <div class="flex gap-x-8 items-center">
      <h1>Conversational XAI System</h1>

      <Drawer.Root direction="left">
        <Drawer.Trigger><Button>Documentation</Button></Drawer.Trigger>
        <Drawer.Content class="w-1/3 h-full bottom-0 right-0">
          <Drawer.Header class="w-full">
            <Drawer.Title>Documentation</Drawer.Title>
            <Drawer.Description
              >Overview of the notes regarding your observations</Drawer.Description
            >
          </Drawer.Header>
          <div class="ml-5">
            {#each Object.keys($documentation) as doc_key}
              <p class="font-semibold mt-4">{doc_key}</p>
              <p class="m-0">{$documentation[doc_key]}</p>
            {/each}
          </div>
        </Drawer.Content>
      </Drawer.Root>
    </div>
  </header>
  <div class="m-4">
    <slot />
  </div>
</div>

<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { documentation } from "../../store";

  export let id;
</script>

<div class="absolute top-0 right-0 z-1000">
  <Popover.Root>
    <Popover.Trigger
      ><Button variant="muted"><i class="fa-solid fa-pen-to-square"></i></Button
      ></Popover.Trigger
    >
    <Popover.Content side="right" align="start" sideOffset={5}>
      <div class="m-2">
        <p class="font-semibold">{id}</p>
        <Label for="documentation">Your observation:</Label>
        <Textarea id="documentation" bind:value={$documentation[id]} />
      </div>
      <div class="w-full">
        <Popover.Close class="w-full"
          ><Button class="w-full" variant="secondary">Done</Button></Popover.Close
        >
      </div>
    </Popover.Content>
  </Popover.Root>
</div>

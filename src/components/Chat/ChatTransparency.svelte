<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import Hiding from "../Navigation/Hiding.svelte";

  export let type = "";
  export let input = "";
  export let explanation = "";
  export let isHidden = true;

  let title = ""

  if (type === "routing") {
    title = "Details category choice"
  } else if (type === "data_choice") {
    title = "Details choice of data"
  }
</script>

<div class="m-2 ml-10">
  {#if isHidden}
    <Hiding title={title}>
      <div class="flex flex-col gap-y-2">
        <span class="mr-auto">{input}</span>
        {#if explanation}
          <div class="flex items-center gap-x-2">
            <Popover.Root>
              <Popover.Trigger asChild let:builder>
                <Button builders={[builder]} class="w-fit"
                  >Why?<i class="fa-solid fa-arrow-pointer ml-3" /></Button
                >
              </Popover.Trigger>
              <Popover.Content class="w-96" side="right" sideOffset={10}>
                <p>{explanation}</p>
              </Popover.Content>
            </Popover.Root>
          </div>
        {/if}
      </div>
    </Hiding>
  {:else}
    <div class="flex gap-2">
      <div class="flex flex-col gap-y-2">
        <span class="mr-auto">{input}</span>
        {#if explanation}
          <div class="flex items-center gap-x-2">
            <Popover.Root>
              <Popover.Trigger asChild let:builder>
                <Button builders={[builder]} class="w-fit"
                  >Why?<i class="fa-solid fa-arrow-pointer ml-3" /></Button
                >
              </Popover.Trigger>
              <Popover.Content class="w-96" side="right" sideOffset={10}>
                <p>{explanation}</p>
              </Popover.Content>
            </Popover.Root>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

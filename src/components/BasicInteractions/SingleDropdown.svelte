<script>
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  export let value;
  export let items = [];
  export let title = "";
  export let instruction = "";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]}>{instruction}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>{title}</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.RadioGroup bind:value>
      {#each items as item}
        <DropdownMenu.RadioItem value={item}>{item}</DropdownMenu.RadioItem>
      {/each}
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>

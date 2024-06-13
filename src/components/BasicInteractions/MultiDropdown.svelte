<script>
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { writable } from "svelte/store";

  export let values = []; // List of default selected values
  export let items = []; // List of items in the dropdown
  export let title = "";
  export let instruction = "";
  export let atLeastOne = true;

  // Store to manage selected values
  let selectedValues = writable([...values]);

  function isChecked(item) {
    return $selectedValues.includes(item);
  }

  function handleCheckboxChange(item) {
    const checked = isChecked(item);
    if (!(checked && $selectedValues.length === 1)) {
      selectedValues.update((currentValues) => {
        if (!checked) {
          return [...currentValues, item];
        } else {
          return currentValues.filter((value) => value !== item);
        }
      });
      values = $selectedValues;
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]}>{instruction}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>{title}</DropdownMenu.Label>
    <DropdownMenu.Separator />
    {#each items as item}
      <DropdownMenu.CheckboxItem
        checked={isChecked(item)}
        onCheckedChange={() => handleCheckboxChange(item)}
      >
        {item}
      </DropdownMenu.CheckboxItem>
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>

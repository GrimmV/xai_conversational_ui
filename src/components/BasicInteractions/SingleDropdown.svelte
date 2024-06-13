<script>
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Select from "$lib/components/ui/select";

  export let value;
  export let items = [];
  export let title = "";
  export let instruction = "";

  const handleSelect = (selection) => {
    value = selection.value
  }
</script>

<Select.Root onSelectedChange={handleSelect} selected={{value: value, label: value, disabled: false}}>
  <Select.Trigger class="w-[180px]">
    <Select.Value placeholder={instruction} />
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>{title}</Select.Label>
      {#each items as item}
        <Select.Item value={item} label={item}>{item}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>

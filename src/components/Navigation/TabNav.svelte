<script>
  import { Select } from "bits-ui";

  export let options = [];
  export let label = "";
  export let selected;

  const handleSelect = (value) => {
    selected = value.value;
  };
</script>

<Select.Root onSelectedChange={handleSelect}>
  <Select.Trigger class="w-[180px] bg-secondary p-2">
    <Select.Value placeholder={selected} />
  </Select.Trigger>
  <Select.Content class="bg-secondary p-2">
    <Select.Group>
      <Select.Label><b>{label}</b></Select.Label>
      {#each options as option}
        <Select.Item value={option} label={option}>{option}</Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>

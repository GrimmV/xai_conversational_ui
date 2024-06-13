<script>
  import * as Accordion from "$lib/components/ui/accordion/index.js";

  export let title;
  export let bgColor = "bg-zinc-300";
</script>

<Accordion.Root class={`w-full ${bgColor} px-1 text-xs`}>
  <Accordion.Item value="item-1" class="mx-1">
    <Accordion.Trigger>{title}</Accordion.Trigger>
    <Accordion.Content>
      <slot /></Accordion.Content
    >
  </Accordion.Item>
</Accordion.Root>

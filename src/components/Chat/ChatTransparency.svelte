<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Popover from "$lib/components/ui/popover";
  import { hideInfo } from "../../store";

  export let type = "";
  export let input = "";
  export let explanation = "";

  $: hide = $hideInfo;

  let title = "";

  let isDataChoice = type === "data_choice";

  let parsed_input = {}

  if (type === "routing") {
    title = "Chosen category: " + input;
  } else if (isDataChoice) {
    title = "Data chosen";
    parsed_input = input
  }
</script>

{#if !hide}
<div class="m-2 ml-10">
  <div class="w-fit m-auto p-2">
    <div class="d-flex">
      <span class="mr-auto font-semibold"
        >{title}
        <Popover.Root>
          <Popover.Trigger asChild let:builder>
            <Button builders={[builder]} class="w-fit"
              >Details<i class="fa-solid fa-arrow-pointer ml-3" /></Button
            >
          </Popover.Trigger>
          <Popover.Content class="w-96" side="right" sideOffset={10}>
            {#if isDataChoice}
              {#each Object.keys(parsed_input) as key}
                <div class="visual-container">
                  <p><strong>{key}</strong></p>
                  <table>
                    <thead>
                      <tr>
                        {#each Object.keys(parsed_input[key]) as param_name}
                          <th>{param_name}</th>
                        {/each}
                      </tr>
                    </thead>
                    <tbody>
                      {#if Array.isArray(parsed_input[key])}
                        <!-- {#each input[key] as item}
                          <tr>
                            {#each Array.from(headers) as header}
                              <td>{item[header] || ""}</td>
                            {/each}
                          </tr>
                        {/each} -->
                      {:else}
                        <tr>
                          {#each Object.values(parsed_input[key]) as param_value}
                            <td>{param_value}</td>
                          {/each}
                        </tr>
                      {/if}
                    </tbody>
                  </table>
                </div>
              {/each}
            {/if}
            <p>{explanation}</p>
          </Popover.Content>
        </Popover.Root>
      </span>
    </div>
  </div>
</div>
  
{/if}

<style>
  table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
  }
  th, td {
      border: 1px solid #ddd;
      padding: 8px;
  }
  th {
      background-color: #f2f2f2;
      text-align: left;
  }
  .visual-container {
      margin-bottom: 40px;
  }
</style>
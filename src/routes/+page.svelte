<script>
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import Chat from "../components/Chat/Chat.svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;

  const allData = writable();
  allData.set(data);

  setContext("data", data);
</script>

<div class="m-2">
  <Chat />
</div>

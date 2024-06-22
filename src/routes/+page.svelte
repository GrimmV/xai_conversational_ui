<script>
  import { setContext } from "svelte";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { writable } from "svelte/store";

  import Chat from "../components/Chat/Chat.svelte";
  import Feedback from "../components/Feedback/Feedback.svelte";

  /** @type {import('./$types').LayoutData} */
  export let data;

  const allData = writable();
  allData.set(data);

  setContext("data", data);
</script>


<Tabs.Root value="chat" class="w-full">
  <Tabs.List class="grid w-full grid-cols-2">
    <Tabs.Trigger value="chat">Chat</Tabs.Trigger>
    <Tabs.Trigger value="judge">Make Judgement</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="chat">
    <div class="m-2">
    
      <Chat />
    </div></Tabs.Content>
  <Tabs.Content value="judge">
    <Feedback datapoint={$allData["datapoint"]} prediction={$allData["singlePred"]}/>
    </Tabs.Content
  >
</Tabs.Root>

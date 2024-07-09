<script>
  import { tick } from "svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Submessage from "./Submessage.svelte";

  export let message;
  export let sendRequest;

  let oldMessages = message.submessages;

  let userMessage = "";
  let element;

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  $: if (message.submessages.length !== oldMessages.length) {
    handleScroll();
  }

  async function handleScroll() {
    await tick();
    scrollToBottom(element);
    oldMessages = message.submessages;
  }

  function sendUserMessage() {
    const threadId = message.messageId;
    const submessages = message.submessages;
    message.submessages.push({
      messageId: submessages[submessages.length - 1].messageId + 1,
      message: userMessage,
      timestamp: Date.now(),
      actor: "user",
      type: "",
      category: "",
      prevActor: "system",
      explanation: "",
    });

    const request = {
      requestField: userMessage,
      thread_id: threadId,
      last_message_id: null,
    };
    sendRequest(request);
    userMessage = "";
  }
</script>

<div class="box-content border-2 p-4 m-12 h-full overflow-auto" bind:this={element}>
  <Submessage {message} isLast={false}/>
  <hr />
  {#each message.submessages as submessage, j}
    <Submessage message={submessage} isLast={j >= message.submessages.length - 1}/>
  {/each}
  <form class="flex w-full items-center">
    <Textarea
      bind:value={userMessage}
      class="w-full h-24 rounded-r-none"
      placeholder="Type your message here."
    />
    <Button
      disabled={userMessage === ""}
      on:click={sendUserMessage}
      class="rounded-l-none h-24 w-48">Send</Button
    >
  </form>
</div>

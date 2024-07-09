<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import { tick } from "svelte";
  import { onMount } from "svelte";
  import Submessage from "./Submessage.svelte";
  import Thread from "./Thread.svelte";

  let socket;

  function sendRequest(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open");
    }
  }

  onMount(() => {
    socket = new WebSocket("ws://localhost:8765");

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const threadId = data.thread_id;
      const type = data.type;
      if (type === "status") {
        sendSystemMessage(data.text, [], "", type, threadId);
      } else if (type === "routing") {
        sendSystemMessage(
          data.category,
          [],
          "",
          type,
          threadId,
          data.explanation
        );
      } else if (type === "data_choice") {
        sendSystemMessage(
          data.choice,
          [],
          "",
          type,
          threadId,
          data.explanation
        );
        const components_formatted = [];
        const json_choice = data.choice;
        for (let comp of Object.keys(json_choice)) {
          if (Array.isArray(json_choice[comp])) {
            for (let elem of json_choice[comp]) {
              components_formatted.push({
                component: comp,
                params: elem,
              });
            }
          } else {
            components_formatted.push({
              component: comp,
              params: json_choice[comp],
            });
          }
        }
        sendSystemMessage("", components_formatted, "", "component", threadId);
      } else if (type === "response") {
        sendSystemMessage(
          data.response,
          [],
          "",
          type,
          threadId,
          data.explanation
        );
      } else if (type === "next") {
        sendSystemMessage(
          data.response,
          [],
          "",
          "response",
          threadId,
          data.explanation
        );
      } else {
        sendSystemMessage(data.text, [], "", "info", threadId);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (ev) => {
      console.log(ev);
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  });

  let now = Date.now();

  let messages = [
    {
      messageId: 1,
      message:
        "Hey, I am your assistant to walk you through the decision process of the machine learning model for predicting the quality of wine based on chemical properties, such as alcohol concentration and density",
      timestamp: now,
      actor: "system",
      type: "info",
      category: "",
      prevActor: "",
      explanation: "",
    },
    {
      messageId: 2,
      message:
        "You are supposed to evaluate the following quality prediction from the machine learning model.",
      timestamp: now,
      actor: "system",
      type: "info",
      category: "",
      prevActor: "",
      explanation: "",
    },
    {
      messageId: 3,
      components: [{ component: "datapoint", params: { hideImpact: true } }],
      isHidden: false,
      timestamp: now,
      actor: "system",
      type: "component",
      category: "",
      prevActor: "system",
      explanation: "",
    },
    {
      messageId: 4,
      message:
        "While you can ask me anything about machine learning, XAI and the usecase at hand, I recommend the following workflow: ",
      timestamp: now,
      actor: "system",
      type: "info",
      category: "",
      prevActor: "system",
      explanation: "",
    },
    {
      messageId: 5,
      components: [
        { component: "textbox", params: { text: "Understand the data" } },
        { component: "textbox", params: { text: "Understand the model" } },
        {
          component: "textbox",
          params: { text: "Look into the prediction" },
        },
        {
          component: "textbox",
          params: { text: "Analyze the prediction context" },
        },
      ],
      isHidden: false,
      timestamp: now,
      actor: "system",
      type: "component",
      category: "",
      prevActor: "system",
      explanation: "",
    },
    {
      messageId: 6,
      message: "What do you want to know or do?",
      timestamp: now,
      actor: "system",
      type: "info",
      category: "",
      prevActor: "system",
      explanation: "",
    },
  ];

  let oldMessages = messages;

  let userMessage = "";
  let element;

  const scrollToBottom = async (node) => {
    node.scroll({ top: node.scrollHeight, behavior: "smooth" });
  };

  $: if (messages.length !== oldMessages.length) {
    handleScroll();
  }

  async function handleScroll() {
    await tick();
    scrollToBottom(element);
    oldMessages = messages;
  }

  function sendUserMessage() {
    const request = {
      requestField: userMessage,
      thread_id: null,
      last_message_id: messages[messages.length - 1].messageId,
    };
    sendRequest(request);
    messages = [
      ...messages,
      {
        messageId: messages[messages.length - 1].messageId + 1,
        message: userMessage,
        timestamp: Date.now(),
        actor: "user",
        type: "",
        category: "",
        prevActor: "",
        explanation: "",
      },
    ];
    // const components_formatted = [
    //   {
    //     component: "context",
    //     params: { class: "5", feature: "alcohol" },
    //   },
    // ];
    // sendSystemMessage("", components_formatted, "", "component", "", true);
    userMessage = "";
  }

  function sendThreadedSystemMessage(
    message,
    components = [],
    category = "",
    type = "info",
    explanation = "",
    isHidden = false,
    threadId = ""
  ) {
    console.log(threadId)
    const thread_message = messages.find((v) => v.messageId === parseInt(threadId));
    const messageIndex = messages.findIndex((v) => v.messageId === parseInt(threadId));
    console.log(thread_message)
    if (thread_message) {
      let submessages = thread_message.submessages;
      if (submessages) {
        thread_message.submessages.push({
          messageId: submessages[submessages.length - 1].messageId + 1,
          message: message,
          components: components,
          timestamp: Date.now(),
          actor: "system",
          category: category,
          type: type,
          prevActor: submessages[submessages.length - 1].actor,
          explanation: explanation,
          isHidden: isHidden,
        });
      } else {
        thread_message.submessages = [
          {
            messageId: 0,
            message: message,
            components: components,
            timestamp: Date.now(),
            actor: "system",
            category: category,
            type: type,
            prevActor: "system",
            explanation: explanation,
            isHidden: isHidden,
          },
        ];
      }
      messages[messageIndex] = thread_message;
      console.log(messages)
    }
  }

  function sendSystemMessage(
    message,
    components = [],
    category = "",
    type = "info",
    threadId = null,
    explanation = "",
    isHidden = false
  ) {
    if (!threadId) {
      messages = [
        ...messages,
        {
          messageId: messages[messages.length - 1].messageId + 1,
          message: message,
          components: components,
          timestamp: Date.now(),
          actor: "system",
          category: category,
          type: type,
          prevActor: messages[messages.length - 1].actor,
          explanation: explanation,
          isHidden: isHidden,
        },
      ];
    } else {
      sendThreadedSystemMessage(
        message,
        components,
        category,
        type,
        explanation,
        isHidden,
        threadId
      );
    }
  }

  $: console.log(messages[messages.length - 1]);
</script>

<div class="direct-chat direct-chat-danger">
  <div class="card-body">
    <div
      class="direct-chat-messages overflow-auto relative"
      bind:this={element}
    >
      {#each messages as message, i}
        {#if !message.submessages || message.submessages.length === 0}
          <Submessage {message} isLast={i >= messages.length - 1} />
        {:else}
          <Thread {message} {sendRequest} />
        {/if}
      {/each}
    </div>
  </div>
  <div class="card-footer m-2">
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
</div>

<style>
  .direct-chat .card-body {
    overflow-x: hidden;
    padding: 0;
    position: relative;
  }

  .direct-chat-messages {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    height: 70vh;
    overflow: auto;
    padding: 10px;
    transition: -webkit-transform 0.5s ease-in-out;
    transition: transform 0.5s ease-in-out;
    transition:
      transform 0.5s ease-in-out,
      -webkit-transform 0.5s ease-in-out;
  }
</style>

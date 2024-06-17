<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import ChatComponent from "./ChatComponent.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import { tick } from "svelte";
  import { onMount } from "svelte";
  import ChatTransparency from "./ChatTransparency.svelte";

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
      const type = data.type;
      if (type === "status") {
        sendSystemMessage(data.text, [], "", type);
      } else if (type === "routing") {
        sendSystemMessage(data.category, [], "", type, data.explanation);
      } else if (type === "data_choice") {
        sendSystemMessage(data.choice, [], "", type, data.explanation);
        const components_formatted = [];
        const json_choice = JSON.parse(data.choice);
        console.log(json_choice);
        for (let comp of Object.keys(json_choice)) {
          components_formatted.push({
            component: comp,
            params: json_choice[comp],
          });
        }
        sendSystemMessage("", components_formatted, "", "component", "", true);
        console.log(components_formatted);
      } else if (type === "response") {
        sendSystemMessage(data.response, [], "", type, data.explanation);
        sendSystemMessage(data.next, [], "", "next");
      } else {
        sendSystemMessage(data.text, [], "", "info");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  });

  let profilePicMe =
    "https://p0.pikist.com/photos/474/706/boy-portrait-outdoors-facial-men-s-young-t-shirt-hair-person-thumbnail.jpg";

  let profilePicChatPartner =
    "https://storage.needpix.com/rsynced_images/male-teacher-cartoon.jpg";

  let now = Date.now();

  let messages = [
    {
      messageId: 1,
      message:
        "Hey, I am your assistant to walk you through the decision process of the machine learning model for predicting the quality of wine based on chemical properties, such as alcohol concentration and density",
      timestamp: now,
      actor: "system",
      type: "info",
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
      prevActor: "system",
      explanation: "",
    },
    {
      messageId: 4,
      message:
        "While you can ask me anything about the model behaviour and data, I recommend the following workflow: ",
      timestamp: now,
      actor: "system",
      type: "info",
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
      componentClass: "flex m-2",
      isHidden: false,
      timestamp: now,
      actor: "system",
      type: "component",
      prevActor: "system",
      explanation: "",
    },
    {
      messageId: 6,
      message: "What do you want to know or do?",
      timestamp: now,
      actor: "system",
      type: "info",
      prevActor: "system",
      explanation: "",
    },
  ];

  let oldMessages = messages;

  let userMessage = "";
  let element;

  const scrollToBottom = async (node) => {
    console.log(node.scrollHeight);
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
    messages = [
      ...messages,
      {
        messageId: messages[messages.length - 1].messageId + 1,
        message: userMessage,
        timestamp: Date.now(),
        actor: "user",
        type: "",
        prevActor: "",
        explanation: "",
      },
    ];
    const request = {
      requestField: userMessage,
    };
    sendRequest(request);
    // const components_formatted = [
    //   {
    //     component: "context",
    //     params: { activeClass: "5", feature: "alcohol" },
    //   },
    // ];
    // sendSystemMessage("", components_formatted, "", "component", "", true);
    userMessage = "";
  }

  function sendSystemMessage(
    message,
    components = [],
    componentClass = "",
    type = "info",
    explanation = "",
    isHidden = false
  ) {
    messages = [
      ...messages,
      {
        messageId: messages[messages.length - 1].messageId + 1,
        message: message,
        components: components,
        componentClass: componentClass,
        timestamp: Date.now(),
        actor: "system",
        type: type,
        prevActor: messages[messages.length - 1].actor,
        explanation: explanation,
        isHidden: isHidden,
      },
    ];
  }
</script>

<div class="direct-chat direct-chat-danger">
  <div class="card-body">
    <div
      class="direct-chat-messages overflow-auto relative"
      bind:this={element}
    >
      {#each messages as message, i}
        {#if message.type === "component"}
          <ChatComponent
            components={message.components}
            isHidden={message.isHidden}
          />
        {:else if message.type === "routing" || message.type === "data_choice"}
          <ChatTransparency
            type={message.type}
            input={message.message}
            explanation={message.explanation}
          />
        {:else}
          <ChatMessage
            {profilePicMe}
            {profilePicChatPartner}
            message={message.message}
            components={message.components}
            componentsClass={message.componentClass}
            timestamp={message.timestamp}
            actor={message.actor}
            prevActor={message.prevActor}
            type={message.type}
            explanation={message.explanation}
            isLast={i >= messages.length - 1}
          />
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
    height: 80vh;
    overflow: auto;
    padding: 10px;
    transition: -webkit-transform 0.5s ease-in-out;
    transition: transform 0.5s ease-in-out;
    transition:
      transform 0.5s ease-in-out,
      -webkit-transform 0.5s ease-in-out;
  }
</style>

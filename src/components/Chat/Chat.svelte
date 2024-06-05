<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import { tick } from "svelte";
  import { onMount } from 'svelte';
  
  let socket;

  function sendRequest(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  }

  onMount(() => {
    socket = new WebSocket('ws://localhost:8765');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const type = data.type
      if (type === "status") {
        sendSystemMessage(data.text, [], "", type)
      } else if (type === "routing") {
        sendSystemMessage(data.category, [], "", type, data.explanation)
      } else if (type === "data_choice") {
        sendSystemMessage(data.choice, [], "", type, data.explanation)
      } else if (type === "response") {
        sendSystemMessage(data.response, [], "", type, data.explanation)
        sendSystemMessage(data.next, [], "", "next")
      } else {
        sendSystemMessage(data.text, [], "", "info")
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
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
      explanation: ""
    },
    {
      messageId: 2,
      message:
        "While you can ask me anything about the model behaviour and data, I recommend the following workflow: ",
      components: [
        { component: "textbox", dataParams: { text: "Understand the data" } },
        { component: "textbox", dataParams: { text: "Understand the model" } },
        {
          component: "textbox",
          dataParams: { text: "Look into the prediction" },
        },
        {
          component: "textbox",
          dataParams: { text: "Analyze the prediction context" },
        },
      ],
      componentClass: "flex m-2",
      timestamp: now,
      actor: "system",
      type: "info",
      prevActor: "system",
      explanation: ""
    },
    {
      messageId: 3,
      message: "What do you want to know or do?",
      timestamp: now,
      actor: "system",
      type: "info",
      prevActor: "system",
      explanation: ""
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
        explanation: ""
      },
    ];
    const request = {
      requestField: userMessage
    }
    sendRequest(request)
    userMessage = "";
  }

  function sendSystemMessage(message, components = [], componentClass = "", type = "info", explanation = "") {
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
        explanation: explanation
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
          isLast={ i >= (messages.length-1)}
        />
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

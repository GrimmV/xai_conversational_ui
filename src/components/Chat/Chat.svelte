<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  import ChatMessage from "./ChatMessage.svelte";
	import { tick } from 'svelte';

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
    },
    {
      messageId: 2,
      message:
        "While you can ask me anything about the model behaviour and data, I recommend the following workflow: ",
      components: [
        { component: "textbox", dataParams: { text: "Understand the data" } },
        { component: "textbox", dataParams: { text: "Understand the model" } },
        { component: "textbox", dataParams: { text: "Look into the prediction" } },
        {
          component: "textbox",
          dataParams: { text: "Analyze the prediction context" },
        },
      ],
      componentClass: "flex m-2",
      timestamp: now,
      actor: "system",
    },
    {
      messageId: 3,
      message: "What do you want to know or do?",
      timestamp: now,
      actor: "system",
    },
  ];

  let oldMessages = messages;


  let userMessage = "";
  let element;
  
  const scrollToBottom = async (node) => {
    console.log(node.scrollHeight)
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }; 

  $: if(messages.length !== oldMessages.length) {
		handleScroll()
  }

  async function handleScroll() {
    await tick();
    scrollToBottom(element)
    oldMessages = messages
  }

  function sendUserMessage() {
    messages = [
      ...messages,
      {
        messageId: messages[messages.length - 1].messageId + 1,
        message: userMessage,
        timestamp: Date.now(),
        actor: "user",
      },
    ];
    userMessage = "";
  }

  function sendSystemMessage(message, components = [], componentClass = "") {
    messages = [
      ...messages,
      {
        messageId: messages[messages.length - 1].messageId + 1,
        message: message,
        components: components,
        componentClass: componentClass,
        timestamp: Date.now(),
        actor: "system",
      },
    ];
  }

  $: if (messages.length === 4) {
    sendSystemMessage("\u2607 Chosen step: Understanding Data");
  }
  $: if (messages.length === 5) {
    sendSystemMessage(
      "Most features are rather uncorrelated. A relatively strong correlation occurs between residual sugar and density (+0.81)" +
        " while a relatively strong negative correlation occurs between alcohol and density (-0.84)." +
        " Do you want to see the detailed confusion matrix?"
    );
  }
  $: if (messages.length === 7) {
    // sendSystemMessage("Here is the detailed correlation matrix:", [
    //   {
    //     component: "corrMatrix",
    //     title: "Feature Correlation",
    //     dataParams: {},
    //   },
    // ]);
    sendSystemMessage("Here is the learning curve for the training set:", [
      {
        component: "predictionProbabilities",
        title: "Prediction Probabilities",
      },
      {
        component: "trustscore",
        title: "Trustscores!",
      },
      "flex mx-2"
    ]);
  }
  
  $: if (messages.length === 9) {
    sendSystemMessage("\u2607 Chosen step: Understanding Model");
  }
  $: if (messages.length === 10) {
    sendSystemMessage(
      "Ok, no problem. Here are the confusion matrices between actual classes and the predictions by the model:",
      [
        {
          component: "predConfMatrix",
          title: "Train Confusion Matrix",
          dataParams: { type: "train" },
        },
        {
          component: "predConfMatrix",
          title: "Test Confusion Matrix",
          dataParams: { type: "test" },
        },
      ],
      "flex mx-2"
    );
  }
</script>

<div class="direct-chat direct-chat-danger">
  <div class="card-body">
    <div class="direct-chat-messages overflow-auto relative" bind:this={element}>
      {#each messages as message}
        <ChatMessage
          {profilePicMe}
          {profilePicChatPartner}
          message={message.message}
          components={message.components}
          componentsClass={message.componentClass}
          timestamp={message.timestamp}
          actor={message.actor}
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

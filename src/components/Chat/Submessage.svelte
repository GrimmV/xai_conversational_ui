<script>
  import ChatComponent from "./ChatComponent.svelte";
  import ChatMessage from "./ChatMessage.svelte";
  import ChatTransparency from "./ChatTransparency.svelte";

  export let message;
  export let isLast;
  
  let profilePicMe =
    "https://p0.pikist.com/photos/474/706/boy-portrait-outdoors-facial-men-s-young-t-shirt-hair-person-thumbnail.jpg";

  let profilePicChatPartner =
    "https://storage.needpix.com/rsynced_images/male-teacher-cartoon.jpg";
</script>

{#if message.type === "component"}
  <ChatComponent components={message.components} isHidden={message.isHidden} />
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
    isLast={isLast}
  />
{/if}

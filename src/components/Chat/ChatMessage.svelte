<script>

  import * as Popover from "$lib/components/ui/popover/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { hideInfo } from "../../store";

  export let actor;
  export let profilePicChatPartner;
  export let profilePicMe;
  export let message;
  export let components = [];
  export let componentsClass = "";
  export let timestamp;
  export let type;
  export let prevActor;
  export let explanation;
  export let isLast;

  let sentByMe = actor === "user";
  let isStatus = type === "status";
  let isInfo = type === "status" || type === "info";
</script>

<div class="flex flex-col">
  {#if isStatus}
    <div class="min-w-min">
      {#if actor !== prevActor}
        <div class="direct-chat-infos clearfix flex flex-col">
          <p class={sentByMe ? "self-end" : "self-start"}>
            {new Date(timestamp).toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
        <img
          class="direct-chat-img"
          src={sentByMe == true ? profilePicMe : profilePicChatPartner}
          alt="pic"
        />
      {/if}
      <div class="w-fit m-auto p-2">
        <div class="d-flex">
          <span class="mr-auto font-semibold"
            >{message}
            {#if isLast}
              <i class="fa-solid fa-spinner animate-spin" />
            {/if}
          </span>
        </div>
      </div>
    </div>
  {:else}
    <div
      class="direct-chat-msg min-w-min {sentByMe ? 'self-end' : 'self-start'}"
      class:right={sentByMe}
      class:left={!sentByMe}
    >
      {#if actor !== prevActor}
        <div class="direct-chat-infos clearfix flex flex-col">
          <p class={sentByMe ? "self-end" : "self-start"}>
            {new Date(timestamp).toLocaleString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
        <img
          class="direct-chat-img"
          src={sentByMe == true ? profilePicMe : profilePicChatPartner}
          alt="pic"
        />
      {/if}
      {#if isInfo}
        <div class="direct-chat-text bg-accent">
          <div class="d-flex">
            <span class="mr-auto">{message}</span>
          </div>
        </div>
      {:else}
        <div class="direct-chat-text bg-secondary">
          <div class="d-flex">
            <div class="flex flex-col gap-y-2">
              <span class="mr-auto">{message}</span>
              {#if explanation && !$hideInfo}
                <div class="flex items-center gap-x-2">
                  <Popover.Root>
                    <Popover.Trigger asChild let:builder>
                      <Button builders={[builder]} class="w-fit"
                        >Why?<i
                          class="fa-solid fa-arrow-pointer ml-3"
                        /></Button
                      >
                    </Popover.Trigger>
                    <Popover.Content class="w-96" side="right" sideOffset={10}>
                      <p>{explanation}</p>
                    </Popover.Content>
                  </Popover.Root>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .direct-chat-msg,
  .direct-chat-text {
    display: block;
  }
  .direct-chat-msg {
    margin-bottom: 10px;
  }
  .direct-chat-msg:before,
  .direct-chat-msg:after {
    content: " ";
    display: table;
  }
  .direct-chat-msg:after {
    clear: both;
  }
  .direct-chat-text {
    border-radius: 5px;
    position: relative;
    padding: 5px 10px;
    /* background: #d2d6de; */
    border: 1px solid #d2d6de;
    margin: 2px 0 5px 50px;
    /* color: #444; */
    margin-right: 50px;
  }
  .direct-chat-text:after,
  .direct-chat-text:before {
    position: absolute;
    right: 100%;
    top: 15px;
    border: solid transparent;
    border-right-color: #d2d6de;
    content: " ";
    height: 0;
    width: 0;
    pointer-events: none;
  }
  .direct-chat-text:after {
    border-width: 5px;
    margin-top: -5px;
  }
  .direct-chat-text:before {
    border-width: 6px;
    margin-top: -6px;
  }
  .right .direct-chat-text {
    margin-right: 50px;
    margin-left: 50px;
  }
  .right .direct-chat-text:after,
  .right .direct-chat-text:before {
    right: auto;
    left: 100%;
    border-right-color: transparent;
    border-left-color: #d2d6de;
  }
  img {
    border-radius: 50%;
    float: left;
    width: 40px;
    height: 40px;
  }
  .right img {
    float: right;
  }

  .direct-chat-infos {
    font-size: 0.8rem;
  }
</style>

<script>
    import { onMount } from 'svelte';
  
    let socket;
    let messages = [];
    let request = { };
  
    function sendRequest() {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(request));
      } else {
        console.error('WebSocket is not open');
      }
    }
  
    onMount(() => {
      socket = new WebSocket('ws://localhost:8765');
  
      socket.onopen = () => {
        console.log('WebSocket connection opened');
        // sendRequest(); // Send the initial request once the connection is open
      };
  
      socket.onmessage = (event) => {
        messages = [...messages, event.data];
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
  
    function handleRequestInput(event) {
      request = { ...request, [event.target.name]: event.target.value };
    }
  </script>
  
  <style>
    .messages {
      list-style-type: none;
      padding: 0;
    }
    .message {
      margin: 0.5em 0;
      padding: 0.5em;
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  </style>
  
  <div>
    <h1>WebSocket Communication</h1>
    <input type="text" name="requestField" on:input="{handleRequestInput}" placeholder="Enter request data..." />
    <button on:click="{sendRequest}">Send Request</button>
  
    <ul class="messages">
      {#each messages as message}
        <li class="message">{message}</li>
      {/each}
    </ul>
  </div>
  
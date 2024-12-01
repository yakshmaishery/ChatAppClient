<script lang="ts">
   export let data;
   let LoginID = data.LoginID
   import {onMount} from 'svelte'
   import { io } from 'socket.io-client';
   import { Textarea, Alert, ToolbarButton } from 'flowbite-svelte';
   import { ImageOutline, FaceGrinOutline, PaperPlaneOutline } from 'flowbite-svelte-icons';
   let socket:any;
   let SenderMessage:string = ''
   let MessageList: any[] = []
   onMount(() => {
      socket = io('https://chatappserver-1yf9.onrender.com/')
      socket.on("recivedMessage",(data:any) => {
         MessageList = [...MessageList,{senderID:data.senderID,senderEmail:data.senderEmail,senderMessage:data.senderMessage,messageType:"Get",MessageTimeStamp:new Date().toLocaleString()}]
      })
   })

   const SendBtn = () => {
      if(socket){
         socket.emit("SendMessage",{ID:socket.id,EmailID:LoginID,Msg:SenderMessage})
         MessageList = [...MessageList,{senderID:socket.id,senderEmail:data.LoginID,senderMessage:SenderMessage,messageType:"Send",MessageTimeStamp:new Date().toLocaleString()}]
      }
   }
</script>

<div class="fixed bottom-0 start-0 z-20 w-full border-t border-gray-200">
   <div class="chat-box" id="chat-box">
      {#each MessageList as  el}
         <div class={`message ${el.messageType == "Get"?"received":"sent"}`}>
            <div class="message-info">
               <span class="sender">{el.senderEmail}</span>
               <span class="timestamp">{el.MessageTimeStamp}</span>
           </div>
           <div class="message-content">{el.senderMessage}</div>
         </div>
      {/each}
   </div>
   <form class="shadow md:flex md:items-center md:justify-between md:p-0 dark:bg-gray-800 dark:border-gray-600">
      <label for="chat" class="sr-only">Your message</label>
      <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700" style="width: 100%;">
        <ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
          <ImageOutline class="w-6 h-6" />
          <span class="sr-only">Upload image</span>
        </ToolbarButton>
        <ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
          <FaceGrinOutline class="w-6 h-6" />
          <span class="sr-only">Add emoji</span>
        </ToolbarButton>
        <Textarea bind:value={SenderMessage} id="chat" class="mx-4 bg-white dark:bg-gray-800" rows={1} placeholder="Your message..." />
        <ToolbarButton on:click={SendBtn} type="submit" color="blue" class="rounded-full text-primary-600 dark:text-primary-500">
          <PaperPlaneOutline class="w-6 h-6 rotate-45" />
          <span class="sr-only">Send message</span>
        </ToolbarButton>
      </div>
    </form>
</div>

<style>


/* Chat Box */
.chat-box {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#chat-box{
   max-height: 90vh;
}

/* Messages */
.message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    padding: 10px;
    border-radius: 15px;
    line-height: 1.5;
    position: relative;
}

.received {
    background-color: #e0e0e0;
    align-self: flex-start;
}

.sent {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
}

/* Message Info */
.message-info {
    font-size: 12px;
    color: black;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.sender {
    font-weight: bold;
}

.timestamp {
    font-style: italic;
}
</style>
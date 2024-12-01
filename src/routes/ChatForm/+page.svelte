<script lang="ts">
   export let data;
   let LoginID = data.LoginID
   import {onMount} from 'svelte'
   import { io } from 'socket.io-client';
   import { Textarea, Drawer, Button, DarkMode, ToolbarButton,Sidebar, SidebarWrapper, SidebarBrand, SidebarItem, SidebarGroup, Label } from 'flowbite-svelte';
   import { PaperPlaneOutline,BarsOutline,LockOpenSolid } from 'flowbite-svelte-icons';
   import { sineIn } from 'svelte/easing';
   import Swal from 'sweetalert2'
    import { enhance } from '$app/forms';
   let socket:any;
   let SenderMessage:string = ''
   let MessageList: any[] = []
   onMount(() => {
      socket = io('https://chatappserver-1yf9.onrender.com/')
      socket.emit("UserloggedIn",LoginID)
      socket.on("recivedMessage",(data:any) => {
         MessageList = [...MessageList,{senderID:data.senderID,senderEmail:data.senderEmail,senderMessage:data.senderMessage,messageType:"Get",MessageTimeStamp:new Date().toLocaleString()}]
      })
      socket.on("UserloggedInNotice",(data:any)=>{
         Swal.fire({
            icon:"info",
            title:"Logged IN",
            text:`Welcome ${data}`,
            confirmButtonColor:"green"
         })
      })
      socket.on("disconnectUser",(data:any)=>{
         Swal.fire({
            icon:"info",
            title:"Logged OUT",
            text:`User ${data} has been loggout`,
            confirmButtonColor:"green"
         })
      })
   })

   const SendBtn = () => {
      if(socket){
         socket.emit("SendMessage",{ID:socket.id,EmailID:LoginID,Msg:SenderMessage})
         MessageList = [...MessageList,{senderID:socket.id,senderEmail:data.LoginID,senderMessage:SenderMessage,messageType:"Send",MessageTimeStamp:new Date().toLocaleString()}]
         SenderMessage=""
      }
   }
   let hidden1 = true;
   let transitionParams = {
    x: -320,
    duration: 200,
    easing: sineIn
  };
  let site = {
    name: 'Flowbite-Svelte',
    href: '/'
  };
</script>

<div id="maincontainer">
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
        <!-- <ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
          <ImageOutline class="w-6 h-6" />
          <span class="sr-only">Upload image</span>
        </ToolbarButton>
        <ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
          <FaceGrinOutline class="w-6 h-6" />
          <span class="sr-only">Add emoji</span>
        </ToolbarButton> -->
        <div class="text-center">
         <Button on:click={() => (hidden1 = false)}><BarsOutline/></Button>
       </div>
        <Textarea bind:value={SenderMessage} id="chat" class="mx-4 bg-white dark:bg-gray-800" rows={1} placeholder="Your message..." />
        <ToolbarButton on:click={SendBtn} type="submit" color="blue" class="rounded-full text-primary-600 dark:text-primary-500">
          <PaperPlaneOutline class="w-6 h-6 rotate-45" />
          <span class="sr-only">Send message</span>
        </ToolbarButton>
      </div>
    </form>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
   <Sidebar>
      <SidebarWrapper>
        <SidebarGroup>
         <form method="post" use:enhance>
         <p class="text-3xl dark:text-white font-extrabold">
            Welcome
            <DarkMode class="text-primary-500 dark:text-primary-600 border dark:border-gray-800" style="padding:0px" />
         </p>
         <Label>{LoginID}</Label>
          <!-- <SidebarItem label="Logout">
            <svelte:fragment slot="icon">
              <LockOpenSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
            </svelte:fragment>
          </SidebarItem> -->
          <br/>
          <br/>
          <Button type="submit" formaction="?/LoginOutAction" formmethod="POST">Logout</Button>
         </form>
         </SidebarGroup>
      </SidebarWrapper>
   </Sidebar>
</Drawer>

<style>

#maincontainer{
   height: 100vh;
   width: 100vw;
   display: grid;
   grid-template-rows: auto max-content;
}

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
   max-height: 100vh;
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
<svelte:head>
   <title>Chat App Home</title>
</svelte:head>

<script lang="ts">
    import { enhance } from '$app/forms';
   import { Label, Input, Button } from 'flowbite-svelte';
   import { EnvelopeSolid } from 'flowbite-svelte-icons';
</script>

<div class="mb-6 mx-20">
<div class="mb-6 mx-20">
   <form use:enhance method="post" action="?/LoginAction">
      <Label for="input-group-1" class="block mb-2">Login ID</Label>
      <Input id="email" type="email" name="email" placeholder="name@gmail.com">
        <EnvelopeSolid slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
      </Input>
      <br/>
      <Button type="submit">Login In</Button>
   </form>
 </div>
 </div>

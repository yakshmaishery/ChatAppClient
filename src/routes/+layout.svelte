<script>
   import "../app.css";
   import { Navbar, NavBrand, NavLi, NavUl, NavHamburger,DarkMode } from 'flowbite-svelte';
   // @ts-ignore
   let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2';
   import { onMount } from 'svelte';
   import {ShareNavbarHeight} from '$lib/Stores'
   onMount(() => {
              // @ts-ignore
              $ShareNavbarHeight = document.getElementById("fnav").clientHeight
              window.addEventListener("resize",()=>{
                     // @ts-ignore
                     $ShareNavbarHeight = document.getElementById("fnav").clientHeight
              })
       })
 </script>
<Navbar style="box-shadow:0px 0px 7px 2px black;margin-bottom:30px" id="fnav">
   <NavBrand href="/">
     <img src="/images/chaticon.png" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
     <span class="self-center whitespace-nowrap text-sm font-semibold dark:text-white">Quick chat</span>
   </NavBrand>
   <NavHamburger  />
   <NavUl >
     <!-- <NavLi href="/">Home</NavLi>
     <NavLi href="/about">About</NavLi>
     <NavLi href="/docs/components/navbar">Navbar</NavLi>
     <NavLi href="/pricing">Pricing</NavLi>
     <NavLi href="/contact">Contact</NavLi> -->
     <NavLi><DarkMode class="text-primary-500 dark:text-primary-600 border dark:border-gray-800" style="padding:0px" /></NavLi>
   </NavUl>
 </Navbar>
 <slot></slot>
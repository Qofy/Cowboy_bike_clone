<script>
import logo from "../assets/logo.png";
import { onMount } from 'svelte';
import "../style/style.css"

const navs = ["Wheels", "Overview", "Accessories", "Service", "Ergonomics", "Activities", "Gallery", "About us", "Contact", "Newsletter"];

$:navLink =navs.map((nav, i)=>nav.toLowerCase()
)
$:{
  console.log("nav",navLink)
}
</script>

<header 
  class="sticky-header" 
>
  <!-- <img src={logo} alt="Logo"> -->
  <nav>
    {#each navs as nav}
      <li>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#{navLink}" on:click={(e) => e.preventDefault()}>
          {nav}
        </a>
      </li>
    {/each}
  </nav>

  <div class="text-white flex gap-5 items-center text-[14px]">
    <p>Configure</p>
    <button class="text-black bg-white px-4 py-1.5 rounded-[50px]">Test Drive</button>
  </div>
</header>

<style>
  .sticky-header {
    height: 56px;
    display: flex;
    padding: 0 3.5rem;
    align-items: center;
    justify-content: space-between;
    background-color: #fbb900;
    /* opacity: 0; */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    animation-name: stickytoggle;
    animation-duration: 1ms;
    animation-timeline: scroll();
    animation-range: 0 100vh;
  }


  nav {
    display: flex;
    gap: 2rem;
  }

  nav li {
    list-style: none;
    margin: 0;
  }

  nav a {
    text-decoration: none;
    color: #fff;
    font-size: 14px;
  }

  @keyframes stickytoggle {
    0% {
      opacity: 0;
      pointer-events: none;
      z-index: 50;
    }
    99% {
      opacity: 0;
      pointer-events: none;
      z-index: 50;
    }
    100% {
      opacity: 1;
      pointer-events: auto;
      z-index: 1000;
    }
  }
</style>
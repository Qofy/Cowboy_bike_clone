<script>
import logo from "../assets/logo.png";
import { onMount } from 'svelte';

const navs = ["contact", "product-view"];
</script>

<header 
  class="sticky-header" 
>
  <img src={logo} alt="Logo">
  <nav>
    {#each navs as nav}
      <li>
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="#" on:click={(e) => e.preventDefault()}>
          {nav}
        </a>
      </li>
    {/each}
  </nav>
</header>

<style>
  .sticky-header {
    height: 60px;
    display: flex;
    padding: 0 3.5rem;
    align-items: center;
    justify-content: space-between;
    background-color: bisque;
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

  .sticky-header img {
    width: 120px;
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
    color: rgb(29, 29, 29);
    font-size: 1.3rem;
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
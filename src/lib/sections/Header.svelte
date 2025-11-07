<script>
import logo from "../assets/logo.png";
import "../style/style.css"
import { onMount } from 'svelte';

const navs = ["contact", "product-view"];
let headerElement;

onMount(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = 200;
    const progress = Math.min(scrollY / maxScroll, 1);
    
    if (headerElement) {
      headerElement.style.transform = `translateY(-${progress * 100}px)`;
      headerElement.style.opacity = `${1 - progress}`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
});
</script>


<header bind:this={headerElement}>
  <img src={logo} alt="Logo">
  <nav>
    {#each navs as nav}
      <li>
        <a href="#" on:click={(e) => e.preventDefault()}>
          {nav}
        </a>
      </li>
    {/each}
  </nav>
</header>

<style>
  header{
    /* width: 100%; */
    height: 60px;
    display: flex;
    padding: 0 3.5rem;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    will-change: transform, opacity;
  }

header img{
  width: 120px;
}
nav{
  display: flex;
  gap: 2rem;
}

nav li{
  list-style: none;
  margin: 0;
}
nav a{
  text-decoration: none;
  color: rgb(29, 29, 29);
  font-size: 1.3rem;
}


</style>
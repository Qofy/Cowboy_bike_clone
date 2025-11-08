<script>
  import HeroSection from "./HeroSection.svelte";
  import Main from "./Main.svelte";
	import OverView from "./OverView.svelte";
	import StickeyHeader from "./StickeyHeader.svelte";
</script>
<!-- <StickeyHeader/> -->
<div class="main">
  <HeroSection/>

  <Main/>
  <OverView/>
</div>

<style>
  /* .main{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
</style>
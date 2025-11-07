<script>
  import HeroSection from "./HeroSection.svelte";
  import Main from "./Main.svelte";
	import OverView from "./OverView.svelte";
</script>

<div class="main">
  <HeroSection/>
  <Main/>
  <OverView/>
</div>

<style>
  .main{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
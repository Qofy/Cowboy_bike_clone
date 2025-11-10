<script>
	import { onMount } from "svelte";
  import bgVideo from "../images/bgVideo.mp4"

  onMount(async()=>{
     try {
      const response = await fetch("http://localhost:3002/0");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      // Check if response has a 'data' property (array of products)
      if (json.data && Array.isArray(json.data)) {
        data = json.data;
      } else if (Array.isArray(json)) {
        data = json;
      } else {
        data = [];
      }
      
      console.log("Fetched accessories:", data.slice(0,6));
    } catch(err) {
      error = err.message;
      console.error('Error fetching accessories:', err);
    } finally {
      loading = false;
    }
  })
</script>

<div class="z-[-100]">
  <!-- svelte-ignore a11y_media_has_caption -->
  <video autoplay mute loop>
    <source src={bgVideo} type="video/mp4">
  </video>
  <div></div>
</div>
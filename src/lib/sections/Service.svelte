<script>
	import { onMount } from "svelte";
  import bgVideo from "../images/bgVideo.mp4"
  import "../style/style.css"
  
  let data = [];
  let loading = true;
  let error = null;
  
  onMount(async()=>{
     try {
      const response = await fetch("http://localhost:3002/0");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      // The structure is: [{data: {services: [...]}}]
      if (json.data && json.data.services && Array.isArray(json.data.services)) {
        data = json.data.services;
      } else if (Array.isArray(json)) {
        data = json;
      } else {
        data = [];
      }
      
      console.log("Fetched services:", data.slice(0,6));
    } catch(err) {
      error = err.message;
      console.error('Error fetching services:', err);
    } finally {
      loading = false;
    }
  })
</script>

<div>
  {#if loading}
    <p>Loading services...</p>
  {:else if error}
    <p>Error loading services: {error}</p>
  {:else if data.length === 0}
    <p>No services available.</p>
  {:else}
    <!-- svelte-ignore a11y_media_has_caption -->
    <video autoplay muted loop class="z-[-100]">
      <source src={bgVideo} type="video/mp4">
    </video>
    <div class="flex flex-wrap gap-4 p-8">
      {#each data as item (item.postId)}
        <div 
          style="background-image: url('{item.src}'); background-size: cover; background-position: center;"
          class="w-64 h-64 rounded-lg flex items-end p-4"
        >
          <div class="bg-black/60 text-white p-2 rounded">
            <h3 class="font-bold">{item.title}</h3>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
<script>
	import { onMount } from "svelte";
  import bgVideo from "../images/bgVideo.mp4"
  import "../style/style.css"
  
  let data = [];
  let loading = true;
  let error = null;
  
  // Function to handle image errors - returns a placeholder
  function getImageUrl(item) {
    // Try to use a local fallback or placeholder
    // You can replace this with actual local images if you have them
    return `https://placehold.co/400x400/1a1a1a/white?text=${encodeURIComponent(item.src)}`;

  }
  
 
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
    <video autoplay muted loop class="z-[-100] ">
      <source src={bgVideo} type="video/mp4">
    </video>
    <div class="grid grid-cols-5 gap-4 p-8 w-full">
      {#each data as item (item.postId)}
        <div 
          style="background-image: url('{getImageUrl(item)}'); background-size: cover; background-position: center;"
          class="w-64 h-64 rounded-lg flex items-end p-4 border border-gray-700"
        >
          <div class="bg-black/60 text-white p-2 rounded w-full">
            <h3 class="font-bold text-sm">{item.title}</h3>
            {#if item.text}
              <p class="text-xs mt-1 line-clamp-2">{item.text}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
<script>
  import "../style/style.css"
  import { onMount } from "svelte";

  let paragh = 'Of accessories there are pack bags from Ortlieb and Brompton (including all spare parts, buckles, hooks and eyelets), baskets from Basil and Klickfix, Abus locks, tube and rack time luggage carrier, saddles from Brooks, SQ-Lab, Terry and Selle Royal, handles by Ergon, SQ-Lab, Brooks, Velospring and many more, tires from Schwalbe and many more. We are Shimano Service Center, Pinion Premium Partner, Rohloff and Gates specialists, have spare parts for Magura and Rohloff in stock and what is not there, we can usually order within a week. Here is only a small cross-section of our range. There is more in our shop - just visit us to browse.';

  let data = [];
  let loading = true;
  let error = null;
  let scrollContainer;

  onMount(async() => {
    try {
      const response = await fetch("http://localhost:3001/0");
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

    // Auto-scroll every 30 seconds
    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const currentScroll = scrollContainer.scrollLeft;
        
        // If at the end, scroll back to start, otherwise scroll right
        if (currentScroll >= maxScroll - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: scrollContainer.clientWidth, behavior: 'smooth' });
        }
      }
    }, 10000);

    // Cleanup interval on component destroy
    return () => clearInterval(scrollInterval);
  });
</script>

<div id="accessories">
  <h1 class="text-[2rem] text-center text-[#c51a1b]">
    Accessories and spare parts
  </h1>
  <p class="text-center w-2xl my-0 mx-auto">
    {paragh}
  </p>

  {#if loading}
    <div class="text-center p-8">
      <p>Loading accessories...</p>
    </div>
  {:else if error}
    <div class="text-center p-8 text-red-600">
      <p>Error: {error}</p>
    </div>
  {:else if data.length === 0}
    <div class="text-center p-8">
      <p>No accessories found.</p>
    </div>
  {:else}
  <!-- <div class="absolute inset-0 bg-linear-to-b from-black/50 via-[#f3e7c5]/30 to-[#181717]/30 z-10"></div> -->
    <div bind:this={scrollContainer} class="grid grid-cols-5 gap-94 p-8 w-full overflow-x-scroll overflow-y-hidden relative scrollbar-hide">
      {#each data.slice(5, 10) as item (item.postId)}
      <div 
        class="h-150 w-90 bg-amber-200 relative bg-cover bg-center rounded-md flex items-end sepia-0 p-1.5"
        style="background-image: url('{item.file}');"
      >   
      <h3 class="text-[2.5rem] font-semibold mb-2 text-white w-full p-2 ">{item.title}</h3>
       <a 
            href={item.link} 
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-white text-sm bg-[#c51a1b] px-4 py-1 rounded-[50px] absolute font-bold"
          >
            more >
          </a>
        <!-- </div> -->
      </div>
     
      <!-- <div class="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-[#e9e1ce]"> -->
          <!-- 
          <p class="text-sm text-gray-600 mb-4">{item.text}</p>
          <a 
            href={item.link} 
            target="_blank"
            rel="noopener noreferrer"
            class="text-white hover:text-white text-sm bg-[#c51a1b] px-4 py-1 rounded-[50px]"
          >
            more >
          </a> -->
        <!-- </div> -->
      {/each}
    </div>
    {/if}
    <div class="flex justify-center mt-8">
      <!-- svelte-ignore a11y_invalid_attribute -->
      <a href="#" class="bg-[#c51a1b] text-white px-5 py-2.5 rounded-[50px] font-bold"> View all > </a>
    </div>
</div>

<style>
  .scrollbar-hide {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
  }
</style>
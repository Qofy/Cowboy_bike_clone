<script>
  import { onMount } from 'svelte';
  import BikeCard from './BikeCard.svelte';
  import { currentFilter } from '$lib/stores/contentStore';

  const bikeCardClass = "bike-card";
  const imgClass = "img";
  const contentClass = "content";
  const MoreInfoClass = "more-info";

  let Bike_data = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3003/0");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      // Handle the data structure (could be array or nested object)
      if (Array.isArray(json)) {
        Bike_data = json;
      } else if (json.data && Array.isArray(json.data)) {
        Bike_data = json.data;
      } else {
        Bike_data = [];
      }
      
      console.log("Fetched bikes:", Bike_data.length);
    } catch(err) {
      error = err.message;
      console.error('Error fetching bikes:', err);
    } finally {
      loading = false;
    }
  });

  // Get taxonomy classes for a bike
  function getTaxonomyClasses(bike) {
    if (!bike.taxonomies_slugged) return '';
    return Object.keys(bike.taxonomies_slugged).join(' ');
  }

  // Apply filter using inline styles for flexible matching
  $: if (typeof document !== 'undefined' && Bike_data.length > 0 && $currentFilter !== undefined) {
    setTimeout(() => {
      const allWrappers = document.querySelectorAll('.bike-wrapper');
      let count = 0;
      
      allWrappers.forEach(wrapper => {
        if ($currentFilter === 'all' || $currentFilter === '') {
          wrapper.style.display = 'block';
          count++;
        } else {
          // Check if wrapper has a class that matches the filter (flexible matching)
          const classes = wrapper.className.split(' ');
          const hasMatch = classes.some(cls => 
            cls.toLowerCase().includes($currentFilter.toLowerCase()) ||
            $currentFilter.toLowerCase().includes(cls.toLowerCase())
          );
          
          if (hasMatch) {
            wrapper.style.display = 'block';
            count++;
          } else {
            wrapper.style.display = 'none';
          }
        }
      });
      
      visibleCount = count;
    }, 50);
  }
  
  let visibleCount = 0;
</script>

<section class="content-wrapper" data-filter={$currentFilter}>
  <div class="content-header">
    <h1>
      {#if $currentFilter === 'all' || $currentFilter === '' || !$currentFilter}
        All Bikes
      {:else}
        {$currentFilter.charAt(0).toUpperCase() + $currentFilter.slice(1)} Bikes
      {/if}
      <span class="count">({visibleCount})</span>
    </h1>
  </div>

  {#if loading}
    <div class="loading">
      <p>Loading bikes...</p>
    </div>
  {:else if error}
    <div class="error">
      <h3>Error loading bikes</h3>
      <p>{error}</p>
      <p>Make sure the json-server is running on port 3003</p>
    </div>
  {:else}
    <div class="bikes-grid">
      {#each Bike_data as bike, index}
        <div class="bike-wrapper {getTaxonomyClasses(bike)}">
          <BikeCard
            {bike}
            {index}
            {bikeCardClass}
            {imgClass}
            {contentClass}
            {MoreInfoClass}
          />
        </div>
      {/each}
    </div>
    {#if visibleCount === 0}
      <div class="no-results">
        <h3>No bikes found</h3>
        <p>No bikes match the current filter: <strong>{$currentFilter}</strong></p>
        <p>Try selecting a different category from the sidebar.</p>
      </div>
    {/if}
  {/if}
</section>

<style>
  .bike-wrapper {
    display: none;
  }

  .stevens {
    display: none;
  }

  .content-wrapper {
    width: 100%;
  }

  .content-header {
    padding: 1.5rem 0;
    border-bottom: 3px solid #f3e7c5;
    margin-bottom: 2rem;
  }

  .content-header h1 {
    color: #181717;
    margin: 0;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
/* .stevens{
  display: none;
  width: 100rem;
} */
  .count {
    font-size: 1.2rem;
    color: #999;
    font-weight: normal;
  }

  .bikes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .bike-wrapper {
    display: block;
  }

  .loading,
  .error,
  .no-results {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, #f9f9f9, #f0f0f0);
    border-radius: 8px;
    border: 2px dashed #ddd;
  }

  .error {
    background: linear-gradient(135deg, #fff0f0, #ffe0e0);
    border-color: #ffcccc;
  }

  .loading p,
  .error h3,
  .no-results h3 {
    color: #2f2e2e;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  .loading p {
    font-size: 1.2rem;
  }

  .error p,
  .no-results p {
    color: #666;
    margin-bottom: 0.5rem;
  }

  @media (max-width: 1200px) {
    .bikes-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .content-header h1 {
      font-size: 1.5rem;
      gap: 0.5rem;
    }

    .bikes-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
  }
</style>
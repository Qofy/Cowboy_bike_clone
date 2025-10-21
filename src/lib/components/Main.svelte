<script>
  import BikeCard from './BikeCard.svelte';
  import Bike_data from '$lib/data/bike_data';
  import { currentFilter, filterContent } from '$lib/stores/contentStore';

  const bikeCardClass = "bike-card";
  const imgClass = "img";
  const contentClass = "content";
  const MoreInfoClass = "more-info";

  $: filteredBikes = filterContent(Bike_data, $currentFilter);
</script>

<section class="content-wrapper">
  <div class="content-header">
    <h1>
      {#if $currentFilter === 'all'}
        All Bikes
      {:else}
        {$currentFilter.charAt(0).toUpperCase() + $currentFilter.slice(1)} Bikes
      {/if}
      <span class="count">({filteredBikes.length})</span>
    </h1>
  </div>

  {#if filteredBikes.length > 0}
    <div class="bikes-grid">
      {#each filteredBikes as bike, index}
        <BikeCard
          {bike}
          {index}
          {bikeCardClass}
          {imgClass}
          {contentClass}
          {MoreInfoClass}
        />
      {/each}
    </div>
  {:else}
    <div class="no-results">
      <h3>No bikes found</h3>
      <p>No bikes match the current filter: <strong>{$currentFilter}</strong></p>
      <p>Try selecting a different category from the sidebar.</p>
    </div>
  {/if}
</section>

<style>
  .content-wrapper {
    width: 100%;
  }

  .content-header {
    padding: 1.5rem 0;
    border-bottom: 3px solid #fbb900;
    margin-bottom: 2rem;
  }

  .content-header h1 {
    color: #c51a1b;
    margin: 0;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

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

  .no-results {
    text-align: center;
    padding: 3rem;
    background: linear-gradient(135deg, #f9f9f9, #f0f0f0);
    border-radius: 8px;
    border: 2px dashed #ddd;
  }

  .no-results h3 {
    color: #c51a1b;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

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
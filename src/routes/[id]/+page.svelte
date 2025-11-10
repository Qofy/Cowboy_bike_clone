<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  let item = null;
  let loading = true;
  let error = null;
  
  $: postId = $page.params.id;
  
  onMount(async () => {
    try {
      const response = await fetch("http://localhost:3003/0");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      
      let bikes = [];
      if (Array.isArray(json)) {
        bikes = json;
      } else if (json.data && Array.isArray(json.data)) {
        bikes = json.data;
      }
      
      // Find the bike by postId
      item = bikes.find(bike => bike.postId === postId || bike.id === parseInt(postId));
      
      if (!item) {
        error = 'Bike not found';
      }
    } catch(err) {
      error = err.message;
      console.error('Error fetching bike details:', err);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{item ? (item.title || item.name) : 'Item Not Found'} - Velophil</title>
</svelte:head>

<main>
  <!-- <Header showHero={false} /> -->
  
  {#if loading}
    <section class="loading-section">
      <div class="container">
        <p>Loading bike details...</p>
      </div>
    </section>
  {:else if error || !item}
    <section class="not-found">
      <div class="container">
        <h1>Item Not Found</h1>
        <p>Sorry, we couldn't find the item you're looking for.</p>
        {#if error}
          <p class="error-msg">{error}</p>
        {/if}
        <a href="/" class="btn-primary">Back to Home</a>
      </div>
    </section>
  {:else}
    <section class="item-detail">
      <div class="item-container">
        <div class="item-image">
          <img src={item.file || item.src || item.image} alt={item.title || item.name} />
        </div>
        
        <div class="item-info">
          <div class="breadcrumb">
            <a href="/">Home</a> › 
            <a href="/">Bikes</a> › 
            <span>{item.title || item.name}</span>
          </div>
          
          <h1>{item.title || item.name}</h1>
          
          {#if item.price}
            <div class="price">
              <span class="price-label">Price:</span>
              <span class="price-value">${item.price}</span>
            </div>
          {/if}
          
          <div class="description">
            <h3>Description</h3>
            <p>{@html item.text || item.description || 'No description available.'}</p>
          </div>
          
          {#if item.taxonomies_named_slugged}
            <div class="taxonomies">
              <h3>Details</h3>
              <div class="taxonomy-grid">
                {#each Object.entries(item.taxonomies_named_slugged) as [key, value]}
                  <div class="taxonomy-item">
                    <span class="taxonomy-label">{value}:</span>
                    <span class="taxonomy-value">{key}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
          
        </div>
      </div>
    </section>
  {/if}
  
</main>

<style>
  main {
    width: 1200px;
    margin: 20px auto;
  }
  
  .item-detail {
    padding: 2rem;
  }
  
  .item-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 2rem;
  }
  
  .item-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 2rem;
  }
  
  .item-image img {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
  }
  
  .item-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .breadcrumb {
    color: #666;
    font-size: 0.9rem;
  }
  
  .breadcrumb a {
    color: #c51a1b;
    text-decoration: none;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .item-info h1 {
    color: #c51a1b;
    font-size: 2rem;
    margin: 0;
  }
  
  .price {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
  }
  
  .price-label {
    color: #666;
    font-weight: 500;
  }
  
  .price-value {
    color: #c51a1b;
    font-weight: bold;
  }
  
  .description h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  .description p {
    color: #666;
    line-height: 1.6;
  }
  
  .taxonomies {
    margin-top: 2rem;
  }
  
  .taxonomies h3 {
    color: #333;
    margin-bottom: 1rem;
  }
  
  .taxonomy-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .taxonomy-item {
    background-color: #f5f5f5;
    padding: 0.75rem;
    border-radius: 4px;
    border-left: 3px solid #c51a1b;
  }
  
  .taxonomy-label {
    font-weight: 600;
    color: #333;
    margin-right: 0.5rem;
  }
  
  .taxonomy-value {
    color: #666;
    text-transform: capitalize;
  }
  
  .loading-section {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .loading-section p {
    font-size: 1.2rem;
    color: #666;
  }
  
  .error-msg {
    color: #c51a1b;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
  
  .btn-primary {
    background-color: #c51a1b;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }
  
  .btn-primary:hover {
    background-color: #a01517;
  }
  
  .not-found {
    text-align: center;
    padding: 4rem 2rem;
  }
  
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .not-found h1 {
    color: #c51a1b;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .not-found p {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    main {
      width: 100%;
      margin: 10px;
    }
    
    .item-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
  }
</style>
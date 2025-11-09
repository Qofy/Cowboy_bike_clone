<script>
  import { page } from '$app/stores';
  import Bike_data from '../../lib/data/bike_data.js';
  $: id = parseInt($page.params.id);
  $: item = Bike_data.find(bike => bike.id === id);
</script>

<svelte:head>
  <title>{item ? item.name : 'Item Not Found'} - Velophil</title>
</svelte:head>

<main>
  <!-- <Header showHero={false} /> -->
  
  {#if item}
    <section class="item-detail">
      <div class="item-container">
        <div class="item-image">
          <img src={item.image} alt={item.name} />
        </div>
        
        <div class="item-info">
          <div class="breadcrumb">
            <a href="/">Home</a> › 
            <a href="/">Bikes</a> › 
            <span>{item.name}</span>
          </div>
          
          <h1>{item.name}</h1>
          
          <div class="price">
            <span class="price-label">Price:</span>
            <span class="price-value">${item.price}</span>
          </div>
          
          <div class="description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>
          
        </div>
      </div>
    </section>
  {:else}
    <section class="not-found">
      <div class="container">
        <h1>Item Not Found</h1>
        <p>Sorry, we couldn't find the item you're looking for.</p>
        <a href="/" class="btn-primary">Back to Home</a>
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
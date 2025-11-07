<script>
  let { 
    bike,
    index,
    bikeCardClass = "bike-card",
    imgClass = "img",
    contentClass = "content",
    MoreInfoClass = "more-info"
  } = $props();
</script>

<div class={bikeCardClass}>
  <a href="/{bike.id || (index + 1)}" class={imgClass}>
    <img src={bike.image} alt={bike.name} />
  </a>
  <div class={contentClass}>
    <h2>{bike.name}</h2>
    <p>{bike.description}</p>
    <div class="price">
      <span class="price-label">Price:</span>
      <span class="price-value">${bike.price}</span>
    </div>
  </div>
  <a href="/{bike.id || (index + 1)}" class={MoreInfoClass}>More Info</a>
</div>

<style>
  .bike-card {
    border: 1px solid #ddd;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 450px;
    background-image: linear-gradient(to top, #ffffff, #fdfdfd);
    margin: 0;
    padding: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
  }

  .bike-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .img {
    width: 100%;
    height: 225px;
    display: block;
    text-decoration: none;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .content {
    padding: 1rem;
    height: 200px;
    background-image: linear-gradient(to bottom, #faf3de, #f6f3ec);
    display: flex;
    flex-direction: column;
  }

  .content h2 {
    color: #1b1a1a;
    margin-bottom: 0.5rem;
  }

  .content p {
    color: #727070;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .price {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .price-label {
    color: #666;
    font-weight: 500;
  }

  .price-value {
    color: #c51a1b;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .more-info {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: inline-block;
    padding: 8px 16px;
    background-color: #f1e8db;
    color: rgb(36, 35, 35);
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
    z-index: 10;
  }

  .bike-card:hover .more-info {
    opacity: 1;
    transform: scale(1);
  }
</style>
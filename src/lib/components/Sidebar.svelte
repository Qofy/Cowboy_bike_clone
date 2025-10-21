<script>
  import { currentFilter } from '$lib/stores/contentStore';
  
  // Define sidebar content categories
  const sidebarItems = {
    brands: {
      name: 'Brands',
      items: ['All Brands', 'VSF', 'Tout Terrain', 'Brompton', 'Giant', 'Trek', 'Specialized', 'Cannondale', 'Scott', 'Bianchi'],
      keys: ['all', 'vsf', 'tout terrain', 'brompton', 'giant', 'trek', 'specialized', 'cannondale', 'scott', 'bianchi']
    },
    types: {
      name: 'Bicycle Types',
      items: ['All Types', 'Mountain', 'Road', 'Hybrid', 'Electric', 'Folding'],
      keys: ['all', 'mountain', 'road', 'hybrid', 'electric', 'folding']
    },
    drive: {
      name: 'Drive Systems',
      items: ['All Drives', 'Chain', 'Belt', 'Gear', 'Single Speed'],
      keys: ['all', 'chain', 'belt', 'gear', 'single speed']
    }
  };
  
  // Current active filter
  let activeFilter = 'all';
  
  // Function to handle filter selection
  function handleFilterClick(filterKey, event) {
    event.preventDefault();
    activeFilter = filterKey;
    currentFilter.set(filterKey);
  }
</script>

<aside class="sidebar">
  {#each Object.entries(sidebarItems) as [categoryKey, { name, items, keys }]}
    <div class="sidebar-section">
      <h2>{name}</h2>
      <nav>
        <ul>
          {#each items as item, index}
            <li class:active={activeFilter === keys[index]}>
              <button 
                class="filter-button"
                class:current={activeFilter === keys[index]}
                on:click={(event) => handleFilterClick(keys[index], event)}
              >
                {item}
              </button>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  {/each} 
</aside>

<style>
  .sidebar {
    width: 20rem;
    height: 60rem;
    background-image: linear-gradient(to bottom, #fbb900, #f6d98b);
    border-radius: 5px;
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .sidebar-section {
    margin-bottom: 2rem;
  }

  .sidebar-section:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
    font-weight: bold;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  nav li {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  nav li:hover {
    background-color: #f6c746;
    transform: translateX(2px);
  }

  nav li.active {
    background-color: #e6a700;
    border-left: 4px solid #c51a1b;
  }

  .filter-button {
    background: none;
    border: none;
    text-decoration: none;
    color: #504d4d;
    font-size: 1rem;
    font-weight: 500;
    display: block;
    width: 100%;
    text-align: left;
    padding: 0;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .filter-button:hover {
    color: #2c2c2c;
  }

  .filter-button.current {
    color: #ffffff;
    font-weight: bold;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }
    
    .sidebar-section {
      margin-bottom: 1rem;
    }
  }
</style>
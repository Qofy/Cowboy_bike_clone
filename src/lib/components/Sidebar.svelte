<script>
  import { onMount } from 'svelte';
  import { currentFilter } from '$lib/stores/contentStore';
  
  let sidebarItems = {
    marke: { name: 'Marke', items: [], keys: [] },
    fahrradtyp: { name: 'Fahrradtyp', items: [], keys: [] },
    antrieb: { name: 'Antrieb', items: [], keys: [] }
  };
  
  let loading = true;
  
  // Current active filter - default to Velotraum
  let activeFilter = 'velotraum';
  
  // Function to extract unique values from taxonomies
  function extractCategories(bikes) {
    const marke = new Set();
    const fahrradtyp = new Set();
    const antrieb = new Set();
    
    bikes.forEach(bike => {
      if (bike.taxonomies_slugged) {
        Object.entries(bike.taxonomies_slugged).forEach(([key, category]) => {
          if (category === 'marke') {
            marke.add(key);
          } else if (category === 'fahrradtyp') {
            fahrradtyp.add(key);
          } else if (category === 'antrieb') {
            antrieb.add(key);
          }
        });
      }
    });
    
    // Convert to sorted arrays (without 'all')
    const markeKeys = Array.from(marke).sort();
    const fahrradtypKeys = Array.from(fahrradtyp).sort();
    const antriebKeys = Array.from(antrieb).sort();
    
    // Create display names (capitalize properly)
    const formatLabel = (key) => {
      return key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    
    sidebarItems = {
      marke: {
        name: 'Marke',
        items: markeKeys.map(formatLabel),
        keys: markeKeys
      },
      fahrradtyp: {
        name: 'Fahrradtyp',
        items: fahrradtypKeys.map(formatLabel),
        keys: fahrradtypKeys
      },
      antrieb: {
        name: 'Antrieb',
        items: antriebKeys.map(formatLabel),
        keys: antriebKeys
      }
    };
  }
  
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
      
      extractCategories(bikes);
    } catch(err) {
      console.error('Error fetching sidebar data:', err);
      // Keep default empty state
    } finally {
      loading = false;
      // Set default filter to velotraum
      currentFilter.set('velotraum');
    }
  });
  
  // Function to handle filter selection
  function handleFilterClick(filterKey, event) {
    event.preventDefault();
    activeFilter = filterKey;
    currentFilter.set(filterKey);
  }
</script>

<aside class="sidebar">
  {#if loading}
    <div class="loading-state">
      <p>Loading filters...</p>
    </div>
  {:else}
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
  {/if}
</aside>

<style>
  .sidebar {
    width: 20rem;
    /* height: 60rem; */
    background-image: linear-gradient(to bottom, #fbb900 14.44%, #f59e0b 81.18%);
    border-radius: 5px;
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .loading-state {
    text-align: center;
    padding: 2rem;
    color: #2c2c2c;
  }

  .loading-state p {
    font-size: 1rem;
    font-weight: 500;
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
    color: #201f1f;
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
    background-color: rgb(239, 230, 216);
    transform: translateX(2px);
  }

  nav li.active {
    background-color: rgb(248, 237, 219);
    border-left: 4px solid #c53f1a;
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
    color: #2d2c2c;
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
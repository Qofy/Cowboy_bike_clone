<script>
import logo from "../assets/logo.png";
  const navs = ["contact", "product-view"];

</script>


<header>
  <img src={logo} alt="Logo">
  <nav>
    {#each navs as nav}
      <li>
        <a href="javascript:void(0)">
          {nav}
        </a>
      </li>
    {/each}
  </nav>
</header>

<style>
  header{
    /* width: 100%; */
    height: 60px;
    display: flex;
    padding: 0 3.5rem;
    align-items: center;
    justify-content: space-between;
  }
header img{
  width: 120px;
}
nav{
  display: flex;
  gap: 2rem;
}

nav li{
  list-style: none;
  margin: 0;
}
nav a{
  text-decoration: none;
  color: rgb(29, 29, 29);
  font-size: 1.3rem;
}

</style>
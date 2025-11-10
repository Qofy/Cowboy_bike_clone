<script>
import Main from "$lib/components/Main.svelte";
import Sidebar from "$lib/components/Sidebar.svelte";
</script>


<div>
  <div>
    <div></div>
    <div></div>
  </div>
<div class="sort" id="wheels">
  <Sidebar/>
  <Main/>
</div>
</div>



<style>
  .sort{
    display: flex;
    gap: 2rem;
  }
</style>
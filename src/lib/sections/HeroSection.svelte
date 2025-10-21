<script>
  import Header from "./Header.svelte";
  let sub = "We are looking for reinfocements for the sales!"
</script>

<div class="content">
  <Header/>

  <div class="cts">
    <h2>{sub}</h2>
    <div>
      <img src="https://velophil.berlin/wp-content/uploads/2024/03/velophil-berlin-harz-Bikeventure_Ebike.png" alt="bike">
    </div>
  </div>
</div>

<style>
.content{
  height: 98dvh;
  width: 100%;
  background-image: linear-gradient(30deg, rgb(250, 242, 232) 14.44%, rgb(239, 230, 216) 81.18%);
}

.cts{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
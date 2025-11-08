<script>
  import Header from "./Header.svelte";
  import { onMount } from 'svelte';
	import StickeyHeader from "./StickeyHeader.svelte";
  import bg from "../images/bg.jpg"
  
  let sub = "We are looking for reinfocements for the sales!"
</script>

<div class="content">
  <Header/>
  <div class="cts">
      <img src={bg} alt="bike">
  </div>
  <div class="info">
    <div  class="info-content">
      <p>
        <strong>velophil</strong>.
        <br>
        Alt-Moabit 72 <br>
        10555 Berlin <br>
        030 39902116 <br>
        team@velophil.de <br>
      </p>
      <p>
        Verkauf: <br>
        Mo bis Fr 12.30 –19 <br>
        Samstag 10 –16 <br>
        Beratung g <br>
      </p>
        Werkstatt: <br>
        Mo bis Fr <br>
        9 –11 und 14 –19 <br>
        Samstag 10 –16 <br>
        Derzeit nur für <br>
        Bestandskunden <br>
      <p>

      </p>
    </div>
  </div>
  <button class="dir">
    &darr;
  </button>
</div>
<StickeyHeader/>

<style>
.content{
  height: 100dvh;
  width: 100%;
  /* background-image: linear-gradient(30deg, rgb(250, 242, 232) 14.44%, rgb(239, 230, 216) 81.18%); */
  position: relative;
  margin-bottom: 5rem;
  z-index: 200; 
}

.cts{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cts img{
  width: 100%;
  object-fit: cover;

}
.info{
   background-color: rgb(239, 230, 216); 
  width:200px;
  padding: 1rem;
  position: absolute;
  top: 229px;
  left: 230px;

  transform: rotate(-20deg);
}

.info-content{
  width: 140;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dir{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: none;
  color: #ffff;
  background-color: rgb(29, 29, 29);
  position: absolute;
  top: 76%;
  right: 40%;
}
</style>
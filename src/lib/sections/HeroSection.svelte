<script>
  import Header from "./Header.svelte";
  import { onMount } from 'svelte';
	import StickeyHeader from "./StickeyHeader.svelte";
  import bg from "../images/bg.jpg"
  
  let sub = "We are looking for reinfocements for the sales!"
</script>

<div class="content">
  <Header/>
  <!-- <div class="cts"> -->
    <div class="gradient-overlay"></div>
      <img src={bg} alt="bike">
  <!-- </div> -->
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
  /* background-image: linear-gradient(to bottom, #15151575 , rgba(128, 128, 128, 0.59), white); */

  z-index: 200; 
}
.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
   height: 100%;
  background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.46) 0%, rgba(44, 43, 43, 0.59) 50%, rgba(66, 66, 66, 0.8) 100%);
  pointer-events: none;
  z-index: 1;
}
/* .cts{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
} */
 img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(.8);
  /* background-image: linear-gradient(to bottom, #15151575 30%, rgba(128, 128, 128, 0.59) 50%, white 20%); */
}
.info{
   background-color: #f59e0b; 
  width:150px;
  padding: 1rem;
  position: absolute;
  top: 80px;
  left: 1255px;
  z-index: 100;

  /* transform: rotate(-20deg); */
}
.info:hover{
  background-color: #fabe57;
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
  z-index: 100;
}
</style>
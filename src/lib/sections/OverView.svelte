<script>
  import OverView from "../images/overview.png";
  import im1 from "../images/im1.png";
  import im2 from "../images/im2.png";
  import im3 from "../images/im3.png";
  import img4 from "../images/img4.png";
  import "../style/style.css"

  let header ="Meet the Easy Rider. With a raised <br>cockpit, curved handlebars and a <br> slim diamond frame, the cruiser is <br> made for relaxed sliding.";

  let imgs= [OverView, im1, im2, im3, img4];
  let src= imgs[0];
let yours_price = "2,999 €"
let already = 'Already off <span class="font-bold">257 €/month</span> or in 3 paments at 0% interest with <span class="font-bold">Klarna</span>'
</script>

<div class="main">
  <h1 class="headers text-[#c51a1b]">
    {@html header}
  </h1>

  <div class="img-overview">
    <div class="change">
      {#each imgs as image (image) }
        {#if image !== src}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
          <img id="change" src={image} alt="change" on:click={()=>{src = image}}>
        {/if}
      {/each}
    </div>
    <img src={src} alt="overviewImg">
  </div>
  
  <div class="my-0 mx-auto flex flex-col justify-center items-center">
    <p class="text-center text-[1.3rem]">Your form {yours_price}</p>
    <p class="text-center text-[1.3rem]">{@html already}</p>
    <div class="btn mt-5">
      <button class="px-18 bg-[#c51a1b] text-white py-4 rounded-[50px] hover:bg-[white] hover:text-[black]">Configure</button>
      <button class="px-12 bg-[#c51a1b] text-white py-4 rounded-[50px] hover:bg-[white] hover:text-[black]">Book a test drive</button>
    </div>
  </div>


</div>

<style>
.main{
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
}
.headers{
  text-align: center;
  font-weight: 400;
  font-size: 3.3rem;
  margin: 0;
 /* margin: 1 auto; */
 
}
.img-overview{
  width: 100%;
  display: flex;
  gap: .2rem;
}
.change{
  width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* background-color: #000; */
}
.change img{
  cursor: pointer;
  transition: opacity 0.3s;
  width: 90%;
}
.change img:hover{
  opacity: 0.7;
}
.img-overview > img{
 object-fit: cover;
 width: 100%;
}

#change{
  border-radius: 10px;
}
</style>
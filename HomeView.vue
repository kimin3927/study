<template>
  <div class="home">
    <div id="container">
      <div id="innerContainer"
        ref="reference"
      >
        <div v-for="(imgDiv,i) in imageSrc" :key="i"
         :style="{ backgroundImage: 'url(' + imgDiv + ')'}"
        class="slideImages"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data(){
    return {
      showCount: 0,
      slideTimer: null,
      imageSrc : [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4n4Ay2IA6SNOEnNhwxvKL-p9At_7v-kHKg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_e541vUYEO1cOekUYC-GlhCpAJD7OCgPwmg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt6-lV2IuMYTL767w_WKGWxRlz9il1txJRIg&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfzklRUHQ2uaS67yMkzpKXdz45Hr6wgcyQyA&usqp=CAU"
      ]
    }
  },
  mounted(){
    const slideStart = setInterval(()=>{
      this.showNext();
    }, 3000)
    this.slideTimer = slideStart;
  },
  destroyed() {
    clearInterval(this.slideTimer)
  },
  methods: {
    showNext(){
      this.showCount++;
      if(this.showCount == 3){
        this.$refs.reference.style.left = this.showCount * -1175 +"px";
        setTimeout(()=>{
          this.$refs.reference.style.transition = "0s";
          this.showCount = 0;
          this.$refs.reference.style.left = 0;
        }, 1500)
      } else {
        this.$refs.reference.style.transition = "1.5s";
        this.$refs.reference.style.left = this.showCount * -1175 +"px";
      }
    },
    showPrev(){
      this.showCount--;
      this.$refs.reference.style.left = this.showCount * -1175 +"px";
    }
  },
}
</script>


<style>

  .home{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    padding: 0 8% 0 8%;
    text-align: center;
  }

  #container{
    position: relative;
    width: 65%;
    height: 80%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  #innerContainer{
    position: absolute;
    width: 400%;
    height: 100%;
    transition: 1.5s;
  }

  .slideImages{
    float: left;
    height: 100%;
    width: 25%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  #image1{
    background-image: url("data:image/jpeg;base64,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");
  }

  #image2{
    background-image: url("https://www.walkerhillstory.com/wp-content/uploads/2020/09/2-1.jpg");
  }

  #image3{
    background-image: url("https://post-phinf.pstatic.net/MjAxOTA2MjRfMTcg/MDAxNTYxMzUzMjkyNjIx.oP-m6lCS0OfZtmZr3EggV6SXr8lZclr0NamrgZx1AIEg.RhB9HljEXJLXfDTBC23pXcEhKDrcSyS0p9GLAEeXWosg.JPEG/IMG_3231.jpg?type=w1200");
  }

  button{
    height: 100px;
  }
</style>
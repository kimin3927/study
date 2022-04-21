<template>
  <div>
    <ul id="entireMenu">
      <router-link 
      :to=item.path
      v-for="(item,i) in menuCollection" :key="i" 
      @click.native="selectMenu(i)" 
      :class="{ selected : item.status }" 
      class="menuItem"
      >
        
        <li >
          {{ item.text }}
        </li>
      </router-link>
    </ul>
    <div id="sliderContainer">
      <div id="slider"
        ref="slider"
      ></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "myList",
  props : ["menuCollection"],
  mounted(){
    this.setSliderWidth()
  },
  methods : {
    selectMenu(i){
      const selectedMenu = document.querySelectorAll(".menuItem")[i];
      const leftCoordinate = selectedMenu.getBoundingClientRect().x;
      const leftPercent = leftCoordinate * 100 / 1784;
      const slider = document.querySelector("#slider")
      slider.style.left = leftPercent + "%";
      slider.style.opacity = 1;
      for(let j = 0; j < this.menuCollection.length; j++){
        if(j == i){
          this.menuCollection[j].status = true;
        } else {
          this.menuCollection[j].status = false;
        }
      }
    },
    setSliderWidth(){
      const evenWidth = 1 / this.menuCollection.length * 2
      document.querySelector("#slider").style.width = evenWidth * "%";
    }
  }
}

</script>

<style>

  #slider{
    position: absolute;
    width: 10%;
    height: 5px;
    background-color: red;
    transition: 1s;
    top: 0;
    opacity: 0;
  }

  #sliderContainer{
    position: relative;
    width: 100%;
  }

  ul{
    position: relative;
    padding: 0;
  }

  li{
    display:inline-flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    height: 30px;
    
  }

  a{
    text-decoration: none;
    margin: 0;
    border: 1px solid black;
    font-size: 2vh;
    width: 10%;
  }

  .selected{
    color: black !important;
    background-color: skyblue;
  }



</style>
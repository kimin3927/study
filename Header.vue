<template>
  <div id="header">
    <div id="firstLine">김기민의 자기소개 페이지</div>
    <div id="secondLine">
      <my-menu :menuCollection="menu"></my-menu>
    </div>
  </div>
</template>


<script>
import myMenu from "../components/Mymenu.vue"

export default {
  data(){
    return {
      menu : [ 
       {text : "Home", path : "/", status: false},
       {text : "역사", path : "history", status: false},
       {text : "취향", path : "taste", status: false},
       {text : "가족", path : "family", status: false},
       {text : "MBTI", path : "MBTI", status: false},
      ]
    }
  },
  components:{
    myMenu
  },
  methods:{
  }
}
</script>

<style>

  #firstLine{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 800;
  }

  #secondLine{
    height: 50px;
  }

  ul{
    display: flex;
    height: 100%;
    margin: 0;
    justify-content:space-evenly;
  }
</style>
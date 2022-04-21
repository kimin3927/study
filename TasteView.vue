<template>
  


  <div class="outside-container">
    <div class="title">
      <h1>Your shopping cart</h1>
    </div>
    <div class="container">
      <div class="header row">
        <div class="header0">123</div>
        <div class="header1">
          ITEM
        </div>
        <div class="header2">
          AMOUNT
        </div>
        <div class="header3">
          PRICE
        </div>
        <div class="header4">
          TOTAL
        </div>
      </div>

      <div class="item1 row">
        <div class="item1-1">
          <img src="octopus.jpg" alt="문어">
        </div>
        <div class="item1-2">
          <b style="font-size: 23px;">SONY</b><br>FE 70-200mm F2.8 GM OSS
        </div>
        <div class="item1-3">
          1
        </div>
        <div class="item1-4">
          $2000.00
        </div>
        <div class="item1-5">
          $2000.00
        </div>
      </div>

      <div class="item2 row">
        <div class="item2-1">
          <img src="omu rice.jpg" alt="오므라이스">
        </div>
        <div class="item2-2">
          <b style="font-size: 23px;">SONY</b><br>Sonnar T*E 24mm F1.8 ZA
        </div>
        <div class="item2-3">
          1
        </div>
        <div class="item2-4">
          $2000.00
        </div>
        <div class="item2-5">
          $2000.00
        </div>
      </div>

      <div class="total">
        <div>$4000.00</div>
      </div>
    </div>
    <div class="edit">
      <a href="#">Edit your shopping cart</a>
    </div>
    <div class="button">
      <a href="#">Choose payment method</a>
    </div>
  </div>
</template>

<style>
    body {
      font-family: "calibri";
      background: beige;
    }
    .container {
      display: grid;
      gap: 0px;
      grid-template-areas:
      'header'
      'item1'
      'item2'
      'total';
      border-radius: 20px;
      padding: 20px 5px 20px 5px;
      background: white;
      width: 1000px;
      overflow: auto;
      margin: 0 auto;
      grid-area: container;
    }
    .container img {
      height: 130px;
      width: 140px;
      margin-bottom: -5px;
    }

    .header, .item1, .item2, .item3, .total{
      display:flex;
      justify-content: flex-end;
    }

    .header{
      grid-area: header;
    }

    .item1{
      grid-area: item1;
    }

    .item2{
      grid-area: item2;
    }

    .item3{
      grid-area: item3;
    }

    .total{
      grid-area: total;
      font-weight: bold;
      font-size: 25px;
    }

    .total > div {
      width: 13%;
    }

    .row{
      display:flex;
      align-items: center;
      border-bottom: 1px solid black;
    }

    .row > div:nth-child(1) {
      width: 20%
    }

    .row > div:nth-child(2) {
      width: 40%
    }

    .row > div:nth-child(3) {
      width: 13%
    }

    .row > div:nth-child(4) {
      width: 13%
    }

    .row > div:nth-child(5) {
      width: 13%
    }

    .button {
      padding: 15px;
      border-radius: 30px;
      background: lightblue;
      font-size: 20px;
      width: 250px;
      text-align: center;
      position: relative;
      left: 260px;
      grid-area: button;
    }
    .button a {
      text-decoration: none;
      font-weight: bold;
      color: black;
    }
    .edit a {
      color: navy;
      font-size: 18px;
    }
    .outside-container {
      display: grid;
      grid-template-areas: 
      'title title'
      'container container'
      'edit button';
      gap: 10px;
      width: 1000px;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    .title {
      grid-area: title;
    }
    .edit {
      grid-area: edit;
      padding: 10px;
    }
    

  </style>
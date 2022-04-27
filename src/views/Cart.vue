<template>
  <main>
    <h1>結帳</h1>
    <div class="main-container">
      <section class="checkout-process">
        <div class="stepper-wrapper ">
        <div class="step-item step-active ">
          <div class="circle "></div>
          <p class="step-title ">
            寄送地址
          </p>
        </div>
        <div class="step-item">
          <div class="circle"></div>
          <p class="step-title ">
            運送方式
          </p>
          <span class="step-line first"></span>
        </div>
        <div class="step-item">
          <div class="circle"></div>
          <p class="step-title ">
            付款資訊
          </p>
          <span class="step-line second"></span>
        </div>
        </div>
          <form action="">
            <div class="form-container mt-9">
              <StepAddress />
              <StepDelivery :deliveryOptions="deliveryOptions"/>
              <StepPayment />
            </div>
          </form>                         
      </section>
      <section class="cart">
        <div class="form-wrapper">
            <h1>購物籃</h1>
            <div class="cart-wrapper">
              <div class="cart-list d-flex flex-column">
                <ItemCard  />
              </div>
              <div class="shipping d-flex justify-content-between">
                <p>運費</p>
                <p>免費</p>
              </div>
              <div class="total-container d-flex justify-content-between">
                <p>小計</p>
                <p class="total">$5,298</p>
              </div>
            </div>
          </div>
      </section>
      <section class="button-group">
        <button class="btn-item pre-btn">
          <!-- <i class="fa-solid fa-arrow-left-long mr-4"></i> -->
          上一步 
        </button>
        <button class="btn-item next-btn active-btn first-step-btn">
          下一步 
          <!-- <i class="fa-solid fa-arrow-right-long ml-4"></i>  -->
        </button >
        <button class="btn-item submit-btn">
          確認下單
        </button>
      </section>
  </div>
  </main>
  
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import StepAddress from '../components/StepAddress.vue'
import StepDelivery from '../components/StepDelivery.vue'
import StepPayment from '../components/StepPayment.vue'
import ItemCard from '../components/ItemCard.vue'
const dummyCartItems = {
  Items:[
    {
      id: uuidv4(),
      name:'破壞補丁修身牛仔褲',
      price: 3999,
      image:'https://i.imgur.com/kzEnZuA.png',
      quantity: 1
    },
    {
      id:uuidv4(),
      name:'刷色直筒牛仔褲',
      price: 1299,
      image:'https://i.imgur.com/nV8dROD.png',
      quantity: 1
    }
  ]
}
const dummyDeliveryOptions={
  options:[
    {
      id: uuidv4(),
      method:'標準運送',
      fee: 0,
      transitTime: '約3~7個工作天'
    },
    {
      id:uuidv4(),
      method:'DHL貨運',
      fee: 500,
      transitTime: '48小時內送達'
    }
  ]
}
export default {
  name: 'cart',
  components: {
    StepAddress,
    StepDelivery,
    StepPayment,
    ItemCard  
  },
  data(){
    return{
      items:[],
      deliveryOptions:[]
    }
  },
  methods:{
    fetchCartItems(){
      this.items = dummyCartItems.Items
    },
    fetchDeliveryOptions(){
      this.deliveryOptions = dummyDeliveryOptions.options
    }
  },
  created(){
    this.fetchCartItems()
    this.fetchDeliveryOptions()
  }
}
</script>

<style lang="scss">
@import '../assets/scss/main.scss';
  // layout
  .main-container{
    padding-top: 3rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 70px 420px 70px;
    .checkout-process{
      grid-column: 1/7;
      grid-row: 1/3;
    }
    .cart{
      grid-column: 8/13;
      grid-row: 1/4;
    }
    .button-group {
      grid-column: 1/7;
      grid-row: 3/4; 
    }
  }
  .stepper-wrapper {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px,1fr)); 
  line-height: 100%;
  position: relative;
  .step-item{   
    display: flex;
    align-items: center;
    position: relative;
    @include stepperNum(3);
    color:  $label-font-color; 
    &:nth-child(3) {
      justify-content: flex-end;
    } 
    &:nth-child(2) {
      justify-content: center;
    }
    &.step-active {
      > .circle{
        background-color: $dark-dark-gray;
        color: $pale-gray;
      }
      > p {
        color: var(--title-font-color);
      }     
    } 
    &.checked {
      > .circle::after {
        content:"\2714";
        color:$pale-gray;
      }
    } 
  }
 .circle {  
   width: 32px;
   height: 32px;
   border: 1px solid $label-font-color;
   border-radius: 23px;
   text-align: center;
 }
 .step-title {
  //  display: none;
   padding: 5px;
   color: $label-font-color;
 }
 .step-line {
  position: absolute;
  height: 2px;
  width: 60px;
  background-color: var(--title-font-color);
  &.first {
    left: -35%;
  }
  &.second {
    left: -10%;
  }    
 }

  }
  .form-container {
    .select-wrapper{
    position: relative;
    select{
      cursor: pointer;   
      -webkit-appearance: none; 
      background-color: transparent;
      overflow-x: hidden; 
      color: var(--title-font-color);
    }
    &::after {
      content: "";
      border-style: solid;
      border-width: 8px 8px 0 8px;
      border-color: $light-gray transparent;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-25%);
      z-index: -1;     
    }               
    } 
    .form-row {
      margin-top: 1.1rem;
      width: 100%;   
        &.name-box {
          display: grid;
          grid-template-columns: 40% 55%;
          grid-gap: 5%;       
        }
    }
    input, select{
      @extend %input-style;
    }
    label{
      @extend %label-style;
    }
    select:invalid {
      color: $label-font-color;
    }
  
  }
  .button-group{
    position:relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $pale-gray;
    height: 70px;
    // margin-top: 2rem;
    padding-top: 24px;
    button{
      @extend %button-style;
      &.pre-btn {
        text-align: left;
        color: var(--title-font-color);
      }
      &.next-btn, &.submit-btn{
        background: $step-btn-color;
        color: $white;
      }
      i {
        font-size: 20px;
        transform: translateY(10%);     
      }
    }  
  
  }
  .cart {
  border: 1px solid var(--cart-border);
  border-radius: 5px;
  padding: 1rem 1rem 0 1rem;
  background-color: var(--cart-background-color);
  width: 100%;
   .shipping, .total-container {
    border-top: 1px solid $pale-gray;
    height: 70px;
    padding-top: 16px;
  }
  .shipping {
    p:nth-child(2){
      font-weight: 600;
    }
  }
  }
  

  
</style>
<template>
   <section class="checkout-process">
     <!-- stepper -->
    <div class="stepper-wrapper">
      <div 
        v-for="step in steps"
        :key="step.step"
        class="step-item" 
        :class="{ 'step-active': step.active , checked: step.checked}">
        <div class="circle "></div>
        <p class="step-title ">
          {{step.title}}
        </p>
      </div>
    </div>
    <form 
      @submit.stop.prevent="submitForm"
      action="">
      <div class="form-container mt-9">
        <!-- step address -->
        <div  v-show="nowStep === 1" class="form" id="step-address">
          <h2>寄送地址</h2>
          <div class="input-form-group">
            <div class="form-row name-box">
              <div class="form-item ">
                <label for="title">稱謂</label>
                <div class="select-wrapper">
                  <select v-model="checkoutInfo.gender" name="title" id="title">
                    <option disabled value="" selected>請選擇稱謂</option>
                    <option value="man" >先生</option>
                    <option value="woman">小姐</option>
                  </select>
                </div>
              </div>
              <div class="form-item">
                <label for="">姓名</label>
                <input v-model="checkoutInfo.name" type="text" name=" name" id="name" placeholder="請輸入姓名">
              </div>
            </div>
            <div class="form-row phone">
              <label for="phone">電話</label>
              <input v-model="checkoutInfo.tel" type="number" name="phone" id="phone" placeholder="請輸入行動電話">
            </div>
            <div class="form-row email">
              <label for="email">Email</label>
              <input v-model="checkoutInfo.email" type="email" name="email" id="email" placeholder="請輸入電子郵件">
            </div>
            <div class="form-row city">
              <label for="city">縣市</label>
              <div class="select-wrapper">
                <select v-model="checkoutInfo.selectedCity" name="city" id="city" class="city-select" required>
                  <option disabled value="" selected >請選擇縣市</option>
                  <option 
                    v-for ="city in cities"
                    :key="city.id"
                    :value="city.id"            
                  >
                  {{city.name}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row address-box">
              <label for="address">地址</label>
              <input v-model="checkoutInfo.address" type="text" name="address" id="address" placeholder="請輸入地址">
            </div>
          </div>
          
        </div>   
          <!--step delivery  -->
        <div v-show="nowStep === 2" class="form" id="step-delivery" >
          <h2>運送方式</h2>
          <div 
            v-for=" option in deliveryOptions"
            :key=" option.id"
            class="form-row d-flex">
            <div class="input-wrapper">
              <input 
                type="radio" 
                name="delivery-option" 
                :id="option.id" 
                :value="option.id"
                v-model="checkoutInfo.selectedDeliveryOption"
                @change="getDeliveryOption(option.fee)"
                >
            </div>
            <div class="label-wrapper">
              <label :for="option.id"> 
                {{option.method}}
              </label>
              <label :for="option.id">
                {{option.transitTime}}
              </label>
            </div>
            <label class="fee" :for="option.id">
              {{option.fee | filterFee}}
            </label>
          </div>   
        </div>
          <!-- step payment -->
        <div v-show="nowStep === 3" class="form" id="step-payment"> 
          <h2>付款資訊</h2>
          <div class="form-row card-owner">
            <label for="owner-name">持卡人姓名</label>
            <input v-model="checkoutInfo.cardOwner" type="text" name="owner-name" id="owner-name" placeholder="John Doe">
          </div>
          <div class="form-row number">
            <label for="card-number">卡號</label>
            <input v-model="checkoutInfo.cardNumber" type="text" name="card-number" id="card-number" placeholder="1111 2222 3333 4444">
          </div>
          <div class="form-row card-detail-box d-flex">
            <div class="form-item">
              <label for="valid-date">有效期限</label>
              <input v-model="checkoutInfo.cardValid" type="text" name="valid-date" id="valid-date" placeholder="MM/YY">
            </div>
            <div class="form-item">
              <label for="safety-num">CVC/CCV</label>
              <input v-model="checkoutInfo.cardSafetyNum" type="text" name="safety-num" id="safety-num" placeholder="123">
            </div>
          </div>
        </div> 
      </div>
        <!-- button -->
      <div class="button-group mt-9">
        <button
          v-show="nowStep !== 1" 
          @click.stop.prevent="lastStep"
          class="btn-item pre-btn">
        上一步 
        </button> 
        <button
          v-show="nowStep !== 3"
          @click.stop.prevent="nextStep"
          class="btn-item next-btn first-step-btn">
        下一步 
        </button >
        <button v-show="nowStep === 3" type="submit" class="btn-item submit-btn">
          確認下單
        </button>
      </div>
    </form>                         
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
const dummyData = [
  {id: uuidv4(),
  name:'臺北市'},
   {id: uuidv4(),
  name:'新北市'},
   {id: uuidv4(),
  name:'桃園市'},
   {id: uuidv4(),
  name:'臺中市'},
   {id: uuidv4(),
  name:'臺南市'},
   {id: uuidv4(),
  name:'高雄市'},
   {id: uuidv4(),
  name:'基隆市'},
   {id: uuidv4(),
  name:'新竹市'},
   {id: uuidv4(),
  name:'新竹縣'},
   {id: uuidv4(),
  name:'嘉義市'},
   {id: uuidv4(),
  name:'嘉義縣'},
   {id: uuidv4(),
  name:'苗栗縣'},
   {id: uuidv4(),
  name:'彰化縣'},
   {id: uuidv4(),
  name:'南投縣'},
  {id: uuidv4(),
  name:'雲林縣'},
  {id: uuidv4(),
  name:'南投縣'},
  {id: uuidv4(),
  name:'宜蘭縣'},
  {id: uuidv4(),
  name:'花蓮縣'},
  {id: uuidv4(),
  name:'臺東縣'},
  {id: uuidv4(),
  name:'澎湖縣'},
  {id: uuidv4(),
  name:'金門縣'},
  {id: uuidv4(),
  name:'連江縣'},

]
export default {
  name:'CheckoutForm',
  props: {
    deliveryOptions:{
      type: Array,
      required: true
    },
    cartItems:{
      type: Array,
      required: true
    }
  },
  data(){
    return{
      cities:[],
      nowStep: 1,
      steps:[
        {
          step: 1,
          title:'寄送地址',
          active:true,
          checked: false
        },
        {
          step: 2,
          title:'運送方式',
          active:false,
          checked: false
        },
        {
          step: 3,
          title:'付款資訊',
          active:false,
          checked: false
        }
       ],
      checkoutInfo:{   
        gender:'',
        name:'',
        tel:'',
        email:'',
        selectedCity:'',
        address:'',
        selectedDeliveryOption:'',
        cardOwner:'',
        cardNumber:'',
        cardValid:'',
        cardSafetyNum:''
      }
    }
    
  },
  methods:{
    fetchCities(){
      this.cities = dummyData
    },
    getDeliveryOption(fee){
      // 回傳父元件
      this.$emit('after-select-option', fee)
    },
    nextStep(){
      if(this.nowStep === this.steps.length) return
      //checked
      this.steps = this.steps.map( step => {
        if(step.step === this.nowStep) {
          step.checked = true
          return step
        }
        return step
      })
      this.nowStep += 1
      // active
      this.steps = this.steps.map(step => {
        if(step.step === this.nowStep){
          step.active = true
          return step
        }
        return step
      })              
    },
    lastStep(){
      if(this.nowStep === 1) return
      //unchecked, remove active
      this.steps = this.steps.map( step => {
        if(step.step === this.nowStep) {
          step.checked = false
          step.active = false
          return step
        }
        return step
      })
      this.nowStep -= 1
      //unchecked
      this.steps = this.steps.map( step => {
        if(step.step === this.nowStep) {
          step.checked = false
          return step
        }
        return step
      })
    },
    submitForm(){
      // 回傳後台伺服器
      console.log(
        '結帳和收件人data:',this.checkoutInfo, '購買商品:',this.cartItems)     
    }
  },
  created(){
    this.fetchCities()
  },
  filters:{
    filterFee(fee){
      return fee? '$'+ fee : '免費'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/main.scss';
  //form basic style
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
    .form {
      height: 320px;
    }
  }
  // step address form style
  .input-form-group {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.5rem 1rem;
    .form-row {
      &.name-box {
        grid-column: 1/7;
      }
      &.phone {
        grid-column: 1/4;
      }
      &.email {
        grid-column: 4/7;
      }
      &.city {
        grid-column: 1/3;
      }
      &.address-box {
        grid-column: 3/7;

      }
    }
  }
  // step delivery style
  #step-delivery {
    margin-top: 60px;
    .label-wrapper{
      display: flex;
      flex-flow: column;
    }   
    .form-row {
      border: 1px solid $label-font-color;
      border-radius: 5px;
      max-width: 465px;
      height: 60px;
      align-items: center;
      
     //input radio樣式
      input[type = "radio"]{
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border:  1px solid var(--radio-border);
        border-radius: 50%; 
        background-color: var(--input-radio);
        cursor: pointer;       
        &:checked {     
          border: 6px solid var(--radio-border);
          background-color:white;
        }
      } 
      .label-wrapper{
        flex: 1;
        label{
          cursor: pointer;
          padding-bottom: 0;
          font-size: 1rem;
          color: black;
          &:nth-child(2){
            font-size: 12px;
          }
        }       
      }
      .input-wrapper{
        display: flex;
        justify-content: center;
      }
      .fee, .input-wrapper{
        flex-basis: 50px;
      }
      .fee {
        color: black;
      }
      &:hover {
        border-color: var(--title-font-color);
        border-width: 2px;
      }
      // dhl粗體
      &:nth-child(3){
        .label-wrapper{
          label:nth-child(1){
            font-weight: 700;
          }
        }
      }
    }
  }
  // step payment style
  #step-payment{
    margin-top: 60px;
    .card-owner, .number{
      max-width: 350px;
    }
    .card-detail-box{
      justify-content: space-between;    
      .form-item {
        flex-basis: 45%;
        &:nth-child(1) > input{
          -webkit-appearance: none;
          &:invalid {
            color: $light-gray;
          }
        }
      }      
    }   
  }
  // stepper style
  .stepper-wrapper {
    display: flex;
    justify-content: space-between;
    line-height: 100%;
    position: relative;
    .step-title::after{
      content: '';
      width: 60px;
      height: 3px;
      display: inline-block;
      background: black;
      margin-left: 1.2rem;
      transform: translateY(-4px);            
    }
    > div:last-child>.step-title::after{
      display: none;
    }
    .step-item{   
    display: flex;
    align-items: center;
    @include stepperNum(3);
    color:  $label-font-color; 
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
      padding: 5px;
      color: $label-font-color;
    }
  }
  .button-group{
    position:relative;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid $pale-gray;
    height: 70px;
    padding-top: 24px;
    button{
      @extend %button-style;
      &.pre-btn {
        grid-column: 1/2;
        text-align: left;
        color: var(--title-font-color);
      }
      &.next-btn, &.submit-btn{
        grid-column: 3/4;
        background: $step-btn-color;
        color: $white;
      }
      i {
        font-size: 20px;
        transform: translateY(10%);     
      }
    }  
  
  }
</style>
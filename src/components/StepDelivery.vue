<template>
  <div id="step-delivery">
    <h2>運送方式</h2>
    <div class="form-row d-flex">
      <div class="input-wrapper">
        <input type="radio" name="normal" id="normal" value="normal">
      </div>
      <div class="label-wrapper">
        <label for="normal">標準運送</label>
        <label for="normal">約3~7個工作天</label>
      </div>
      <label class="fee" for="normal">免費</label>
    </div>
    <div class="form-row d-flex">
      <div class="input-wrapper">
        <input type="radio" name="normal" id="dhl" value="dhl">
      </div>
      <div class="label-wrapper">
        <label for="dhl">DHL貨運</label>
        <label for="dhl">48小時內送達</label>
      </div>
      <label class="fee" for="dhl">$500</label>
    </div>
  </div>
</template>

<script>
export default {
  // 帶入送貨方式資料
  name: 'StepDelivery',
  props: {
    deliveryOptions:{
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss';
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
</style>
<template>
  <div id="step-payment">
    <h2>付款資訊</h2>
    <div class="form-row card-owner">
      <label for="owner-name">持卡人姓名</label>
      <input type="text" name="owner-name" id="owner-name" placeholder="John Doe">
    </div>
    <div class="form-row number">
      <label for="card-number">卡號</label>
      <input type="text" name="card-number" id="card-number" placeholder="1111 2222 3333 4444">
    </div>
    <div class="form-row card-detail-box d-flex">
      <div class="form-item">
        <label for="valid-date">有效期限</label>
        <input type="text" name="valid-date" id="valid-date" placeholder="MM/YY">
      </div>
      <div class="form-item">
        <label for="safety-num">CVC/CCV</label>
        <input type="text" name="safety-num" id="safety-num" placeholder="123">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 父元件載入資料
}
</script>

<style lang="scss">
  @import '../assets/scss/main.scss';
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
</style>
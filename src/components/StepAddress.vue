<template>
  <div id="step-address">
    <h2>寄送地址</h2>
    <div class="form-row name-box">
      <div class="form-item ">
        <label for="title">稱謂</label>
        <div class="select-wrapper">
          <select name="title" id="title">
            <option value="mr">先生</option>
            <option value="ms">小姐</option>
          </select>
        </div>
      </div>
      <div class="form-item">
        <label for="">姓名</label>
        <input type="text" name=" name" id="name" placeholder="請輸入姓名">
      </div>
    </div>
    <div class="form-row phone">
      <label for="phone">電話</label>
      <input type="number" name="phone" id="phone" placeholder="請輸入行動電話">
    </div>
    <div class="form-row email">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="請輸入電子郵件">
    </div>
    <div class="form-row city">
      <label for="city">縣市</label>
      <div class="select-wrapper">
        <select name="city" id="city" class="city-select" required>
          <option disabled value="" selected >請選擇縣市</option>
          <option value="taipei">台北</option>
          <option value="kaohsiung">高雄</option>
        </select>
      </div>
    </div>
    <div class="form-row address-box">
      <label for="address">地址</label>
      <input type="text" name="address" id="address" placeholder="請輸入地址">
    </div>
  </div>
</template>
<style lang="scss">     
  #step-address {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.5rem 1rem;
    h2 {
      grid-column: 1/7;
    }
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
</style>
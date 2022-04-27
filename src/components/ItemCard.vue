<template>
  <div class="cart-item d-flex mb-4" data-id="1">
    <div class="item-img">
    <img src="" alt="">
    </div>
    <div class="item-detail d-flex ml-4">
      <div class="form-group">
        <label for="id-1-quantity">破壞補丁修身牛仔褲</label>
        <div class="input-container d-flex mt-4">
          <div class="input-quantity-control quantity-min" data-id="1" data-price="3999">-</div>
          <input type="number" min="0" name="id-1-quantity" id="id-1-quantity" class="quantity" data-id="1" data-price="3999">
          <div class="input-quantity-control quantity-plus" data-id="1" data-price="3999">+</div>
        </div>
      </div>
      <div class="price-container d-flex">
        <span>$</span>
        <p class="price" data-id="1">3,999</p>
      </div>                      
    </div>
  </div>
                  
</template>
<style lang="scss" scoped>
@import '../assets/scss/main.scss';
  .cart {
  span {
    color: var(--title-font-color);
  }
  h1 {
    line-height: 88px;
    font-size: 18px;
  }
  
  .cart-item{
    margin-bottom: 34px;
    .item-img{
      flex-basis: 100px;
      // width: 100px;
      height: 100px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .item-detail{
    flex: 1;
    align-items: center;
    .form-group{
      width: 100%;
    }
    .price {
      font-weight: 600;
    }   
  }
  // quantity input form
  .input-container {
    justify-content: flex-star;
    > .input-quantity-control{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: $quantity-btn;
      text-align: center;
      cursor: pointer;
      &:hover {
        box-shadow: 1px 1px 2px gray inset;
      }
    }
     input[type = "number"] {
      appearance: none;
      width: 53px;
      border: none;
      text-align: center;
      background: transparent;
      color: var(--title-font-color)
    }  
  }
 
}
</style>
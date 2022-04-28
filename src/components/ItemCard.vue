<template>
  <div class="item-cards-container">
    <div 
      class= "cart-item d-flex mb-4" data-id="1">
      <div class="item-img">
      <img :src="item.image" alt="">
      </div>
      <div class="item-detail d-flex ml-4">
        <div class="form-group">
          <label :for="item.id">{{item.name}}</label>
          <div class="input-container d-flex mt-4">
            <div 
              @click.stop.prevent="minusQuantity(item.quantity, item.price, item.itemTotal)"
              class="input-quantity-control quantity-min"
            >
              -
            </div>
            <div class="quantity-box">
              {{item.quantity}}
            </div>
            <div 
              @click.stop.prevent="plusQuantity(item.quantity, item.price)" 
              class="input-quantity-control quantity-plus"
            >
              +
            </div>
          </div>
        </div>
        <div class="price-container d-flex">
          <span>$</span>
          <p class="price" data-id="1">{{item.itemTotal}}</p>
        </div>                      
      </div>
    </div>
  </div>
  
                  
</template>

<script>
export default {
  name:'ItemCard',
  props:{
    initialItem:{
      type: Object,
      required: true
    }
  },
  data(){
    return {
      item: this.initialItem
    }
  },
  methods:{
    plusQuantity(quantity, price){
      this.item = {
        ...this.item,
        quantity: quantity+1,
        itemTotal: price + quantity * price 
      }
      this.$emit('after-add-quantity', this.item)
    },
    minusQuantity(quantity, price, itemTotal){
      if(itemTotal === 0) {
        this.item={
          ...this.item,
          quantity: 0,
          itemTotal: 0
        }
        this.$emit('after-minus-quantity', this.item)
        return
      }
      this.item = {
        ...this.item,
        quantity: quantity-1,
        itemTotal: itemTotal - price
      }
      this.$emit('after-minus-quantity', this.item)
    },
  },
  
}

</script>
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
  .quantity-box{
    width: 2rem;
    text-align: center;
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
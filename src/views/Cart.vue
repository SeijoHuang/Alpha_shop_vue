<template>
  <main>
    <h1>結帳</h1>
    <div class="main-container">
      <section class="checkout-process">
        <CheckoutForm
        :delivery-options="deliveryOptions"
        :cart-items="this.items"
        @after-select-option="afterSelectOption"
        />       
      </section>
      <section class="cart">
        <div class="form-wrapper">
            <h1>購物籃</h1>
            <div class="cart-wrapper">
              <div class="cart-list d-flex flex-column mt-9">
                <ItemCard 
                  v-for="item in items"
                  :key="item.id" 
                  :initial-item="item"
                  @after-add-quantity="afterAddQuantity"
                  @after-minus-quantity="afterMinusQuantity"
                />
              </div>
              <div class="shipping d-flex justify-content-between">
                <p>運費</p>
                <p>{{deliveryFee | filterFee}}</p>
              </div>
              <div class="total-container d-flex justify-content-between">
                <p>小計</p>
                <p class="total">{{'$'+ getTotal}}</p>
              </div>
            </div>
        </div>
      </section>
  </div>
  </main>
  
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import CheckoutForm from '../components/CheckoutForm.vue'
import ItemCard from '../components/ItemCard.vue'

const dummyCartItems = {
  "Items":[
    {
      id: uuidv4(),
      name:'破壞補丁修身牛仔褲',
      price: 3999,
      image:'https://i.imgur.com/kzEnZuA.png',
      quantity: 1,
      itemTotal: 3999
    },
    {
      id:uuidv4(),
      name:'刷色直筒牛仔褲',
      price: 1299,
      image:'https://i.imgur.com/nV8dROD.png',
      quantity: 1,
      itemTotal: 1299
    }
  ]
}
const dummyDeliveryOptions={
  "options":[
    {
      id: uuidv4(),
      method:'標準運送',
      fee: 0,
      transitTime: '約3~7個工作天',
    },
    {
      id:uuidv4(),
      method:'DHL貨運',
      fee: 500,
      transitTime: '48小時內送達',
    }
  ]
}
export default {
  name: 'cart',
  components: {
    CheckoutForm,
    ItemCard,  
  },
  data(){
    return{
      items:[],
      step:'address',
      deliveryOptions:[],
      deliveryFee: 0,
      checkoutInfo:{
        addresseeDetail:{
          gender:'',
          name:'',
          tel:'',
          email:'',
          selectedCity:'',
          address:''
        }
      },

    }
  },
  methods:{
    fetchCartItems(){
      this.items = dummyCartItems.Items
    },
    fetchDeliveryOptions(){
      this.deliveryOptions = dummyDeliveryOptions.options
    },
    //get item quantity from checkout form component
    afterAddQuantity(item){
      const {id,quantity, itemTotal} = item  
      this.items = this.items.map(item => {
        if(item.id === id) {
          return {
            ...item,
            quantity,
            itemTotal
          }
        }
        return item
      })
      
    },
    afterMinusQuantity(item){
      const {id,quantity, itemTotal} = item
      // if( quantity === 0 ){
      //   alert('確定要移除嗎？')
      //   this.items = this.items.filter(item => item.id !== id )
      //   console.log(this.items)
      //   return this.items
      // }
      this.items = this.items.map(item => {
        if(item.id === id) {
          return {
            ...item,
            quantity,
            itemTotal
          }
        }
        return item
      })
    },
    // delivery selected handler
    afterSelectOption(fee){
      this.deliveryFee = fee
    }
   
  },
  created(){
    this.fetchCartItems()
    this.fetchDeliveryOptions()
  },
  computed:{
    getTotal(){
      let total = 0
      this.items.forEach(item => {
        total += item.itemTotal     
      })
      total += this.deliveryFee
      return total
    }
  },
  filters:{
    filterFee(fee){
      return fee? '$'+ fee : '免費'
    }
  }
}
</script>

<style lang="scss" >
@import '../assets/scss/main.scss';
  // page layout
  .main-container{
    padding-top: 3rem;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    .checkout-process{
      grid-column: 1/7;
    }
    .cart{
      grid-column: 8/13;
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
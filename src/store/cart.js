import Vue from 'vue'
export default {
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || {}

  },
  getters: {
    total(state) {
        return (Object.values(state.cart)).reduce((sum, v) => {return sum += v} , 0)
    }
  },
  mutations: {
    cartfiy(state, data) {
      let {
        id,
        num
      } = data;
      state.cart[id] = num;
      localStorage.setItem('cart', JSON.stringify(state.cart))
      //   console.log(state.cart)
    },
    delete(state, id) {
      Vue.delete(state.cart, id);
      localStorage.setItem('cart',JSON.stringify(state.cart))
    }
  }




}

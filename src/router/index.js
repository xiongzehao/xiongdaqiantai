import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../components/shop/Shop.vue'
import goodsList from '../components/shop/goods/List.vue'
import goodsDetail from '../components/shop/goods/detail.vue'
import Cart from '../components/shop/shopcart/Cart.vue'
import Order from '../components/shop/shopcart/Order.vue'
import Pay from '../components/shop/shopcart/Pay.vue'
import Login from '../components/shop/login/Login.vue'

Vue.use(Router)

const goods = [{
    name: 'goodsList',
    path: '/',
    component: goodsList
  },
  {
    name: 'goodDetail',
    path: 'detail/:id',
    component: goodsDetail
  }, , {
    name: 'login',
    path: 'login',
    component: Login,
  }
]
const commodity = [{
    name: 'shopCart',
    path: 'shop/cart',
    component: Cart
  },
  {
    name: 'shopOrder',
    path: 'shop/order',
    component: Order
  }, {
    name: 'shopPay',
    path: 'shop/pay',
    component: Pay
  },
]

let router = new Router({
  routes: [{

    name: 'shop',
    path: '/',
    component: Shop,
    children: [...goods, ...commodity]
  }]
})

router.beforeEach((to, from, next) => {

  let isLogin = false;
  Vue.prototype.$axios.get(Vue.prototype.$api.isLogin).then(res => {
    if (res.data.code == "logined") {
      isLogin = true;
    }

    if (to.name.indexOf('shop') == 0) {
      if (isLogin) {
        next()
      } else {
        // 把用户要进入的地址通过query记录下来,登录后在跳回这个页面
        next({
          name: 'login',
          query: {
            next: to.fullPath
          }
        })
      }
    } else {
      next()
    }

     if(to.name =='login'){
       if(isLogin){
          next('/')
       }else{
         next()
       }
     }
  })

})
export default router

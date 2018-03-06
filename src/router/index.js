import Vue from 'vue'
import Router from 'vue-router'
import Shop from '../components/shop/Shop.vue'
import goodsList from '../components/shop/goods/List.vue'
import goodsDetail from '../components/shop/goods/detail.vue'

Vue.use(Router)

  const goods = [
     {name:'goodsList',path:'list',component:goodsList},
     {name:'goodDetail',path:'detail/:id',component:goodsDetail}
  ]

 let router = new Router({
  routes: [{

    name: 'shop',
    path: '/',
    component: Shop,
    children:[...goods]
  }]
})
export default router



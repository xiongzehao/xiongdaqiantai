<template>
    <div>
        <!-- 导航 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link>&gt;
                <router-link to="">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!-- 头部进度 -->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <!-- 商品列表 -->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-switch :value="allSelected" @change="sunSelected" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>

                                <tr v-for="(item,i) in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="item.selected" active-color="#13ce66"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt="">
                                        <span>{{item.title}}{{$store.state.cart[item.id]}}</span>
                                    </th>
                                    <th width="84" align="left">
                                        ￥{{item.sell_price}}
                                    </th>
                                    <th width="104" align="center">
                                        <el-input-number size="mini" :min="1" v-model="inputNum[i]"></el-input-number>
                                    </th>
                                    <th width="104" align="left">
                                        <td>￥{{item.sell_price * inputNum[i]}}</td>
                                    </th>
                                    <th width="54" align="center">
                                        <el-button size="mini" @click="del(item.id)">删除</el-button>
                                    </th>
                                </tr>

                                <tr v-if="goodsList.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{total}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="$router.go(-1)">继续购物</button>
                            <button class="button" @click="toOrder">立即结算</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      inputNum: [],
      inputObj: []
    };
  },
  methods: {
    // 获取购物车数据
    getGoods() {
      let ids = Object.keys(this.$store.state.cart);
      this.$axios.get(this.$api.shopcartGoods + ids).then(res => {
        if (res.data.status == 0) {
          res.data.message.forEach(v => (v.selected = true));
          this.goodsList = res.data.message;
          //   this.inputNum = res.data.message.map(
          //     v => this.$store.state.cart[v.id]
          //   );
          this.inputNum = Object.values(
            JSON.parse(localStorage.getItem("cart"))
          );
          this.inputObj = Object.keys(JSON.parse(localStorage.getItem("cart")))
      
        }
      });
    },
    sunSelected(value) {
      this.goodsList.forEach(v => (v.selected = value));
    },
    del(id) {
      this.goodsList = this.goodsList.filter(v => v.id != id);
      this.$store.commit("delete", id);
    },
    toOrder(){
         let ids = this.goodsList.map(v=>v.selected ?v.id:'')
        console.log(ids);
    }
  },
  created() {
    this.getGoods()
  },
  computed: {
    allSelected() {
      return this.goodsList.every(v => v.selected);
    },
    //  计算商品的总共件数
    total() {
      let num = 0;
      this.goodsList.forEach((v, i) => v.selected && (num += this.inputNum[i]));
      return num;
    },
    // 计算商品的总共价格
    totalPrice() {
      let sum = 0;
      this.goodsList.forEach(
        (v, i) => v.selected && (sum += this.inputNum[i] * v.sell_price)
      );
      return sum;
    }
  },
    // 监听商品数量
  watch: {
    inputNum() {
        //  商品数量发生了变化就重新设置存在session里面的值
      let rst = {};
      for (let i = 0; i < this.inputObj.length; i++) rst[this.inputObj[i]] = this.inputNum[i];
     
          localStorage.setItem('cart',JSON.stringify(rst))
    }
  
  }
};
</script>

<style>

</style>
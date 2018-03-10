<template>
    <div>
        <div class="section" v-for="item in content" :key="item.level1cateid">

            <!--子类-->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>

                    <router-link v-for="value in item.level2catelist" :key="value.subcateid" to="{name:'goodDetail'}">{{value.subcatetitle}}</router-link>

                    <a href="#">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li v-for="datas in item.datas" :key="datas.artID">
                            <router-link :to="{path:`detail/ ${datas.artID}`}">
                                <div class="img-box">
                                    <img :src="datas.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{datas.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{datas.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{datas.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{datas.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                           
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      content: []
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.$api.goodsContent).then(res => {
        this.content = res.data.message;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>

</style>
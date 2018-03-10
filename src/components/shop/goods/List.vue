<template>
    <div>
        <div class="section">

            <div class="location">
                <span>当前位置：</span>
                <span>首页</span> /
            </div>

        </div>

        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->

                                <li v-for="item in TopData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="value in item.subcates" :key="value.id">{{value.title}}&nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box" v-for="subcates in item.subcates" :key="subcates.id">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{subcates.title}}</a>
                                            </dt>
                                            <dd>

                                                <a href="/goods/43.html" v-for="subcates in item.subcates" :key="subcates.id">{{subcates.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">

                        <el-carousel height="341px">
                            <el-carousel-item v-for="item in TopData.sliderlist" :key="item.id" class="carousel-item">
                                <router-link :to="{name:'goodDetail',params:{id:item.id}}"> <img :src="item.img_url" alt="" width="100%" height="341px"></router-link>
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <m-aside :list="TopData.toplist"></m-aside>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>

        <m-content></m-content>
    </div>
</template>

<script>
import MAside from "../public/Aside.vue";
import MContent from "./module/Content";
export default {
  data() {
    return {
      TopData: {
        catelist: [],
        sliderlist: [],
        toplist: []
      }
    };
  },
  methods: {
    getTopData() {
      this.$axios.get(this.$api.goodsTop).then(res => {
        if (res.data.status == 0) {
          this.TopData = res.data.message;
        }
      });
    }
  },
  created() {
    this.getTopData();
  },
  components: {
    MAside,
    MContent
  }
};
</script>

<style >
.carousel-item {
  height: 100%;
}
</style>
<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/">首页</router-link> /
                <a>商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in detailData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>

                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>

                                            <span class="stock-txt">
                                                <el-input-number :min="0" size="mini" v-model="num7"></el-input-number>
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" onclick="cartAdd(this,'/',0,'/cart.html');">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->

                            <el-tabs type="border-card">
                                <el-tab-pane label="图文信息">
                                    <div v-html="goodsinfo.content"></div>
                                </el-tab-pane>
                                <el-tab-pane label="用户评论">
                                    <comment></comment>
                                </el-tab-pane>

                            </el-tabs>

                            <!--/选项卡-->

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->

                    <m-aside :list="detailData.hotgoodslist"></m-aside>

                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/lib/imgzoom/css/magnifier.css"
import "@/lib/imgzoom/js/magnifier.js"
import MAside from "../public/Aside"
import Comment from "./module/Comment"
import $ from 'jquery'
export default {
  data() {
    return {
      id: this.$route.params.id,
      num7: 1,
      detailData: {
        imglist: []
      },
      goodsinfo: {}
    };
  },
  methods: {
    getData() {
      this.$axios.get(this.$api.goodsDetail + this.id).then(res => {
        this.detailData = res.data.message;
        this.goodsinfo = res.data.message.goodsinfo;
      });
    }
  },
  created() {
    this.getData();
  },
  components: {
    MAside,
    Comment
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.getData();
       $(function() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };

      setTimeout(() => {
           var _magnifier = $().imgzoon(magnifierConfig);
      }, 500);

      /*magnifier的内置函数调用*/
      /*
		//设置magnifier函数的index属性
		_magnifier.setIndex(1);

		//重新载入主图,根据magnifier函数的index属性
		_magnifier.eqImg();
	*/
    });
    }
  },
  mounted() {
    $(function() {
      var magnifierConfig = {
        magnifier: "#magnifier1", //最外层的大容器
        width: 370, //承载容器宽
        height: 370, //承载容器高
        moveWidth: null, //如果设置了移动盒子的宽度，则不计算缩放比例
        zoom: 5 //缩放比例
      };

      setTimeout(() => {
           var _magnifier = $().imgzoon(magnifierConfig);
      }, 500);

      /*magnifier的内置函数调用*/
      /*
		//设置magnifier函数的index属性
		_magnifier.setIndex(1);

		//重新载入主图,根据magnifier函数的index属性
		_magnifier.eqImg();
	*/
    });
  }
};
</script>

<style scoped>

</style>
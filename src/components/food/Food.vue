<template>
    <div v-show="showFlag" class="food" ref='food'>
      <div class="food-content">
        <!-- 图片详情 -->
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="fa fa-arrow-left" ></i>
            </div>
        </div>
         <!-- 商品详情 -->
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldProce}}</span>
          </div>
        </div>
        <!-- 加入购物车 -->
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy"></div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/CartControl.vue'
export default {
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    show () {
      this.showFlag = !this.ShowFlag
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    }
  },
  components: {
    cartcontrol
  }
}
</script>
<style lang="less" scoped>
.food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #ffffff;
    .food-content{
      .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back{
          position: absolute;
          top: 10px;
          left: 0;
          .fa-arrow-left{
            display: inline-block;
            padding: 10px;
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
      .content{
        padding: 18px;
        .title{
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }
        .detail{
          margin-bottom: 18px;
          line-height: 10px;
          font-size: 0;
          height: 10px;
          .sell-count,.rating{
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .sell-count{
            margin-right: 12px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          display: inline-block;
          .now{
              color: red;
              margin-right: 8px;
              font-size: 14px;
          }
          .old{
              text-decoration: line-through;
              font-size: 10px;
              color: rgba(7, 17, 27,0.8);
          }
      }
      }
    }
}
</style>

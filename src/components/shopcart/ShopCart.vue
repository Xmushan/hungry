/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
<div>
      <div class="shopcart">
        <div class="content" @click="toggleList">
          <div class="content-left">
            <!-- 购物车图标 -->
            <div class="logo-wrapper">
              <div class="logo" :class="{'highlight':totalCount > 0}">
                <i class="fa fa-shopping-cart" :class="{'highlight':totalCount > 0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <!-- 内容 -->
            <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}元</div>
            <div class="desc">零配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right">
            <!-- 阻止冒泡 -->
            <div class="pay" :class="payClass" @click.stop="pay">
              {{payDesc}}
            </div>
          </div>
        </div>
        <!-- 小球容器 -->
        <!-- <div class="ball-container">
          <div v-for="(ball,index) in balls" :key="index" v-show="ball.show">
            <div class="inner"></div>
          </div>
        </div> -->
        <!-- 购物车详情 -->
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartControl">
                  <control :food='food'></control>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <transition name="fade">
      <div class="list-mark" @click="hideList" v-show="listShow"></div>
    </transition>
</div>

</template>
<script>
import control from '../cartcontrol/CartControl.vue'
import BScroll from 'better-scroll'
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      ball: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        const diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fold = true
        return false
      }
      const show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  components: {
    control
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return false
      }
      window.alert(`需要支付${this.totalPrice}`)
    }
  }
}
</script>
<style lang="less" scoped>
.shopcart{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content{
    display: flex;
    background-color: #141d27;
     color: rgba(255, 255, 255, 0.4);
    .content-left{
      flex:1;
      .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #000;
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background-color: #000;
          &.highlight{
            background-color:aliceblue;
          }
          .fa-shopping-cart{
            font-size: 24px;
            color: #80858a;
            line-height: 42px;
            &.highlight{
              color:cornflowerblue;
            }
          }
        }
      }
      .num{
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #ffffff;
        background: rgb((240), 20, 20);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      }
      .price{
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        &.highlight{
          color: #ffffff;
        }
      }
      .desc{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 012px;
        font-size: 10px;
      }
    }
    .content-right{
      flex: 0 0 105px;
      width: 105px;
      .pay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.not-enough{
          background: #2b333b;
        }
        &.enough{
          background: #00b43c;
          color: #ffffff;
        }
      }
    }
  }
  .ball-container{
    .ball{
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      &.drop-transition{
        transition: all 0.4s;
        .inner{
          width:16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all 0.4s;
        }
      }
    }
  }
  .shopcart-list{
    position: fixed;
    bottom: 48px;
    left: 0;
    z-index: -1;
    width: 100%;
    .list-header{
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title{
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content{
      padding: 0 18px;
      max-height: 217px;
      background: #fff;
      overflow: hidden;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        border-bottom:1px solid rgba(7, 17, 27, 0.1);
        .name{
          line-height:24px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .price{
          right: 90px;
          position: absolute;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb((240), 20, 20);
          }
        .cartControl{
          position: absolute;
          right: 0;
          bottom: 6px;
          }
      }
    }
  }
}
.list-mark{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(10px);
  &.fade-transition{
    transition: all 0.5s;
    opacity: 1;
    background-color: rgba(7, 17, 27, 0.6);
  }
  &.fade-enter, &fade-leave{
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
  }
}
</style>

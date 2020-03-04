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
          <!-- 加入购物车 -->
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div @click="addFirst" class="buy" v-show="!food.count || food.count === 0">
          加入购物车
          </div>
        </div>
        <!-- 分割线组件 -->
        <split></split>
        <!-- 商品介绍 -->
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <!-- 分割线组件 -->
        <split></split>
        <!-- 商品评价 -->
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect
          :desc="desc"
          :only-content="onlyContent"
          :select-type="selectType"
          :ratings='food.ratings'
          >
          </ratingSelect>
        </div>
        <div class="rating-wrapper">
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="(rating,index) in food.ratings" :key="index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avator" width="12" height="12" :src="rating.avator" alt="">
              </div>
              <div class="time">{{rating.rateTime}}</div>
              <p class="text">
                <span :class="{'fa fa-thumbs-o-up' : rating.rateType === 0,'fa fa-thumbs-o-down':rating.rateType === 1}"></span>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/CartControl.vue'
import Vue from 'vue'
import split from '../split/Split.vue'
import ratingSelect from '../ratingSelecet/RatingSelect.vue'
const ALL = 2
export default {
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false,
      onlyContent: true,
      selectType: ALL
    }
  },
  created () {
    this.desc = {
      all: '全部',
      positive: '满意',
      negative: '不满意'
    }
  },
  methods: {
    show () {
      this.showFlag = !this.ShowFlag
      this.selectType = ALL
      this.onlyContent = true
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
    },
    addFirst () {
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return true
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
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
        height: 75px;
        overflow: hidden;
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
        .cartcontrol-wrapper{
          position: relative;
          left: 175px;
          bottom: 31px;
        }
        .buy{
          position: relative;
          width: 76px;
          left: 265px;
          bottom: 61px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          font-size: 10px;
          border-radius: 12px;
          color: #fff;
          background: rgb(0, 160, 220)
        }
      }
      .info{
        padding: 18px;
        .title{
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .text{
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77, 85, 93);
        }
      }
      .rating{
        padding-top: 18px;
        .title{
          line-height: 14px;
          margin-left: 18px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
      }
      .rating-wrapper{
          padding: 0 18px;
          .rating-item{
            position: relative;
            padding: 16px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .user{
              position: absolute;
              right: 0;
              top: 16px;
              font-size: 0;
              line-height: 12px;
              .name{
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                margin-right: 6px;
                color: rgb(147, 153, 159);
              }
              .avator{
                border-radius: 50%;
              }
            }
            .time{
              margin-bottom: 6px;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
            .text{
              line-height: 16px;
              font-size: 12px;
              color: rgb(7, 17, 27);
              .fa{
                line-height: 24px;
                margin-right: 4px;
                font-size: 12px;
              }
              .fa-thumbs-o-up{
                color: rgb(0, 160, 220);
              }
              .fa-thumbs-o-down{
                color: rgb(147, 153, 159);
              }
            }
          }
          .no-rating{
            padding: 16px 0;
            font-size: 12px;
            color: rgb(147, 153, 159);
          }
        }
    }
}
</style>

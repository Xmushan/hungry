<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
          <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
            <div class="desc">
              <span class="star"></span>
              <span class="text">({{seller.ratingCount}})</span>
              <span class="text">月售单</span>
            </div>
            <ul class="ramark">
              <li class="block">
                <h2>起送价</h2>
                <div class="content">
                  <span class="stress">{{seller.minPrice}}元</span>
                </div>
              </li>
              <li class="block">
                <h2>商家配送</h2>
                <div class="content">
                  <span class="stress">{{seller.deliveryPrice}}元</span>
                </div>
              </li>
              <li class="block">
                <h2>平均配送时间</h2>
                <div class="content">
                  <span class="stress">{{seller.deliveryTime}}分钟</span>
                </div>
              </li>
            </ul>
            <div class="favourite" @click="toggle">
              <span class="fa fa-heart-o" :class="{active: favourite}"></span>
              <span class="text">{{favourite ? '已收藏' : '收藏'}}</span>
            </div>
          </div>
          <split></split>
          <div class="bulletin">
            <h1 class="title">公告与活动</h1>
            <div class="content-wrapper">
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon"><img :src="imgPath[item.type]" alt=""></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
          </div>
          <split></split>
          <div class="pics">
            <h1 class="title">商家实景</h1>
            <div class="pic-wrapper" ref="pics">
              <ul class="pic-list">
                <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
                  <img width="120px" height="90px" :src="pic" alt="">
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import split from '../split/Split'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      seller: {},
      favourite: false,
      imgPath: [
        require('./img/decrease_1@2x.png'),
        require('./img/discount_1@2x.png'),
        require('./img/guarantee_1@2x.png'),
        require('./img/invoice_1@2x.png'),
        require('./img/special_1@2x.png')
      ]
    }
  },
  created () {
    this.getSeller()
  },
  methods: {
    getSeller () {
      this.$http.get('data.json').then(res => {
        console.log(res)
        this.seller = res.data.seller
      })
      this.$nextTick(() => {
        // if (!this.scroll) {
        //   this.scroll = new BScroll(this.$refs.seller, {
        //     click: true
        //   })
        // } else {
        //   this.scroll.refresh()
        // }
        this.initScroll()
      })
    },
    initScroll  () {
      this.pics = new BScroll(this.$refs.pics, {
        click: true,
        scrollX: true
      })
      this.seller = new BScroll(this.$refs.seller, {
        click: true
      })
    },
    toggle () {
      this.favourite = !this.favourite
    }
  },
  components: {
    split
  }
}
</script>
<style lang="less" scoped>
.seller{
  position: absolute;
  top: 174px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview{
    position: relative;
    padding: 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .desc{
      padding-bottom: 18px;
      font-size: 0;
      .star{
        display:inline-block;
        width: 100px;
        height: 21px;
        background-image:url('./img/star.png');
        background-repeat: no-repeat;
        background-position-y: -54px;
        background-size: 98px;
        margin-top: -1px;
        }
      .text{
        display: inline-block;
        margin-right: 12px;
        line-height: 18px;
        vertical-align: top;
        font-size: 10px
      }
    }
    .ramark{
      display: flex;
      padding-top: 18px;
      .block{
        flex: 1;
        text-align: center;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child{
          border: none;
        }
        h2{
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .content{
          line-height: 24px;
          font-size: 10px;
          color: rgb(7, 17, 27);
          .stress{
            font-size: 24px;
          }
        }
      }
    }
    .favourite{
      position: absolute;
      width: 50px;
      right: 11px;
      top: 18px;
      text-align: center;
      .fa{
        display: block;
        margin-bottom: 4px;
        line-height: 24px;
        font-size: 24px;
        color: #d4d6d9;
        &.active{
          color: rgb(240, 20, 20);
        }
      }
      .text{
        line-height: 10px;
        font-size: 10px;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin{
    padding: 18px 18px 0 18px;
    .title{
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .content-wrapper{
      padding: 0 12px 16px 12px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .content{
        line-height: 24px;
        font-size: 12px;
        color: rgb(240, 20, 20);
      }
    }
    .supports{
      .support-item{
        padding: 16px 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        &:last-child{
          border: none;
        }
        .icon{
          display: inline-block;
          width: 20px;
          height: 20px;
          img{
            width: 20px;
            height: 20px;
          }
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          vertical-align: top;
          margin-left: 5px;
        }
      }
    }
  }
  .pics{
    padding: 18px;
    .title{
      margin-bottom: 12px;
      line-height: 14px;
      color: rgb(7, 17, 27);
      font-size: 14px;
    }
    .pic-wrapper{
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list{
        font-size: 0;
        .pic-item{
          display: inline-block;
          margin-right: 6px;
          width: 120px;
          height: 90px;
          &:last-child{
            margin: 0;
          }
        }
      }
    }
  }
}
</style>

<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingSelect :ratings='ratings'></ratingSelect>
            <div class="rating-wrapper">
                <ul>
                  <li  class="rating-item" v-for="(rating,index) in ratings" :key="index">
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
                <div class="no-rating">暂无评价</div>
        </div>
        </div>
    </div>
</template>
<script>
import split from '../split/Split'
import ratingSelect from '../ratingSelecet/RatingSelect'
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      ratings: [],
      seller: {}
    }
  },
  created () {
    this.getRatings()
  },
  methods: {
    getRatings () {
      this.$http.get('data.json').then(res => {
        this.ratings = res.data.ratings
        this.seller = res.data.seller
      })
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    }
  },
  components: {
    split,
    ratingSelect
  }

}
</script>
<style lang="less" scoped>
.ratings{
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
        display: flex;
        padding: 18px 0;
        .overview-left{
            flex: 0 0 137px;
            padding: 6px 0;
            width: 137px;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            text-align: center;
            .score{
                margin-bottom: 6px;
                line-height: 28px;
                font-size: 24px;
                color: rgb(255, 153, 0);
            }
            .title{
                margin-bottom: 8px;
                line-height: 12px;
                font-size: 12px;
                color: rgb(7, 17, 27);
            }
            .rank{
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        .overview-right{
            flex: 1;
            padding: 6px  0px 6px 24px;
            .score-wrapper{
                margin-bottom: 8px;
                font-size: 0;
                .title{
                    display: inline-block;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .star{
                    display: inline-block;
                    margin: 0 12px;
                    vertical-align: top;
                }
                .score{
                    display: inline-block;
                    line-height: 18px;
                    vertical-align: top;
                    font-size: 12px;
                    color: rgb(255, 153, 0);
                }
            }
            .delivery-wrapper{
                font-size: 0;
                .title{
                    line-height: 18px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                }
                .delivery{
                    margin-left: 12px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
            }
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
</style>

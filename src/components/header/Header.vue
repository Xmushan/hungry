<template>
    <div class="header">
      <!-- 店家内容 -->
        <div class="content-wrapper">
          <!-- 店家照片 -->
          <div class="avatar">
            <img width="64px" height="64px" :src="seller.avatar" alt="">
          </div>
          <!-- 店家门牌 -->
          <div class="content">
            <!-- 名字 -->
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <!-- 描述 -->
            <div class="description">
              {{seller.description}}/{{seller.deliveryTime}}分钟送达
            </div>
            <!-- 优惠显示 -->
            <!--  axios 获得本地 json 数据是异步过程 v-if判断是否得到 seller 数据  -->
            <div class="supports" v-if="seller.supports">
              <span class="icon"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div v-if="seller.supports" class="support-count" @click="detailShow=!detailShow">
            <span class="count">{{seller.supports.length}} 个</span>
          </div>
        </div>
        <!-- 公告区域 -->
        <div class="bulletin-wrapper">
          <span class="bulletin-title"></span>
          <span @click=" detailShow=!detailShow" class="bulletin-text">{{seller.bulletin}}</span>
        </div>
        <!-- 背景 -->
        <div class="background">
          <img width="100%" height="100%" :src="seller.avatar" alt="">
        </div>
        <!-- 店家详情 -->
        <div class="detail" v-show="detailShow">
          <!-- clearfix 清除浮动 -->
          <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <div class="name">{{seller.name}}</div>
                <span class="score"></span>
              </div>
          </div>
          <div class="detail-close" @click="detailShow=false">
            <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
          </div>
        </div>
    </div>
</template>

<script>
// 抽象星星组件 待修复
// import star from '../stars/Star.vue'
export default {
  components: {
    // star
  },
  data () {
    return {
      seller: {},
      detailShow: true
    }
  },
  created () {
    this.getSeller()
  },
  methods: {
    getSeller () {
      this.$http.get('data.json').then(res => {
        this.seller = res.data.seller
        console.log(this.seller)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix{
  display: inline-block;
  &:after{
    display: block;
    content: '';
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
.header{
  color: #fff;
  position: relative;
  overflow: hidden;
  background-color:rgba(7, 17, 27, 0.5);
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    .avatar{
      display: inline-block;
      vertical-align: top;
      img{
        border-radius: 2px;
      }
    }
    .content{
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
        .title{
            margin: 2px 0 8px 0;
            .brand{
              display: inline-block;
              vertical-align: top;
              width: 30px;
              height: 18px;
              background-image: url('./img/brand@2x.png');
              background-size: 30px 18px;
              background-repeat: no-repeat;
            }
            .name{
                margin-left: 6px;
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
            }
        }
        .description{
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .supports{
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            background-image: url('./img/decrease_1@2x.png')
          }
          .text{
            line-height: 12px;
            font-size: 10px;
          }
        }
    }
    .support-count{
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 0 8px;
      height: 24px;
      line-height: 20px;
      border-radius: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count{
        font-size: 10px;
      }
      .count::after{
        content: '>';
        margin-left: 5px;
        font-size: 15px;
      }
    }
  }
  .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background-color: rgba(7, 17, 27, 0.4);
    .bulletin-title{
      display: inline-block;
      vertical-align: top;
      margin-top: 10px;
      width: 22px;
      height: 12px;
      background-image: url('./img/bulletin@2x.png');
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text{
      margin:0 4px;
      font-size: 10px;
    }
    .bulletin-text::after{
        content: '>';
        margin-left: 5px;
        position: absolute;
        font-size: 16px;
        right: 6px;
        top: 3px;
    }
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    .detail-wrapper{
      min-height: 100%;
      width: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .score{
          display:inline-block;
          width: 100px;
          height: 21px;
          background-image:url('./img/star.png');
          background-repeat: no-repeat;
          background-position-y: -54px;
          background-size: 98px;
        }
      }
    }
    .detail-close{
      position: relative;
      margin: -64px 0 auto;
      height: 32px;
      clear: both;
      text-align: center;
    }
  }
}
</style>

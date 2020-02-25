<template>
<div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref='menu'>
        <ul>
            <li class="menu-item" v-for="(item,index) in GoodsList" :key="index">
                <span class="text">
                    <img  v-show="item.type>0" :src="imgPath[index]" alt="">
                    {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <!-- 右侧菜单 -->
    <div class="foods-wrapper" ref="food">
        <ul>
            <li class="food-list food-list-hook" v-for="(item,index) in GoodsList" :key="index">
                <h1 class="title">{{item.name}}</h1>
                <ul >
                    <li class="food-item" v-for="(food,index) in item.foods" :key="index">
                        <div class="icon">
                            <img width="57px" height="57px" :src="food.icon" alt="">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span class="count">月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="now">￥{{food.price}}</span>
                                <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      GoodsList: [],
      imgPath: [
        require('./img/discount_1@2x.png'),
        require('./img/special_1@2x.png')
      ]
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    getGoods () {
      this.$http.get('data.json').then(res => {
        this.GoodsList = res.data.goods
        console.log(this.GoodsList)
      })
    },
    initScollMenu () {
      this.$nextTick(() => {
        if (!this.Scroll) {
          this.Scroll = new BScroll(this.$refs.menu, {
            click: true,
            scrollY: true
          })
          this.Scroll = new BScroll(this.$refs.food, {
            click: true,
            scrollY: true
          })
        }
      })
    }
  },
  // 生命周期函数 必须在 获取数据 和 DOM 渲染完成 之后 在调用定义的 initScroll方法 否则无法滚动
  mounted () {
    this.initScollMenu()
  }

}
</script>

<style lang="less" scoped>
.goods{
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 174px;
    width: 100%;
    bottom: 46px;
    .menu-wrapper{
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item{
            display: table;
            width: 56px;
            height: 54px;
            line-height: 14px;
            padding: 0 12px;
            .text{
                display: table-cell;
                width: 80px;
                vertical-align: middle;
                font-size: 12px;
                img{
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
    .foods-wrapper{
        flex: 1;
        .title{
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: rgb(147, 153, 159);
            background-color: #f3f5f7;
        }
        .food-item{
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            border-bottom: 1px solid rgba(7, 17, 27,0.1);
            &:last-child{
                border: none;
                margin-bottom: 0;
            }
            .icon{
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content{
                flex: 1;
                .name{
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7,17,27)
                }
                .desc, .extra{
                    margin-bottom: 8px;
                    line-height: 10px;
                    font-size: 10px;
                    color:rgb(147, 153, 159);
                }
                .desc{
                    margin-bottom: 8px;
                }
                .extra{
                    line-height: 10px;
                    .count{
                        margin-right: 12px;
                    }
                }
                .price{
                    font-weight: 700;
                    line-height: 24px;
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
}
</style>

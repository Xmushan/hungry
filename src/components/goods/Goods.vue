<template>
<div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref='menu'>
        <ul>
            <li @click="selectMenu(index)" class="menu-item" :class="{'current' : currentIndex === index}" v-for="(item,index) in GoodsList" :key="index">
                <span class="text">
                    <img  v-show="item.type===2" :src="imgPath[0]" alt="">
                    <img  v-show="item.type===1" :src="imgPath[1]" alt="">
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
                    <li class="food-item" v-for="(food,index) in item.foods" :key="index" >
                        <div class="icon" @click="clickFood(food)">
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
                            <!-- 这个地方的问题 -->
                            <!-- <div class="control-wrapper" > -->
                              <control :food='food'></control>
                            <!-- </div> -->
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- 购物车组件 -->
      <shopcart :select-foods="selectFoods" :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'>
      </shopcart>
      <food :food="selectFood" ref='foodDetail'></food>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/ShopCart.vue'
import control from '../cartcontrol/CartControl.vue'
import food from '../food/Food.vue'
export default {
  data () {
    return {
      GoodsList: [],
      seller: {},
      imgPath: [
        require('./img/discount_1@2x.png'),
        require('./img/special_1@2x.png')
      ],
      listHeight: [],
      scrollY: 0,
      selectFood: {}
    }
  },
  created () {
    this.getGoods()
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        const height1 = this.listHeight[i]
        const height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      const foods = []
      this.GoodsList.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    getGoods () {
      this.$http.get('data.json').then(res => {
        this.GoodsList = res.data.goods
        this.seller = res.data.seller
        this.$nextTick(() => {
          this.initScollMenu()
          this.calculateHeight()
        })
      })
    },
    clickFood (food) {
      this.selectFood = food
      // 显示food组件
      this.$refs.foodDetail.show()
    },
    selectMenu (index) {
      const foodList = this.$refs.food.getElementsByClassName('food-list-hook')
      const el = foodList[index]
      this.food.scrollToElement(el, 300)
    },
    // 计算每一个 li 的高度
    calculateHeight () {
      const foodList = this.$refs.food.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        const item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    initScollMenu () {
    //   this.$nextTick(() => {
    //     if (!this.Scroll) {
    //       this.Scroll = new BScroll(this.$refs.menu, {
    //         click: true,
    //         scrollY: true
    //       })
    //       this.Scroll = new BScroll(this.$refs.food, {
    //         click: true,
    //         scrollY: true
    //       })
    //     }
    //   })
      this.menu = new BScroll(this.$refs.menu, {
        click: true
      })
      this.food = new BScroll(this.$refs.food, {
        click: true,
        probeType: 3
      })
      this.food.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    }
  },
  components: {
    shopcart,
    control,
    food
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
            &.current{
                position: relative;
                z-index: 10;
                margin-top: -1px;
                background-color: white;
                font-weight: 700;
                .text{
                    border: none;
                }
            }
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
                    line-height: 12px;
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
                .control-wrapper{
                  position: absolute;
                  right: 0;
                  bottom: 12px;
                }
            }
        }
    }
}
</style>

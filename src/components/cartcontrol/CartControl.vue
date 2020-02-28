<template>
    <div class="control">
      <transition name="fade">
        <div @click="decrease" class="decrease " v-show="food.count>0">
          <transition name="inner">
            <span class="inner fa fa-minus-circle"></span>
          </transition>
        </div>
      </transition>
        <div class="count" v-show="food.count>0">{{food.count}}</div>
        <div class="add fa fa-plus-circle" @click="addCart"></div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {}
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      } else {
        this.food.count++
      }
    },
    decrease () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang="less" scoped>
.fade-enter,.fade-leave-to{
  opacity: 0;
  transform: translateX(20px);
}
.fade-enter-active,.fade-leave-active{
  transition: 0.5s all ease;
}
.inner-enter,.inner-leave-to{
  transform: rotate(360deg);
}
.inner-enter-active,.inner-leave-active{
  transition: 0.5s all ease-in-out;
}
.control{
    font-size: 0;
    display: inline-block;
    width: 78px;
    text-align: end;
    margin-left: 90px;
    .decrease, .add{
        display: inline-block;
        padding: 6px;
        .inner{
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
        }
    }
    .count{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147, 153, 158);
    }
    .add{
        display: inline-block;
        padding: 6px;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0, 160, 220);
    }
}
</style>

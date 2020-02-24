<template>
    <div class="star" :class="starType">
        <span class="star-item" v-for="(item,index) in itemClasses" :class="item" :key="index"></span>
    </div>
</template>
<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    },
    itemClasses () {
      const result = []
      const score = Math.floor(this.score * 2) / 2
      const hasDecimal = score % 1 !== 0
      const interger = Math.floor(score)
      for (let i = 0; i < interger; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.star{
    font-size:0;
    .star-item{
        display:inline-block;
        background-repeat: no-repeat;
    }
    &.star-48{
        .star-item{
            width: 20px;
            height: 20px;
            margin-right: 22px;
            background-size: 20px 20px;
            &:last-child{
                margin-right: 0;
            }
            &.on{
                background-image: url('./img/star48_on')
            }
            &.half{
                background-image: url('./img/star48_half')
            }
            &.off{
                background-image: url('./img/star48_off')
            }
        }
    }
    &.star-36{
        .star-item{
            width: 15px;
            height: 15px;
            margin-right: 26px;
            background-size: 15px 15px;
            &:last-child{
                margin-right: 0;
            }
            &.on{
                background-image: url('./img/star36_on')
            }
            &.half{
                background-image: url('./img/star36_half')
            }
            &.off{
                background-image: url('./img/star36_off')
            }
        }
    }
    &.star-24{
        .star-item{
            width: 10px;
            height: 10px;
            margin-right: 3px;
            background-size: 10px 10px;
            &:last-child{
                margin-right: 0;
            }
            &.on{
                background-image: url('./img/star24_on')
            }
            &.half{
                background-image: url('./img/star24_half')
            }
            &.off{
                background-image: url('./img/star24_off')
            }
        }
    }
}
</style>

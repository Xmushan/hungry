<template>
    <div class="ratingselect" v-if="ratings">
        <div class="rating-type">
            <span @click="select(2)" class="block positive" :class="{'active':selectType1===2}">
                {{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span @click="select(0)" class="block positive" :class="{'active':selectType1===0}">
                {{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span @click="select(1)" class="block negative" :class="{'active':selectType1===1}">
                {{desc.negative}}
                <span class="count">{{negatives.length}}</span>
            </span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on' : onlyContent1}">
            <span><i class="fa fa-check-circle-o"></i></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data () {
    return {
      selectType1: ALL,
      onlyContent1: true
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      this.selectType1 = type
      this.$emit('ratingtype.select', type)
    },
    toggleContent () {
      this.onlyContent1 = !this.onlyContent1
      this.$emit('content.toggle', this.onlyContent)
    }
  }
}
</script>
<style lang="less" scoped>
.ratingselect{
    .rating-type{
        padding: 18px 0;
        margin: 0 18px;
        border: 1px rgba(7, 17, 27, 0.1);
        .block{
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color:rgb(77, 85, 93);
            &.active{
                color:#fff;
            }
            .count{
                font-size: 8px;
                margin-left: 2px;
            }
            &.positive{
                background: rgba(0,160,220,0.2);
                &.active{
                    background: rgb(0,160,220);
                }
            }
            &.negative{
                background: rgba(77, 85, 93, 0.2);
                &.active{
                    background: rgb(77, 85, 93);
                }
            }
        }
    }
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: rgb(147, 153, 159);
        &.on{
            .fa-check-circle-o{
              color: #00c850;
            }
        }
        .fa-check-circle-o{
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            font-size: 24px;
        }
        .text{
            font-size: 12px;
        }
    }
}
</style>

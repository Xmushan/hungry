<template>
    <div>
      父组件
      <span>即将出现的数据：{{name}}</span>
      <children v-on:childByValue="childByValue"></children>
      <div class="root">
        <transition name="fade">
          <div v-if="show">hello word</div>
        </transition>
        <button @click='handClick'>切换</button>
      </div>
    </div>
</template>
<script>
import children from './son.vue'
export default {
  data () {
    return {
      name: '',
      show: false
    }
  },
  methods: {
    childByValue (value) {
      this.name = value
    },
    handClick () {
      this.show = !this.show
    }
  },
  components: {
    children
  }
}
</script>
<style lang="less" scoped>
.fade-enter,.fade-leave-to{
  opacity: 0;
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease;
}
</style>

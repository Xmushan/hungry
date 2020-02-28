<template>
    <div>
        <span>{{childValue}}</span>
        <input type="button" value="点击触发" @click="childClick">
    </div>
</template>
<script>
export default {
  props: {
    inputName: String
  },
  data () {
    return {
      childValue: '我是子组件的数据'
    }
  },
  methods: {
    childClick () {
      this.$emit('childByValue', this.childValue)
      console.log('1')
    }
  }
}
</script>

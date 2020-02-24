<template>
  <div id="app">
    <!-- 头 -->
    <v-header></v-header>
    <!-- 导航栏 -->
    <div class="tab">
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item"><router-link to='/ratings'>评论</router-link></div>
      <div class="tab-item"><router-link to='/seller'>商家</router-link></div>
    </div>
    <router-view>
    </router-view>
  </div>
</template>

<script>
// 导入头部组件
import header from '../src/components/header/Header.vue'
export default {
  components: {
    'v-header': header
  }
}
</script>

<style lang="less" scoped>
// 导航栏 样式
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.tab .tab-item{
  flex: 1;
  text-align: center;
}
// a 元素 撑满整个 tab-item 框
.tab .tab-item a{
  display: block;
  font-size: 14px;
}
.active{
  color: red;
}
</style>

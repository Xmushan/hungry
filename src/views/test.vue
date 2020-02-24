<template>
    <div>
        123
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {}
  },
  created () {
    this.getMsg()
  },
  methods: {
    getMsg () {
      axios.get('./data.json').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<template>
  <div id="app">
    <v-header></v-header>
    <v-content :items='filterDataList'></v-content>
    <v-footer></v-footer>
    <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header'
import content from './components/content/content'
import footer from './components/footer/footer'

import axios from 'axios'

export default {
  data () {
    return {
      items: [],
      limitNum: 20,
      datalist: []
    }
  },  
  created() {
    axios.get('/api/datalist').then((response) => {
      // 拿到异步接口返回的对象object
      // axios: response.data == vueRescource: response.body
      response = response.data
      if(response.errno === 0) {
        this.items = response.data
      }
      }).catch((error) => {
        console.log(error)
    })
  }, 
  computed: {
    filterDataList: function() {
      return this.datalist = this.items.slice(0,this.limitNum)
    }
  },
  components: {
    'v-header': header,
    'v-content': content,
    'v-footer': footer
  }
}
</script>

<style>
html{
    height: 100%;
    width: 100%;
}
body{
    height: 100%;
    width: 100%;
    background: url(../static/image/bg.png) repeat-y;
    background-size: 100% 100%;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
  opacity: 0.7;
}
</style>

<template>
	<div class="header">
		<i class="icon"></i>
		<input class="search" type="text" v-model="message" placeholder="输入关键字搜索.." />
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	data () {
    	return {
      		message: ''
      	}
    }  
}
</script>

<style lang="less" rel="stylesheet/less">
.header{
	position: relative;
    width: 100%;
    color: #fff;
    margin: 0 auto;
    margin-top: 20px;
    .search{
		width: 200px;
		height: 30px;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 4px;
    }
}
</style>
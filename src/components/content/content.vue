<template>
	<div class="article-wrapper">
		<ul class="article-lists">
			<li v-for="(item,index) in items" class="row">
				<div class="left">
					<a :href="item.link"><img :src="item.img" alt=""></a>
				</div>
				<div class="right">
					<div><a :href="item.link" class="title">{{item.title}}</a></div>
					<div class="detail">
						<span>点赞: {{item.count}}</span>
						<span>作者: {{item.username}}</span>
						<span>{{item.date}}</span>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	props: {
		items: {
			type: Array
		}
	}
}
</script>

<style lang="less" rel="stylesheet/less">
.article-wrapper{
	position: relative;
	width: 100%;
	height: 100%;
	margin-top: 30px;
	.article-lists{
		.row{
			display: flex;
			justify-content: stretch;
			font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
			color: rgb(255, 255, 255);
			padding: 5px 10px; 
			.left{
				img{
					width: 60px;
					height: 60px;
				}
				margin-right: 10px;
			}
			.right{
				.title{
					font-size: 16px;
					line-height: 1.5;
				}
				.detail{
					display: flex;
					justify-content: center;
					align-items: center;
					span{
						font-size: 14px;
						line-height: 1.5;
						margin-right: 10px;
					}
				}
			}
		}
	}
}
</style>
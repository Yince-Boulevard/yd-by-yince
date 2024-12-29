<template>
	<view class="cover">
		<image src="/static/logo.png" class="logo"></image>
	</view>
	<view class="title">嗨~欢迎来到YINCE！</view>
	<view class="content">
		<input type="text" class="input" v-model="content.content" placeholder="留言">
		<button type="primary" @click="publish()" size="mini">发布</button>
		<button type="primary" @click="getList('getMyMessages')" size="mini">我的留言</button>
	</view>
	<view v-for="item in list" :key="item._id">
		<view class="box">
			<view><span style="font-weight: lighter;">留言内容</span>{{item.content.content}}</view>
			<view v-if="!item.public"><span style="background-color: darkred;color: aliceblue;padding: 0 8rpx 2rpx;">未公开{{item.content.timestamp}}</span></view>
		</view>
	</view>

	<view class="desc">这里是YINCE的分组小程序V1 版本</view>

	<view class="choose">
		<button class="join" @click="nav('/pages/form/form')">创建小组</button>
		<button class="join" @click="nav('/pages/list/list')">加入小组</button>
		<button class="join" @click="nav('/pages/tip/tip')">其他小组</button>
		<button class="join" @click="nav('/pages/group/group')">我的小组</button>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				hello: 'Hi',
				content: {
					"content": '',
					"timestamp": ''
				},
				list: [],
			}
		},


		// 页面加载的时候
		onLoad() {
			// 查询本地存储，token字段
			let token = uni.getStorageSync('token');
			if (!token) {
				// 如果没有，使用小程序函数获取第三方code
				uni.login().then(({
					code
				}) => {
					// 调用云函数
					uniCloud.callFunction({
						// 要调用的函数
						name: 'fun',
						// 传入的参数
						data: {
							api: "loginWithMap",
							code
						}
					}).then(({
						result
					}) => {
						// 调用成功后执行的内容...
						token = result.token
						// 把 token 存储到 token 字段
						uni.setStorageSync('token', token)
						this.getList()
					})
				})
			} else {
				// 如果有，直接调用列表查询
				this.getList()
			}

		},


		methods: {
			nav(url) {
				uni.navigateTo({
					url
				})
			},
			change() {
				this.$data.hello = '欢迎来到YINCE的APP'
			},
			// 查询消息的函数
			getList(api) {
				uniCloud.callFunction({
					name: 'fun',
					data: {
						api: api || "getMessages",
						token: uni.getStorageSync('token')
					}
				}).then(res => {
					this.list = res.result.data
				}).catch(res => {
					uni.showToast({
						icon: 'error',
						title: '未登录'
					})
				})
			},

			publish() {
				// 留言板内容为空校验
				if (this.content.content === '' || this.content.content === null) {
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					});
				} else {
					uniCloud.callFunction({
						// 调用的函数
						name: 'fun',
						// 传入的参数
						data: {
							api: 'publish',
							content: this.content,
							token: uni.getStorageSync('token')
						}
					}).then(res => {
						console.log(res)
						this.content.content = '';
						uni.showToast({
							title: '留言成功',
							icon: 'success'
						})
					})
				}
			}




		},


	}
</script>

<style>
	.desc {
		font-size: 28rpx;
		font-weight: 400;
		color: #888888;
		margin: 32rpx;
	}

	.text {
		margin: 32rpx;
		color: #333;
		overflow-wrap: break-word;
		line-height: 1.7;
	}

	.hr {
		margin: 32rpx;
		border-top: 1px solid #999;
	}

	.link {
		color: #216cd3;
		text-decoration: none;
		border-bottom: 1px dashed;
	}

	.red {
		color: rgb(253, 91, 91);
	}

	.b {
		font-weight: bold;
	}


	.choose {
		margin: 80rpx auto;
	}

	.join {
		width: 400rpx;
		height: 100rpx;
		background-color: #07c160;
		margin: 50rpx auto;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		font-weight: bold;
		border-radius: 12rpx;
	}


	.cover {
		background-color: #f1f1f1;
		text-align: center;
		padding: 80rpx1;
	}

	.logo {
		width: 160rpx;
		height: 160rpx;
	}

	.title {
		font-weight: 500;
		color: #000000;
		font-size: 44rpx;
		margin: 50rpx 32rpx;
	}

	.content {
		display: flex;
		align-items: center;
		margin: 40rpx;
	}

	.input {
		border-bottom: 1px solid #ccc;
		padding: 6rpx;
		flex: 1;
	}

	.box {
		margin: 40rpx;
		border-bottom: 1px solid #ccc;
		padding: 20rpx 0;
	}
</style>
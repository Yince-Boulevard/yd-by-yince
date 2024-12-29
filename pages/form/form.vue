<template>
	<view class="body">
		<uni-section title="基本用法" type="line">
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="createGroupForm" :modelValue="createGroupFormData">
					<uni-forms-item label="姓名" required>
						<uni-easyinput v-model="createGroupFormData.name" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="性别" required>
						<uni-data-checkbox v-model="createGroupFormData.sex" :localdata="sexs" />
					</uni-forms-item>
					<uni-forms-item label="出生日期" required>
						<uni-datetime-picker type="date" return-type="date" v-model="createGroupFormData.birthdate" />
					</uni-forms-item>
					<!-- 地区选择 -->
					<uni-forms-item label="地区">
						<uni-data-picker 
						v-model="createGroupFormData.region"
						placeholder="请选择地区" 
						popup-title="请选择城市" 
						collection="opendb-city-china" 
						field="code as value, name as text" 
						orderby="value asc" 
						:step-searh="true"
						self-field="code"
						parent-field="parent_code"
						> </uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="兴趣爱好">
						<uni-data-checkbox v-model="createGroupFormData.hobby" multiple :localdata="hobbys" />
					</uni-forms-item>
					<uni-forms-item label="自我介绍">
						<uni-easyinput type="textarea" v-model="createGroupFormData.introduction" placeholder="请输入自我介绍" />
					</uni-forms-item>

				</uni-forms>
				<button type="primary" @click="submit('createGroupForm')" form-type="submit">提交</button>
				<button @click="reset" form-type="reset">重置</button>
			</view>
		</uni-section>
		<!-- 返回 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				createGroupFormData: {
					name: '',
					sex: '',
					birthdate: '',
					region: '',
					hobby: [],
					introduction: '',
				},
				sexs: [{
					"value": 0,
					"text": "男"
				}, {
					"value": 1,
					"text": "女"
				}],
				hobbys: [{
						"value": 0,
						"text": "阅读"
					},
					{
						"value": 1,
						"text": "运动"
					},
					{
						"value": 2,
						"text": "音乐"
					},
					{
						"value": 3,
						"text": "绘画"
					},
					{
						"value": 4,
						"text": "编程"
					}
				],
			};
		},
		methods: {
			submit(formRef) {
				// 使用 this.$refs 获取表单的引用
				const form = this.$refs[formRef];
				// 调用 validate 方法对表单进行验证
				form.validate().then(valid => {
					if (valid) {
						// 如果表单验证通过，打印填写的信息
						// console.log(this.createGroupFormData);
						uniCloud.callFunction({
							name: 'createGroup',
							data: {
								data: this.createGroupFormData
							}
						}).then(res => {
							console.log(res)
							uni.showToast({
								title: '提交成功',
								icon: 'success'
							})
						})
						uni.navigateTo('/pages/index/index')
					} else {
						console.log('表单验证不通过，请检查输入信息。');
					}
				}).catch(error => {
					console.error('表单验证出错:', error);
				});
				console.log('提交表单触发')
			},
			reset() {
				// 重置表单数据
				this.createGroupFormData = {
					name: '',
					sex: '',
					birthdate: '',
					region:'',
					hobby: [],
					introduction: '',
				};
				console.log('重置表单触发')
			}
		}
	};
</script>

<style>
	/* 外边距40rpx */
	.body {
		margin: 40rpx;
	}

	/*  */
	.section {
		margin: 40rpx 0 80rpx;
	}

	.title {
		font-size: 36rpx;
	}

	/* 宽度占满父容器 */
	.input {
		margin: 30rpx 0;
		border-bottom: 1px solid #666;
		padding: 20rpx 0;
		width: 100%;
	}

	.mg {
		margin: 30rpx 0;
	}

	.area {
		margin: 100rpx auto;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
	}
</style>
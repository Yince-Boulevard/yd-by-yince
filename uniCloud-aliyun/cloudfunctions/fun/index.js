// 引入 jwt 令牌第三方库
let jwt = require('jsonwebtoken')
// 创建操作云端数据库的对象
const db = uniCloud.database();

// 以下是AppID和密钥（在微信平台开发管理获取）
let appId = 'wxdfbe4ab7f3891b93'
let appSecret = 'c0585357bbdd7bfa40ddf0b4bae3c0bf'
let jwtSecret = '123'

exports.main = async (event, context) => {
	
	if(event.api === 'loginWithMap'){
		let wxRes = await uniCloud.httpclient.request(
			`https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${event.code}&grant_type=authorization_code `,{
			dataType: "json"	
			})
			let userId = wxRes.data.openid;
			
			if(!userId){
				throw Error(wxRes.data.errmsg)
			}
			// 查询 user 表中的 userId 字段
			let user = await db.collection('user').doc(userId).get();
			let token = 'Bearer ' + jwt.sign({userId},jwtSecret)
			// 如果表中存在该用户，直接返回
			if(user.data[0]){
				return {
					user: user.data[0],
					token
				}
			}else{
				// 建立 user 表的实体类封装
				let data = {
					_id: userId,
					createdAt: Date.now()
				}
				// 向 user 表新增一个user的实体类数据
				await db.collection('user').add(data)
				return{
					user: data,
					token
				}
			}
	}
	
	// 是否含有token
	if(!event.token){
		throw Error('未登录')
	}
// 认证
	let auth = jwt.verify(event.token.replace('Bearer ', ''), jwtSecret)
	let userId = auth.userId;
	if(event.api === 'publish'){
		return await db.collection('message').add({
			// 留言内容
			content: event.content,
			// 是否公开
			public: false,
			// 发送者的 userId
			userId
		})
	}
	
	if(event.api === 'getMessages'){
		return await db.collection('message').where({
			public: true
		}).get()
	}
	// 获取自己的留言
	if(event.api === 'getMyMessages'){
		// 是否含有token
		if(!event.token){
			uni.uni.showToast({
				title: '未登录',
				icon
			});
			throw Error('未登录')
		}
		return await db.collection('message').where({
			userId 
		}).get()
	}
	//返回数据给客户端
	return ""
};

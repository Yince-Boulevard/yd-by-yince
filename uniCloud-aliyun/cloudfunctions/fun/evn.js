/* 
 正式的环境秘钥被gitignore忽略了，不能公开
 索引当你要配置秘钥的时候，修改本文件为index.js
 然后替换下方的信息
 */

module.exports = {
	ADMIN_SECRET: "jwt用户验证token的密码",
	WX_APPID: "小程序appid",
	WX_APPSECRET: "小程序密钥",
	WX_MCHID: "微信支付商户号",
	WX_PARTERNER_KEY: "微信支付parterner秘钥",
	WX_PAYURL: "你的接受支付通知的函数url地址",
};
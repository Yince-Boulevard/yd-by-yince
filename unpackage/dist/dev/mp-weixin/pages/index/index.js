"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      hello: "Hi",
      content: {
        "content": "",
        "timestamp": ""
      },
      list: []
    };
  },
  // 页面加载的时候
  onLoad() {
    let token = common_vendor.index.getStorageSync("token");
    if (!token) {
      common_vendor.index.login().then(({
        code
      }) => {
        common_vendor.Zs.callFunction({
          // 要调用的函数
          name: "fun",
          // 传入的参数
          data: {
            api: "loginWithMap",
            code
          }
        }).then(({
          result
        }) => {
          token = result.token;
          common_vendor.index.setStorageSync("token", token);
          this.getList();
        });
      });
    } else {
      this.getList();
    }
  },
  methods: {
    nav(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    change() {
      this.$data.hello = "欢迎来到YINCE的APP";
    },
    // 查询消息的函数
    getList(api) {
      common_vendor.Zs.callFunction({
        name: "fun",
        data: {
          api: api || "getMessages",
          token: common_vendor.index.getStorageSync("token")
        }
      }).then((res) => {
        this.list = res.result.data;
      }).catch((res) => {
        common_vendor.index.showToast({
          icon: "error",
          title: "未登录"
        });
      });
    },
    publish() {
      if (this.content.content === "" || this.content.content === null) {
        common_vendor.index.showToast({
          title: "请输入内容",
          icon: "error"
        });
      } else {
        common_vendor.Zs.callFunction({
          // 调用的函数
          name: "fun",
          // 传入的参数
          data: {
            api: "publish",
            content: this.content,
            token: common_vendor.index.getStorageSync("token")
          }
        }).then((res) => {
          console.log(res);
          this.content.content = "";
          common_vendor.index.showToast({
            title: "留言成功",
            icon: "success"
          });
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: $data.content.content,
    c: common_vendor.o(($event) => $data.content.content = $event.detail.value),
    d: common_vendor.o(($event) => $options.publish()),
    e: common_vendor.o(($event) => $options.getList("getMyMessages")),
    f: common_vendor.f($data.list, (item, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.content.content),
        b: !item.public
      }, !item.public ? {
        c: common_vendor.t(item.content.timestamp)
      } : {}, {
        d: item._id
      });
    }),
    g: common_vendor.o(($event) => $options.nav("/pages/form/form")),
    h: common_vendor.o(($event) => $options.nav("/pages/list/list")),
    i: common_vendor.o(($event) => $options.nav("/pages/tip/tip")),
    j: common_vendor.o(($event) => $options.nav("/pages/group/group"))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);

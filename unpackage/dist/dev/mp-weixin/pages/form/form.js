"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      createGroupFormData: {
        name: "",
        sex: "",
        birthdate: "",
        region: "",
        hobby: [],
        introduction: ""
      },
      sexs: [{
        "value": 0,
        "text": "男"
      }, {
        "value": 1,
        "text": "女"
      }],
      hobbys: [
        {
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
      ]
    };
  },
  methods: {
    submit(formRef) {
      const form = this.$refs[formRef];
      form.validate().then((valid) => {
        if (valid) {
          common_vendor.Zs.callFunction({
            name: "createGroup",
            data: {
              data: this.createGroupFormData
            }
          }).then((res) => {
            console.log(res);
            common_vendor.index.showToast({
              title: "提交成功",
              icon: "success"
            });
          });
          common_vendor.index.navigateTo("/pages/index/index");
        } else {
          console.log("表单验证不通过，请检查输入信息。");
        }
      }).catch((error) => {
        console.error("表单验证出错:", error);
      });
      console.log("提交表单触发");
    },
    reset() {
      this.createGroupFormData = {
        name: "",
        sex: "",
        birthdate: "",
        region: "",
        hobby: [],
        introduction: ""
      };
      console.log("重置表单触发");
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_checkbox2 + _easycom_uni_datetime_picker2 + _easycom_uni_data_picker2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_checkbox + _easycom_uni_datetime_picker + _easycom_uni_data_picker + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.createGroupFormData.name = $event),
    b: common_vendor.p({
      placeholder: "请输入姓名",
      modelValue: $data.createGroupFormData.name
    }),
    c: common_vendor.p({
      label: "姓名",
      required: true
    }),
    d: common_vendor.o(($event) => $data.createGroupFormData.sex = $event),
    e: common_vendor.p({
      localdata: $data.sexs,
      modelValue: $data.createGroupFormData.sex
    }),
    f: common_vendor.p({
      label: "性别",
      required: true
    }),
    g: common_vendor.o(($event) => $data.createGroupFormData.birthdate = $event),
    h: common_vendor.p({
      type: "date",
      ["return-type"]: "date",
      modelValue: $data.createGroupFormData.birthdate
    }),
    i: common_vendor.p({
      label: "出生日期",
      required: true
    }),
    j: common_vendor.o(($event) => $data.createGroupFormData.region = $event),
    k: common_vendor.p({
      placeholder: "请选择地区",
      ["popup-title"]: "请选择城市",
      collection: "opendb-city-china",
      field: "code as value, name as text",
      orderby: "value asc",
      ["step-searh"]: true,
      ["self-field"]: "code",
      ["parent-field"]: "parent_code",
      modelValue: $data.createGroupFormData.region
    }),
    l: common_vendor.p({
      label: "地区"
    }),
    m: common_vendor.o(($event) => $data.createGroupFormData.hobby = $event),
    n: common_vendor.p({
      multiple: true,
      localdata: $data.hobbys,
      modelValue: $data.createGroupFormData.hobby
    }),
    o: common_vendor.p({
      label: "兴趣爱好"
    }),
    p: common_vendor.o(($event) => $data.createGroupFormData.introduction = $event),
    q: common_vendor.p({
      type: "textarea",
      placeholder: "请输入自我介绍",
      modelValue: $data.createGroupFormData.introduction
    }),
    r: common_vendor.p({
      label: "自我介绍"
    }),
    s: common_vendor.sr("createGroupForm", "524f8470-1,524f8470-0"),
    t: common_vendor.p({
      modelValue: $data.createGroupFormData
    }),
    v: common_vendor.o(($event) => $options.submit("createGroupForm")),
    w: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    x: common_vendor.p({
      title: "基本用法",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);

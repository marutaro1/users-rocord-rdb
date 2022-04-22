"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_StaffDayWork_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    login_user_id: String
  },
  data: function data() {
    return {
      login_user: [],
      today: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("00" + new Date().getDate()).slice(-2),
      user_department: null,
      open_staff_method: false,
      week: '',
      select_staff_name: [],
      today_week: '',
      new_work: '',
      select_daily_work: [],
      add_staff_work_one: '',
      add_staff_work_two: '',
      add_staff_work_three: '',
      check_staffs_post: [{
        staff_name: '',
        phs: '',
        staff_work: [],
        add_staff_work_one: '',
        add_staff_work_two: '',
        add_staff_work_three: ''
      }]
    };
  },
  methods: {
    closeStaffData: function closeStaffData() {
      this.open_staff_method = false;
      this.week = '';
      this.today_week = '';
      this.new_work = '';
      this.check_staffs_post.phs = '';
      this.select_daily_work = '';
    },
    getStaffName: function getStaffName() {
      var _this = this;

      var staff_array = [];
      axios.get('/api/users').then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].user_department === _this.user_department) {
            staff_array.push(res.data[i]);
          }

          _this.select_staff_name = staff_array;
          _this.open_staff_method = true;
        }
      });
    },
    addSelectNewWork: function addSelectNewWork() {
      var _this2 = this;

      var new_daily_work = {
        day_of_week: this.week,
        work: this.new_work,
        user_department: this.user_department
      };
      axios.post('/api/daily_work', new_daily_work).then(function (res) {
        console.log(res.data);
        _this2.week = '';
        _this2.new_work = '';
      });
      this.getDayliWork();
    },
    getDayliWork: function getDayliWork() {
      var _this3 = this;

      var work_array = [];
      axios.get('/api/daily_work').then(function (res) {
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].user_department === _this3.user_department && res.data[i].day_of_week === _this3.today_week) {
            work_array.push(res.data[i]);
          }
        }

        _this3.select_daily_work = work_array;
      });
    },
    addStaffData: function addStaffData() {
      //登録するためのstaffのデータを追加するためのメソッド
      this.check_staffs_post.push(this.independentObject());
    },
    removeStaffData: function removeStaffData(target) {
      //addStaffDataで追加したデータを削除するためのメソッド
      this.check_staffs_post.splice(target, 1);
    },
    independentObject: function independentObject() {
      return {
        staff_name: '',
        phs: '',
        staff_work: [],
        add_staff_work_one: '',
        add_staff_work_two: '',
        add_staff_work_three: ''
      };
    },
    addStaffDailyWork: function addStaffDailyWork(staff) {
      var _this4 = this;

      var daily_work = [];
      var complete_work = '';

      for (var i = 0; i < staff.length; i++) {
        staff[i].staff_work.push(staff[i].add_staff_work_one, staff[i].add_staff_work_two, staff[i].add_staff_work_three);
        daily_work.push({
          staff_name: staff[i].staff_name,
          day: this.today,
          phs: staff[i].phs,
          department: this.user_department,
          works: String(staff[i].staff_work),
          complete_work_check: false
        });
        axios.post('/api/staff_daily_work', daily_work[i]).then(function (res) {
          console.log(res.data);
          var work_checks = [];
          var work_check_length = res.data.works.split(',');

          for (var n = 0; n < work_check_length.length; n++) {
            work_checks.push('false');
          }

          complete_work = {
            staff_name: res.data.staff_name,
            staff_id: res.data.id,
            day: _this4.today,
            work_check: work_checks,
            staff_memo: '・'
          };
          axios.post('/api/complete_works', complete_work).then(function (res) {
            console.log(res);
          });
        });
      }

      ;
    }
  },
  created: function created() {
    var _this5 = this;

    axios.get('/api/users/' + this.login_user_id).then(function (res) {
      console.log(res.data);
      _this5.login_user = res.data;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38 ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "mt-2 mx-3"
};

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, "業務", -1
/* HOISTED */
);

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-6 col-form-label"
}, "日付:", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "col-6 col-lg-3"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-6 col-form-label"
}, "部署:", -1
/* HOISTED */
);

var _hoisted_6 = {
  "class": "col-6 col-lg-2 mb-2"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"null\">選択してください</option><option value=\"caregiver\">介護</option><option value=\"nurse\">看護</option><option value=\"rehabilitation\">リハビリ</option><option value=\"studentSupport\">施設管理</option>", 5);

var _hoisted_12 = [_hoisted_7];
var _hoisted_13 = {
  key: 0
};
var _hoisted_14 = {
  key: 1
};
var _hoisted_15 = {
  key: 2
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "新規業務登録", -1
/* HOISTED */
);

var _hoisted_17 = {
  "class": "col-6 col-lg-3"
};

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">選択してください</option><option value=\"Sunday\">日曜日</option><option value=\"Monday\">月曜日</option><option value=\"Tuesday\">火曜日</option><option value=\"Wednesday\">水曜日</option><option value=\"Thursday\">木曜日</option><option value=\"Friday\">金曜日</option><option value=\"saturday\">土曜日</option>", 8);

var _hoisted_26 = [_hoisted_18];
var _hoisted_27 = {
  "class": "col-4 col-lg-5"
};
var _hoisted_28 = {
  "class": "col-5 col-form-label"
};
var _hoisted_29 = {
  "class": "col-6 col-lg-3"
};

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<option value=\"\">選択してください</option><option value=\"Sunday\">日曜日</option><option value=\"Monday\">月曜日</option><option value=\"Tuesday\">火曜日</option><option value=\"Wednesday\">水曜日</option><option value=\"Thursday\">木曜日</option><option value=\"Friday\">金曜日</option><option value=\"Saturday\">土曜日</option>", 8);

var _hoisted_38 = [_hoisted_30];

var _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "職員名:", -1
/* HOISTED */
);

var _hoisted_40 = ["onUpdate:modelValue"];

var _hoisted_41 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: ""
}, "選択してください", -1
/* HOISTED */
);

var _hoisted_42 = ["value"];

var _hoisted_43 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "PHS番号:", -1
/* HOISTED */
);

var _hoisted_44 = {
  "class": "col-4 col-lg-2"
};
var _hoisted_45 = ["onUpdate:modelValue"];

var _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: ""
}, "選択してください", -1
/* HOISTED */
);

var _hoisted_47 = ["value"];

var _hoisted_48 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-5 col-form-label"
}, " 業務選択:", -1
/* HOISTED */
);

var _hoisted_49 = {
  "class": "col-4 col-lg-3"
};
var _hoisted_50 = ["onUpdate:modelValue"];
var _hoisted_51 = ["value"];

var _hoisted_52 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "追加業務1:", -1
/* HOISTED */
);

var _hoisted_53 = {
  "class": "col-6 col-lg-6"
};
var _hoisted_54 = ["onUpdate:modelValue"];

var _hoisted_55 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "追加業務2:", -1
/* HOISTED */
);

var _hoisted_56 = {
  "class": "col-6 col-lg-6"
};
var _hoisted_57 = ["onUpdate:modelValue"];

var _hoisted_58 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "追加業務3:", -1
/* HOISTED */
);

var _hoisted_59 = {
  "class": "col-6 col-lg-6"
};
var _hoisted_60 = ["onUpdate:modelValue"];
var _hoisted_61 = ["onClick"];

var _hoisted_62 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_63 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  var _component_router_view = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-view");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [_hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "date",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.today = $event;
    }),
    "class": "form-control"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.today]])]), _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.user_department = $event;
    })
  }, _hoisted_12, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.user_department]])])]), !$data.open_staff_method ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.getStaffName && $options.getStaffName.apply($options, arguments);
    }),
    "class": "mt-2 btn btn-warning"
  }, " 業務登録 ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.open_staff_method && $data.login_user.user_department === $data.user_department && $data.login_user.user_offitial_position !== '' || $data.open_staff_method && $data.user_department === 'studentSupport' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-warning py-0",
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.closeStaffData && $options.closeStaffData.apply($options, arguments);
    })
  }, "×")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.open_staff_method && $data.login_user.user_department === $data.user_department && $data.login_user.user_offitial_position !== '' || $data.open_staff_method && $data.user_department === 'studentSupport' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm mb-2",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.week = $event;
    })
  }, _hoisted_26, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.week]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.new_work = $event;
    }),
    "class": "form-control"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.new_work]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.addSelectNewWork && $options.addSelectNewWork.apply($options, arguments);
    }),
    "class": "btn btn-primary mt-2"
  }, "追加")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.today) + " 曜日:", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.today_week = $event;
    })
  }, _hoisted_38, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.today_week]])])]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.check_staffs_post, function (staff) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: staff.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_39, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": "col-6 col-lg-5",
      onClick: _cache[8] || (_cache[8] = function () {
        return $options.getDayliWork && $options.getDayliWork.apply($options, arguments);
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.staff_name = $event;
      },
      "class": "form-select form-select-sm"
    }, [_hoisted_41, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.select_staff_name, function (i) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: i.id,
        value: i.name
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i.name), 9
      /* TEXT, PROPS */
      , _hoisted_42);
    }), 128
    /* KEYED_FRAGMENT */
    ))], 8
    /* PROPS */
    , _hoisted_40), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, staff.staff_name]])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "class": "form-select form-select-sm",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.phs = $event;
      }
    }, [_hoisted_46, ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)([5000, 5010, 5020, 5030, 5040, 5050, 5060, 5070, 5080, 5090, 5100, 5101], function (n) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
        value: n,
        key: n
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(String(n).slice(0, -1)), 9
      /* TEXT, PROPS */
      , _hoisted_47);
    }), 64
    /* STABLE_FRAGMENT */
    ))], 8
    /* PROPS */
    , _hoisted_45), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, staff.phs]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_49, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.staff_work = $event;
      },
      size: "2",
      "class": "form-select form-select-sm",
      multiple: ""
    }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.select_daily_work, function (work) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
        key: work.id,
        value: work.work
      }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(work.work), 9
      /* TEXT, PROPS */
      , _hoisted_51);
    }), 128
    /* KEYED_FRAGMENT */
    ))], 8
    /* PROPS */
    , _hoisted_50), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, staff.staff_work]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_52, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_53, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "form-control",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.add_staff_work_one = $event;
      }
    }, null, 8
    /* PROPS */
    , _hoisted_54), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, staff.add_staff_work_one]])]), _hoisted_55, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_56, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "form-control",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.add_staff_work_two = $event;
      }
    }, null, 8
    /* PROPS */
    , _hoisted_57), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, staff.add_staff_work_two]])]), _hoisted_58, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_59, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
      "class": "form-control",
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return staff.add_staff_work_three = $event;
      }
    }, null, 8
    /* PROPS */
    , _hoisted_60), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, staff.add_staff_work_three]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: _cache[9] || (_cache[9] = function () {
        return $options.addStaffData && $options.addStaffData.apply($options, arguments);
      }),
      "class": "my-3 btn btn-primary"
    }, " 職員追加 "), $data.check_staffs_post.length > 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
      key: 0,
      onClick: function onClick($event) {
        return $options.removeStaffData(staff);
      },
      "class": "my-3 mx-2 btn btn-primary"
    }, " 削除 ", 8
    /* PROPS */
    , _hoisted_61)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_62]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[10] || (_cache[10] = function ($event) {
      return $options.addStaffDailyWork($data.check_staffs_post);
    }),
    "class": "btn btn-warning"
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.today) + ":業務登録 ", 1
  /* TEXT */
  )])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_63, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    to: '/staffdaywork/' + $props.login_user_id + '/works',
    "class": "mb-2 btn btn-primary"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.today) + ":業務表示 ", 1
      /* TEXT */
      )];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["to"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_view, {
    today: $data.today,
    user_department: $data.user_department
  }, null, 8
  /* PROPS */
  , ["today", "user_department"])]);
}

/***/ }),

/***/ "./resources/js/components/StaffDayWork.vue":
/*!**************************************************!*\
  !*** ./resources/js/components/StaffDayWork.vue ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StaffDayWork_vue_vue_type_template_id_5b9e2f38__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StaffDayWork.vue?vue&type=template&id=5b9e2f38 */ "./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38");
/* harmony import */ var _StaffDayWork_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StaffDayWork.vue?vue&type=script&lang=js */ "./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_StaffDayWork_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_StaffDayWork_vue_vue_type_template_id_5b9e2f38__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/StaffDayWork.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js":
/*!**************************************************************************!*\
  !*** ./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StaffDayWork_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StaffDayWork_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StaffDayWork.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38":
/*!********************************************************************************!*\
  !*** ./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38 ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StaffDayWork_vue_vue_type_template_id_5b9e2f38__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_StaffDayWork_vue_vue_type_template_id_5b9e2f38__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./StaffDayWork.vue?vue&type=template&id=5b9e2f38 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/StaffDayWork.vue?vue&type=template&id=5b9e2f38");


/***/ })

}]);
"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_MedicalHistory_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    login_user_id: String,
    id: String
  },
  data: function data() {
    return {
      keyword: '',
      medical_keyword: '',
      staff_name: '',
      day: '',
      medical: '',
      medical_history_value: '',
      update_day: '',
      update_medical: '',
      update_medical_history_value: '',
      medical_history_data: [],
      dayKeywordSecond: '',
      //<---- ページネーション処理 ---->
      currentPage: 0,
      // 現在のページ番号
      size: 10,
      // 1ページに表示するアイテムの上限
      pageRange: 6,
      // ページネーションに表示するページ数の上限
      items: [],
      // 表示するアイテムリスト
      head: '',
      arrayData: [],
      half: 0,
      dataArrays: []
    };
  },
  computed: {
    medicalHistorySerchArray: function medicalHistorySerchArray() {
      this.displayItems(this.serchMedicalHistories);
      return this.arrayData;
    },
    serchMedicalHistories: function serchMedicalHistories() {
      var medical_history_array = [];

      for (var i in this.medical_history_data) {
        var medicalHistoryData = this.medical_history_data[i];

        if (medicalHistoryData.medical_history_value.indexOf(this.keyword) !== -1 && medicalHistoryData.medical.indexOf(this.medical_keyword) !== -1) {
          medical_history_array.push(medicalHistoryData);
        }
      }

      ;
      var sort_medical_history_data = medical_history_array.slice().sort(function (a, b) {
        return Number(new Date(a.day)) - Number(new Date(b.day));
      }).reverse();
      return sort_medical_history_data;
    },
    keywordSerchMedicalHistories: function keywordSerchMedicalHistories() {
      return this.serchMedicalHistories.slice(0, 5);
    },
    pages: function pages() {
      return Math.ceil(this.items.length / this.size);
    },
    // ページネーションで表示するページ番号の範囲を取得する
    displayPageRange: function displayPageRange() {
      this.half = Math.ceil(this.pageRange / 2);
      var start = 0;
      var end = 0;

      if (this.pages < this.pageRange) {
        // ページネーションに表示する上限よりページ数がすくない場合
        start = 1;
        end = this.pages;
      } else if (this.currentPage < this.half) {
        //前半3ページ
        start = 1;
        end = start + this.pageRange - 1;
      } else if (this.pages - this.half - 1 < this.currentPage) {
        //後半3ページ
        end = this.pages;
        start = end - this.pageRange + 1;
      } else {
        //現在のページを真ん中に表示
        start = this.currentPage - this.half + 1;
        end = this.currentPage + this.half;
      }

      var indexes = [];

      for (var i = start; i <= end; i++) {
        indexes.push(i);
      } // console.log("indexes" + indexes);


      return indexes;
    }
  },
  methods: {
    addMedicalHistory: function addMedicalHistory() {
      var _this = this;

      var post_medical_history = {
        factoryuser_id: this.id,
        staff_name: this.staff_name,
        day: this.day,
        medical: this.medical,
        medical_history_value: this.medical_history_value
      };
      axios.post('/api/factoryusers/' + this.id + '/medical_histories', post_medical_history).then(function (res) {
        console.log(res.data);

        _this.getMedicalHIstory();

        _this.day = '';
        _this.medical = '';
        _this.medical_history_value = '';
      });
    },
    updateMedicalHistory: function updateMedicalHistory(history) {
      var _this2 = this;

      var post_medical_history = {
        factoryuser_id: this.id,
        staff_name: this.staff_name,
        day: this.update_day,
        medical: this.update_medical,
        medical_history_value: this.update_medical_history_value
      };
      axios.put('/api/factoryusers/medical_histories/' + history.id, post_medical_history).then(function (res) {
        console.log(res.data);

        _this2.getMedicalHIstory();

        _this2.update_day = '';
        _this2.update_medical = '';
        _this2.update_medical_history_value = '';
      });
    },
    getMedicalHIstory: function getMedicalHIstory() {
      var _this3 = this;

      axios.get('/api/factoryusers/' + this.id + '/medical_histories').then(function (res) {
        _this3.medical_history_data = res.data;
      });
    },
    deleteMedicalHistory: function deleteMedicalHistory(history) {
      var _this4 = this;

      axios["delete"]('/api/factoryusers/medical_histories/' + history.id).then(function () {
        _this4.getMedicalHIstory();
      });
    },
    // 現在のページで表示するアイテムリストを取得する
    displayItems: function displayItems(array) {
      this.head = this.currentPage * this.size;
      this.items = array;
      this.arrayData = array.slice(this.head, this.head + this.size); //0 ~ 10までの配列を表示させる
    },
    //ページ先頭に移動する
    first: function first() {
      this.currentPage = 0;
    },
    //ページ最後に移動する
    last: function last() {
      this.currentPage = this.pages - 1;
    },
    //1ページ前に移動する
    prev: function prev() {
      if (0 < this.currentPage) {
        this.currentPage--;
      }
    },
    //1ページ次に移動する
    next: function next() {
      if (this.currentPage < this.pages - 1) {
        this.currentPage++;
      }
    },
    //指定したページに移動する
    pageSelect: function pageSelect(index) {
      this.currentPage = index - 1;
    }
  },
  created: function created() {
    var _this5 = this;

    axios.get('/api/users/' + this.login_user_id).then(function (res) {
      _this5.staff_name = res.data.name;
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "既往歴", -1
/* HOISTED */
);

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-form-label col-5"
}, "発症日:", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "col-6 col-lg-3 mb-2"
};

var _hoisted_5 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-form-label col-5"
}, "診療科:", -1
/* HOISTED */
);

var _hoisted_6 = {
  "class": "col-6 col-lg-3 mb-2"
};

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: ""
}, "選択してください", -1
/* HOISTED */
);

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "内科"
}, "内科", -1
/* HOISTED */
);

var _hoisted_9 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "外科"
}, "外科", -1
/* HOISTED */
);

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "眼科"
}, "眼科", -1
/* HOISTED */
);

var _hoisted_11 = [_hoisted_7, _hoisted_8, _hoisted_9, _hoisted_10];
var _hoisted_12 = {
  "class": "col-10 col-lg-6 mb-3"
};

var _hoisted_13 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-form-label col-5"
}, "既往歴更新:", -1
/* HOISTED */
);

var _hoisted_15 = {
  "class": "col-6 col-lg-3 mb-2"
};

var _hoisted_16 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-form-label col-5"
}, "診療科:", -1
/* HOISTED */
);

var _hoisted_17 = {
  "class": "col-6 col-lg-3 mb-2"
};

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: ""
}, "選択してください", -1
/* HOISTED */
);

var _hoisted_19 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "内科"
}, "内科", -1
/* HOISTED */
);

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "外科"
}, "外科", -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "眼科"
}, "眼科", -1
/* HOISTED */
);

var _hoisted_22 = [_hoisted_18, _hoisted_19, _hoisted_20, _hoisted_21];
var _hoisted_23 = {
  "class": "col-10 col-lg-6 mb-2"
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "既往歴")], -1
/* HOISTED */
);

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-5 col-form-label"
}, "診療科検索:", -1
/* HOISTED */
);

var _hoisted_27 = {
  "class": "col-3 col-lg-3"
};

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: ""
}, null, -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "内科"
}, "内科", -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "外科"
}, "外科", -1
/* HOISTED */
);

var _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
  value: "眼科"
}, "眼科", -1
/* HOISTED */
);

var _hoisted_32 = [_hoisted_28, _hoisted_29, _hoisted_30, _hoisted_31];

var _hoisted_33 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-5 col-form-label pt-0"
}, "病名検索:", -1
/* HOISTED */
);

var _hoisted_34 = {
  "class": "col-6 col-lg-3 mb-2"
};
var _hoisted_35 = {
  id: "medical_history_data"
};
var _hoisted_36 = {
  "class": "overflow-auto",
  style: {
    "height": "300px"
  }
};
var _hoisted_37 = ["onClickOnce"];
var _hoisted_38 = ["onClick"];

var _hoisted_39 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_40 = {
  "class": "text-center mt-1"
};
var _hoisted_41 = {
  "class": "container"
};
var _hoisted_42 = {
  "class": "pagination",
  style: {
    "justify-content": "center"
  }
};
var _hoisted_43 = {
  "class": "page-item"
};
var _hoisted_44 = {
  "class": "page-item"
};
var _hoisted_45 = ["onClick"];
var _hoisted_46 = {
  "class": "page-item"
};
var _hoisted_47 = {
  "class": "page-item"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    onMousemoveOnce: _cache[13] || (_cache[13] = function () {
      return $options.getMedicalHIstory && $options.getMedicalHIstory.apply($options, arguments);
    }),
    "class": "mt-2"
  }, [_hoisted_1, _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "date",
    "class": "form-control",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.day = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.day]])]), _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.medical = $event;
    })
  }, _hoisted_11, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.medical]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.medical_history_value = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.medical_history_value]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.addMedicalHistory && $options.addMedicalHistory.apply($options, arguments);
    }),
    "class": "btn btn-primary"
  }, " 登録 ")]), _hoisted_13, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "date",
    "class": "form-control",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.update_day = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_day]])]), _hoisted_16, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.update_medical = $event;
    })
  }, _hoisted_22, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.update_medical]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.update_medical_history_value = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_medical_history_value]])])]), _hoisted_24, _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "class": "form-select form-select-sm pb-0",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.medical_keyword = $event;
    })
  }, _hoisted_32, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.medical_keyword]])]), _hoisted_33, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "class": "form-control",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return $data.keyword = $event;
    }),
    list: "medical_history_data"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.keyword]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("datalist", _hoisted_35, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.keywordSerchMedicalHistories, function (n) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: n
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(n.medical_history_value), 1
    /* TEXT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.medicalHistorySerchArray, function (history) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: history.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "日付: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(history.day.slice(0, 10)), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "診療科: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(history.medical), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(history.medical_history_value), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClickOnce: function onClickOnce($event) {
        return $options.updateMedicalHistory(history);
      },
      "class": "btn btn-primary px-0 col-2 col-lg-1"
    }, " 更新 ", 40
    /* PROPS, HYDRATE_EVENTS */
    , _hoisted_37), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.deleteMedicalHistory(history);
      },
      "class": "btn btn-primary px-0 mx-2 col-2 col-lg-1"
    }, " 削除 ", 8
    /* PROPS */
    , _hoisted_38), _hoisted_39]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage + 1) + "ページ", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[9] || (_cache[9] = function () {
      return $options.first && $options.first.apply($options, arguments);
    }),
    "class": "page-link"
  }, "«")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[10] || (_cache[10] = function () {
      return $options.prev && $options.prev.apply($options, arguments);
    }),
    "class": "page-link"
  }, "<")]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayPageRange, function (i) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
      key: i,
      "class": "page-item"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
      onClick: function onClick($event) {
        return $options.pageSelect(i);
      },
      "class": "page-link"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(i), 9
    /* TEXT, PROPS */
    , _hoisted_45)]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[11] || (_cache[11] = function () {
      return $options.next && $options.next.apply($options, arguments);
    }),
    "class": "page-link"
  }, ">")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_47, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[12] || (_cache[12] = function () {
      return $options.last && $options.last.apply($options, arguments);
    }),
    "class": "page-link"
  }, "»")])])])])])], 32
  /* HYDRATE_EVENTS */
  );
}

/***/ }),

/***/ "./resources/js/components/MedicalHistory.vue":
/*!****************************************************!*\
  !*** ./resources/js/components/MedicalHistory.vue ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MedicalHistory_vue_vue_type_template_id_137cde6e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MedicalHistory.vue?vue&type=template&id=137cde6e */ "./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e");
/* harmony import */ var _MedicalHistory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MedicalHistory.vue?vue&type=script&lang=js */ "./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_MedicalHistory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_MedicalHistory_vue_vue_type_template_id_137cde6e__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/MedicalHistory.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js":
/*!****************************************************************************!*\
  !*** ./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MedicalHistory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MedicalHistory_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MedicalHistory.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MedicalHistory_vue_vue_type_template_id_137cde6e__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_MedicalHistory_vue_vue_type_template_id_137cde6e__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./MedicalHistory.vue?vue&type=template&id=137cde6e */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/MedicalHistory.vue?vue&type=template&id=137cde6e");


/***/ })

}]);
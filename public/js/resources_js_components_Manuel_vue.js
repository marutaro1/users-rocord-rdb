"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Manuel_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    id: String,
    login_user_id: String
  },
  data: function data() {
    return {
      keyword: '',
      staff_name: '',
      title: '',
      manuel: '',
      update_title: '',
      update_manuel: '',
      manuel_data: [],
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
    serchManuels: function serchManuels() {
      var manuel_array = [];

      for (var i in this.manuel_data) {
        var manuelData = this.manuel_data[i];

        if (manuelData.manuel_value.indexOf(this.keyword) !== -1) {
          manuel_array.push(manuelData);
        }
      }

      ;
      return manuel_array;
    },
    keywordSerchManuels: function keywordSerchManuels() {
      return this.serchManuels.slice(0, 5);
    },
    manuelArray: function manuelArray() {
      this.displayItems(this.serchManuels);
      return this.arrayData;
    },
    //ページ数を取得する
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
    addManuel: function addManuel() {
      var _this = this;

      var manuel_value = {
        factoryuser_id: this.id,
        staff_name: this.staff_name,
        manuel_title: this.title,
        manuel_value: this.manuel
      };
      axios.post('/api/factoryusers/' + this.id + '/manuels', manuel_value).then(function (res) {
        console.log(res);

        _this.getManuel();

        _this.title = '';
        _this.manuel = '';
      });
    },
    getManuel: function getManuel() {
      var _this2 = this;

      axios.get('/api/factoryusers/' + this.id + '/manuels').then(function (res) {
        _this2.manuel_data = res.data;
      });
    },
    updateManuel: function updateManuel(manuel) {
      var _this3 = this;

      var manuel_value = {
        id: manuel.id,
        factoryuser_id: this.id,
        staff_name: this.staff_name,
        manuel_title: this.update_title,
        manuel_value: this.update_manuel
      };
      axios.put('/api/factoryusers/manuels/' + String(manuel.id), manuel_value).then(function (res) {
        console.log(res);

        _this3.getManuel();

        _this3.update_title = '';
        _this3.update_manuel = '';
      });
    },
    deleteManuel: function deleteManuel(manuel) {
      var _this4 = this;

      axios["delete"]('/api/factoryusers/manuels/' + manuel.id).then(function (res) {
        _this4.getManuel();

        console.log(res.data);
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
      console.log(res.data);
      console.log(_this5.staff_name);
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "マニュアル", -1
/* HOISTED */
);

var _hoisted_3 = {
  "class": "col-12"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "タイトル:", -1
/* HOISTED */
);

var _hoisted_5 = {
  "class": "col-10 col-lg-3"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-6 col-form-label"
}, "新規マニュアル:", -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "col-10 col-lg-5 mb-3"
};

var _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_9 = {
  "class": "mb-4"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  lass: "col-2 col-form-label"
}, "タイトル更新:", -1
/* HOISTED */
);

var _hoisted_11 = {
  "class": "col-10 col-lg-3"
};

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  lass: "col-2 col-form-label"
}, "マニュアル更新:", -1
/* HOISTED */
);

var _hoisted_13 = {
  "class": "col-10 col-lg-5"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, "マニュアル一覧", -1
/* HOISTED */
);

var _hoisted_16 = {
  "class": "col-6 col-lg-3 mb-3"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  lass: "col-2 col-form-label"
}, "キーワード検索:", -1
/* HOISTED */
);

var _hoisted_18 = {
  id: "manuel_data"
};
var _hoisted_19 = {
  "class": "overflow-auto",
  style: {
    "height": "300px"
  }
};
var _hoisted_20 = {
  "class": "space"
};
var _hoisted_21 = ["onClick"];
var _hoisted_22 = ["onClick"];

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_24 = {
  "class": "text-center mt-1"
};
var _hoisted_25 = {
  "class": "container"
};
var _hoisted_26 = {
  "class": "pagination",
  style: {
    "justify-content": "center"
  }
};
var _hoisted_27 = {
  "class": "page-item"
};
var _hoisted_28 = {
  "class": "page-item"
};
var _hoisted_29 = ["onClick"];
var _hoisted_30 = {
  "class": "page-item"
};
var _hoisted_31 = {
  "class": "page-item"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    "class": "mt-2",
    onMousemoveOnce: _cache[10] || (_cache[10] = function () {
      return $options.getManuel && $options.getManuel.apply($options, arguments);
    })
  }, [_hoisted_1, _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(_ctx.fname) + " ", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "data",
    "class": "form-control",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.title = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.title]])]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.manuel = $event;
    })
  }, " ", 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.manuel]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.addManuel && $options.addManuel.apply($options, arguments);
    }),
    "class": "btn btn-primary"
  }, "登録")]), _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "datal",
    "class": "form-control",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.update_title = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_title]])]), _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.update_manuel = $event;
    })
  }, " ", 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_manuel]])])]), _hoisted_14, _hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [_hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "class": "form-control",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.keyword = $event;
    }),
    list: "manuel_data"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.keyword]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("datalist", _hoisted_18, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.keywordSerchManuels, function (n) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: n
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(n.manuel_value), 1
    /* TEXT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.manuelArray, function (manuel) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: manuel.id
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "タイトル: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(manuel.manuel_title), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(manuel.manuel_value), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.updateManuel(manuel);
      },
      "class": "btn btn-primary px-0 col-2 col-lg-1"
    }, " 更新 ", 8
    /* PROPS */
    , _hoisted_21), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.deleteManuel(manuel);
      },
      "class": "btn btn-primary px-0 col-2 col-lg-1 mx-2"
    }, " 削除 ", 8
    /* PROPS */
    , _hoisted_22), _hoisted_23]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage + 1) + "ページ", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.first && $options.first.apply($options, arguments);
    }),
    "class": "page-link"
  }, "«")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[7] || (_cache[7] = function () {
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
    , _hoisted_29)]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[8] || (_cache[8] = function () {
      return $options.next && $options.next.apply($options, arguments);
    }),
    "class": "page-link"
  }, ">")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[9] || (_cache[9] = function () {
      return $options.last && $options.last.apply($options, arguments);
    }),
    "class": "page-link"
  }, "»")])])])])])], 32
  /* HYDRATE_EVENTS */
  );
}

/***/ }),

/***/ "./resources/js/components/Manuel.vue":
/*!********************************************!*\
  !*** ./resources/js/components/Manuel.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Manuel_vue_vue_type_template_id_2e20a56d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Manuel.vue?vue&type=template&id=2e20a56d */ "./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d");
/* harmony import */ var _Manuel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Manuel.vue?vue&type=script&lang=js */ "./resources/js/components/Manuel.vue?vue&type=script&lang=js");
/* harmony import */ var _work_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_work_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Manuel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Manuel_vue_vue_type_template_id_2e20a56d__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Manuel.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Manuel.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/components/Manuel.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Manuel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Manuel_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Manuel.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d":
/*!**************************************************************************!*\
  !*** ./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Manuel_vue_vue_type_template_id_2e20a56d__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Manuel_vue_vue_type_template_id_2e20a56d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Manuel.vue?vue&type=template&id=2e20a56d */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Manuel.vue?vue&type=template&id=2e20a56d");


/***/ })

}]);
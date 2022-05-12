"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_Records_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    id: String,
    login_user_id: String
  },
  data: function data() {
    return {
      real_date: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("00" + new Date().getDate()).slice(-2) + "T" + ("00" + new Date().getHours()).slice(-2) + ":" + "00",
      //入力した日付を格納する値
      day: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("00" + new Date().getDate()).slice(-2) + "T" + ("00" + new Date().getHours()).slice(-2) + ":" + "00",
      record_value: '',
      staff_name: 'staff',
      factoryuser_record_data: {},
      select_day_list: [],
      update_day: '',
      update_record_value: '',
      keyword: '',
      dayKeywordFirst: '',
      dayKeywordSecond: '',
      start_day: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2) + "-01",
      end_day: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2) + "-31",
      select_month: '',
      no_select_view_day: new Date().getFullYear() + "-" + ("00" + (new Date().getMonth() + 1)).slice(-2),
      login_user: [],
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
    serchRecords: function serchRecords() {
      var _this = this;

      var record_data = [];

      for (var i in this.factoryuser_record_data) {
        var recordData = this.factoryuser_record_data[i];

        if (recordData.record_value.indexOf(this.keyword) !== -1) {
          record_data.push(recordData);
        }
      }

      ;
      var day_select_record_data = record_data.filter(function (rec) {
        _this.getSelectDay(_this.start_day, _this.end_day);

        var custom_includes = function custom_includes(arr, target) {
          return arr.some(function (el) {
            return target.includes(el);
          });
        }; //独自関数


        return custom_includes(_this.select_day_list, rec.day);
      });
      var sort_record_data = day_select_record_data.slice().sort(function (a, b) {
        return Number(new Date(a.day)) - Number(new Date(b.day));
      }).reverse();
      return sort_record_data;
    },
    keywordSerchRecords: function keywordSerchRecords() {
      return this.serchRecords.slice(0, 5);
    },
    recordArray: function recordArray() {
      this.displayItems(this.serchRecords);
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
    getLoginUser: function getLoginUser() {
      var _this2 = this;

      axios.get('/api/users/' + this.login_user_id).then(function (res) {
        _this2.login_user = res.data;
        return _this2.login_user;
      });
    },
    submit: function submit() {
      var _this3 = this;

      var record_data = {
        day: this.day,
        day_record_check: true,
        record_value: this.record_value,
        staff_name: this.login_user.name,
        factoryuser_id: this.id
      };
      axios.post('/api/factoryusers/' + this.id + '/records', record_data).then(function (res) {
        axios.get('/api/factoryusers/' + _this3.id).then(function (responce) {
          console.log(responce);

          if (new Date(responce.data[0].day_record_check + 'T00:00').getTime() <= new Date(_this3.day).getTime() || responce.data[0].day_record_check === '・') {
            var factoryuser = {
              factoryuser_name: _this3.factoryuser_name,
              birthday: _this3.birthday,
              care_level: _this3.care_level,
              number: _this3.number,
              day_record_check: _this3.day.slice(0, 10)
            };
            axios.put('/api/factoryusers/' + _this3.id, factoryuser).then(function (res) {
              console.log(res);

              _this3.getRecord();

              _this3.record_value = '';
              _this3.day = _this3.real_date;
            });
          }
        });
      });
    },
    updateRecord: function updateRecord(record_id) {
      var _this4 = this;

      var record = {
        id: record_id,
        day: this.update_day,
        day_record_check: true,
        record_value: this.update_record_value,
        staff_name: this.login_user.name,
        factoryuser_id: String(this.id)
      };
      axios.put('/api/factoryusers/factoryuser/records/' + record_id, record).then(function (res) {
        axios.get('/api/factoryusers/' + _this4.id).then(function (responce) {
          console.log(responce);

          if (new Date(responce.data[0].day_record_check + 'T00:00').getTime() <= new Date(_this4.update_day).getTime()) {
            var factoryuser = {
              factoryuser_name: _this4.factoryuser_name,
              birthday: _this4.birthday,
              care_level: _this4.care_level,
              number: _this4.number,
              day_record_check: _this4.update_day.slice(0, 10)
            };
            axios.put('/api/factoryusers/' + _this4.id, factoryuser).then(function (res) {
              console.log(res);

              _this4.getRecord();

              _this4.update_record_value = '';
              _this4.update_day = '';
            });
          }
        });
      });
    },
    getRecord: function getRecord() {
      var _this5 = this;

      axios.get('/api/factoryusers/' + this.id + '/records').then(function (res) {
        _this5.factoryuser_record_data = res.data;
      });
    },
    getSelectDay: function getSelectDay(start, end) {
      var dayData = []; //startDayからendDayまでの日付を入れる配列

      var startDate = new Date(start);
      var endDate = new Date(end);

      while (startDate < endDate) {
        dayData = [].concat(_toConsumableArray(dayData), [startDate.getFullYear() + '-' + ("00" + (startDate.getMonth() + 1)).slice(-2) + '-' + ("00" + startDate.getDate()).slice(-2)]);
        startDate.setDate(startDate.getDate() + 1); //startDayをdayData配列の中に入れ、+1日してwhileでendDayまでのループを回す
      }

      dayData = [].concat(_toConsumableArray(dayData), [endDate.getFullYear() + '-' + ("00" + (endDate.getMonth() + 1)).slice(-2) + '-' + ("00" + endDate.getDate()).slice(-2)]);
      this.select_day_list = dayData; //dayData配列内にstartDayからendDayまでのデータが格納され、それを空の配列内に入れ直す
    },
    destoryRecord: function destoryRecord(record_data) {
      var _this6 = this;

      axios["delete"]('/api/factoryusers/factoryuser/records/' + record_data.id).then(function () {
        _this6.getRecord();

        axios.get('/api/factoryusers/' + _this6.id).then(function (responce) {
          if (responce.data[0].day_record_check === record_data.day.slice(0, 10)) {
            var day_record_check_value = _this6.serchRecords[0].day.slice(0, 10);

            var factoryuser = {
              factoryuser_name: _this6.factoryuser_name,
              birthday: _this6.birthday,
              care_level: _this6.care_level,
              number: _this6.number,
              day_record_check: day_record_check_value
            };
            axios.put('/api/factoryusers/' + _this6.id, factoryuser).then(function (res) {
              console.log(res.data);
            });
          }
        });
      });
    },
    trackDays: function trackDays(start, end) {
      this.start_day = start;
      this.end_day = end;
    },
    getMonthData: function getMonthData(day) {
      this.start_day = day + '-01';
      this.end_day = day + '-31';
      console.log(this.start_day + '/' + this.end_day);
    },
    postArchives: function postArchives(record) {
      var _this7 = this;

      var user_name = '';
      var user_number = '';
      axios.get('/api/factoryusers/' + this.id).then(function (responce) {
        console.log(responce.data[0]);
        user_name = responce.data[0].factoryuser_name;
        user_number = responce.data[0].number;
      }).then(function () {
        var post_archive_value = {
          factoryuser_id: _this7.id,
          factoryuser_name: user_name,
          factoryuser_number: user_number,
          staff_id: _this7.login_user_id,
          staff_name: _this7.login_user.name,
          day: _this7.real_date,
          archive_record: record.record_value,
          archive_memo: '・'
        };
        axios.get('/api/archives').then(function (res) {
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].day.slice(0, 10) === _this7.real_date.slice(0, 10) && String(res.data[i].factoryuser_id) === _this7.id) {
              axios["delete"]('/api/archives/' + String(res.data[i].id));
            }
          }

          ;
        }).then(function () {
          axios.post('/api/archives', post_archive_value);
        });
      });
    },
    sortArray: function sortArray(array) {
      //日付順に並び替える
      this.dataArrays = array.slice().sort(function (a, b) {
        return Number(new Date(a.day)) - Number(new Date(b.day));
      }).reverse();
    },
    clearData: function clearData() {
      this.dayKeywordFirst = '';
      this.dayKeywordSecond = '';
      this.getSelectDay(this.start_day, this.end_day);
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
  mounted: function mounted() {
    this.getLoginUser();
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=template&id=270f56a7":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=template&id=270f56a7 ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");


var _hoisted_1 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_2 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h4", null, "記録", -1
/* HOISTED */
);

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label mb-1"
}, "新規記録入力:", -1
/* HOISTED */
);

var _hoisted_4 = {
  "class": "col-8 col-lg-3 mb-3"
};
var _hoisted_5 = {
  "class": "col-10 col-lg-6 mb-3"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_7 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-4 col-form-label"
}, "記録更新:", -1
/* HOISTED */
);

var _hoisted_8 = {
  "class": "col-8 col-lg-3 mb-3"
};
var _hoisted_9 = {
  "class": "col-10 col-lg-6"
};

var _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("br", null, null, -1
/* HOISTED */
);

var _hoisted_11 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_12 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  lass: "col-2 col-form-label"
}, "各月の記録抽出:", -1
/* HOISTED */
);

var _hoisted_13 = {
  "class": "col-6 my-2"
};

var _hoisted_14 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_15 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-5 col-form-label"
}, "日付指定記録抽出:", -1
/* HOISTED */
);

var _hoisted_16 = {
  "class": "col-6 mb-2"
};

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
  "class": "m-0 p-0"
}, "から", -1
/* HOISTED */
);

var _hoisted_18 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_19 = {
  key: 0
};
var _hoisted_20 = {
  key: 1
};
var _hoisted_21 = {
  key: 2
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "class": "col-6 col-form-label mb-1"
}, "キーワード検索:", -1
/* HOISTED */
);

var _hoisted_23 = {
  "class": "col-6 mb-3"
};
var _hoisted_24 = {
  id: "record_data"
};
var _hoisted_25 = {
  "class": "overflow-auto",
  style: {
    "height": "300px"
  }
};
var _hoisted_26 = {
  "class": "space"
};
var _hoisted_27 = ["onClick"];
var _hoisted_28 = ["onClick"];
var _hoisted_29 = ["onClick"];

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("hr", null, null, -1
/* HOISTED */
);

var _hoisted_31 = {
  "class": "text-center mt-1"
};
var _hoisted_32 = {
  "class": "container"
};
var _hoisted_33 = {
  "class": "pagination",
  style: {
    "justify-content": "center"
  }
};
var _hoisted_34 = {
  "class": "page-item"
};
var _hoisted_35 = {
  "class": "page-item"
};
var _hoisted_36 = ["onClick"];
var _hoisted_37 = {
  "class": "page-item"
};
var _hoisted_38 = {
  "class": "page-item"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    "class": "mt-2",
    onMousemoveOnce: _cache[16] || (_cache[16] = function () {
      return $options.getRecord && $options.getRecord.apply($options, arguments);
    })
  }, [_hoisted_1, _hoisted_2, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "datetime-local",
    "class": "form-control",
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.day = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.day]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.record_value = $event;
    })
  }, " ", 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.record_value]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.submit && $options.submit.apply($options, arguments);
    }),
    "class": "btn btn-primary mx-1"
  }, "登録")]), _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "datetime-local",
    "class": "form-control",
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.update_day = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_day]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
    "class": "form-control",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.update_record_value = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.update_record_value]])]), _hoisted_10]), _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "month",
    "class": "form-control",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.select_month = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.select_month]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[6] || (_cache[6] = function ($event) {
      return $options.getMonthData($data.select_month);
    }),
    "class": "btn btn-primary px-1"
  }, " 表示 ")]), _hoisted_14, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_15, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "date",
    "class": "form-control",
    "onUpdate:modelValue": _cache[7] || (_cache[7] = function ($event) {
      return $data.dayKeywordFirst = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.dayKeywordFirst]]), _hoisted_17, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "date",
    "class": "form-control",
    "onUpdate:modelValue": _cache[8] || (_cache[8] = function ($event) {
      return $data.dayKeywordSecond = $event;
    })
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.dayKeywordSecond]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[9] || (_cache[9] = function ($event) {
      return $options.trackDays($data.dayKeywordFirst, $data.dayKeywordSecond);
    }),
    "class": "btn btn-primary px-1"
  }, " 表示 "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[10] || (_cache[10] = function () {
      return $options.clearData && $options.clearData.apply($options, arguments);
    }),
    "class": "btn btn-primary px-1 mx-2"
  }, "クリア")]), _hoisted_18, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [!$data.select_month && !$data.dayKeywordFirst && !$data.dayKeywordSecond ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.no_select_view_day) + "の記録", 1
  /* TEXT */
  )])) : $data.select_month ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.select_month) + "の記録", 1
  /* TEXT */
  )])) : $data.dayKeywordFirst && $data.dayKeywordSecond && !$data.select_month ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dayKeywordFirst) + "から" + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.dayKeywordSecond) + "までの記録", 1
  /* TEXT */
  )])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), _hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "class": "form-control",
    "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
      return $data.keyword = $event;
    }),
    list: "record_data"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.keyword]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("datalist", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.keywordSerchRecords, function (n) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      key: n
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(n.record_value), 1
    /* TEXT */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.recordArray, function (record, key) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: key
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "日付: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(record.day), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(record.record_value), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "登録者: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(record.staff_name), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "col-2 col-lg-1 btn btn-primary px-0",
      onClick: function onClick($event) {
        return $options.updateRecord(record.id);
      }
    }, " 更新 ", 8
    /* PROPS */
    , _hoisted_27), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "col-2 col-lg-1 btn btn-primary px-0 mx-2",
      onClick: function onClick($event) {
        return $options.destoryRecord(record);
      }
    }, " 削除 ", 8
    /* PROPS */
    , _hoisted_28), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "col-5 col-lg-2 btn btn-primary px-0",
      onClick: function onClick($event) {
        return $options.postArchives(record);
      }
    }, " 記録まとめへ追加 ", 8
    /* PROPS */
    , _hoisted_29), _hoisted_30]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.currentPage + 1) + "ページ", 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[12] || (_cache[12] = function () {
      return $options.first && $options.first.apply($options, arguments);
    }),
    "class": "page-link"
  }, "«")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[13] || (_cache[13] = function () {
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
    , _hoisted_36)]);
  }), 128
  /* KEYED_FRAGMENT */
  )), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[14] || (_cache[14] = function () {
      return $options.next && $options.next.apply($options, arguments);
    }),
    "class": "page-link"
  }, ">")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[15] || (_cache[15] = function () {
      return $options.last && $options.last.apply($options, arguments);
    }),
    "class": "page-link"
  }, "»")])])])])])], 32
  /* HYDRATE_EVENTS */
  );
}

/***/ }),

/***/ "./resources/js/components/Records.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/Records.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Records_vue_vue_type_template_id_270f56a7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Records.vue?vue&type=template&id=270f56a7 */ "./resources/js/components/Records.vue?vue&type=template&id=270f56a7");
/* harmony import */ var _Records_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Records.vue?vue&type=script&lang=js */ "./resources/js/components/Records.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_maruokanoborutarou_Desktop_Heroku_herok_deploy_laravel_user_record_backend_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Records_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Records_vue_vue_type_template_id_270f56a7__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Records.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Records.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/components/Records.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Records_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Records_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Records.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Records.vue?vue&type=template&id=270f56a7":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Records.vue?vue&type=template&id=270f56a7 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Records_vue_vue_type_template_id_270f56a7__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_babel_loader_lib_index_js_clonedRuleSet_6_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_4_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Records_vue_vue_type_template_id_270f56a7__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Records.vue?vue&type=template&id=270f56a7 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/babel-loader/lib/index.js??clonedRuleSet-6.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[4]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Records.vue?vue&type=template&id=270f56a7");


/***/ })

}]);
<template>
  <div class="mt-2 mx-3" @mousemove.once="getFactoryusers">
    <h2>利用者一覧</h2>
    <label class="col-5 col-form-label">キーワード検索: </label>
    <div class="col-5">
      <input
        type="text"
        class="form-control"
        v-model="keyword"
        list="factoryuser_data"
      />
      <datalist id="factoryuser_data">
        <option v-for="n in serchFactoryusers">
          {{n.factoryuser_name}}
        </option>
      </datalist>
    </div>

    <label class="col-5 col-form-label">フロア検索: </label>
    <div class="col-6 col-lg-2">
      <select class="form-select form-select-sm" v-model="floorKeyword">
        <option value="">選択してください</option>
        <option
          v-for="n in [
            '1F',
            '2F',
            '3F',
            '4F',
            '5F',
            '6F',
            '7F',
            '8F',
            '9F',
            '10F',
          ]"
          :key="n"
          :value="n.slice(0, -1)"
        >
          {{ n }}
        </option>
      </select>
    </div>

    <label class="col-5 col-form-label">要介護度: </label>
    <div class="col-6 col-lg-3">
      <select
        class="form-select form-select-sm"
        v-model="serchCareLevelKeyword"
      >
        <option value="" selected="selected">選択してください</option>
        <option value="自立">自立</option>
        <option value="要">要支援・要介護</option>
        <option value="要支援">要支援</option>
        <option value="要介護">要介護</option>
      </select>
    </div>

    <div>
      <div v-if="boolean_day_record_check === false">
        <button @click="todayNotRegisteredRecord" class="btn btn-primary mt-2">
          {{ real_date.slice(0,10) }} 記録未登録者
        </button>
      </div>
      <div v-else-if="boolean_day_record_check === true">
        <button @click="getFactoryusers" class="btn btn-warning mt-2">
          戻る
        </button>
      </div>
    <hr />
    </div>

    <div class="overflow-auto" style="height:600px;">
      <div v-for="(user, key) in factoryusersArray" :key="key">
        <div>
          <p>
            名前: {{user.factoryuser_name}}
          </p>
          <p>部屋番号:<router-link :to="'/factoryusers/' + auth_id + '/' + user.id + '/records'">{{ String(user.number).slice(0, -1) }}</router-link> </p>
          <p>要介護度: {{user.care_level}}</p>
          <p>最終記録登録日:{{user.day_record_check}}</p>
          <hr />
        </div>
      </div>
    </div>

    <div class="text-center mt-1">
      <p>{{ currentPage + 1 }}ページ</p>
      <div class="container">
        <nav>
          <ul class="pagination" style="justify-content: center">
            <li class="page-item">
              <a @click="first" class="page-link">&laquo;</a>
            </li>
            <li class="page-item">
              <a @click="prev" class="page-link">&lt;</a>
            </li>

            <li v-for="i in displayPageRange" :key="i" class="page-item">
              <a @click="pageSelect(i)" class="page-link">{{ i }}</a>
            </li>

            <li class="page-item">
              <a @click="next" class="page-link">&gt;</a>
            </li>
            <li class="page-item">
              <a @click="last" class="page-link">&raquo;</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    
  </div>
</template>
<script>
  export default {
    props: {
      auth_id: Number
    },
    data() {
      return {
        factoryusers: [],
        keyword: '',
        floorKeyword: '',
        serchCareLevelKeyword: '',
        real_date: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("00" + new Date().getDate()).slice(-2) +
                        "T" +
                        ("00" + new Date().getHours()).slice(-2) +
                        ":" +
                        "00", //入力した日付を格納する値
        boolean_day_record_check: false,  
        //<---- ページネーション処理 ---->
            currentPage: 0, // 現在のページ番号
            size: 10, // 1ページに表示するアイテムの上限
            pageRange: 6, // ページネーションに表示するページ数の上限
            items: [], // 表示するアイテムリスト
            head: '',
            arrayData: [],
            half: 0,
            dataArrays: [],
      }
    },
     computed: {
            factoryusersArray() {
                this.displayItems(this.serchFactoryusers);
                return this.arrayData;
              },

              serchFactoryusers() {
                  const factoryuser_array  = [];
                  for (let i in this.factoryusers) {
                    const factoryuserData = this.factoryusers[i];
                    const room_number = String(factoryuserData.number).slice(0, -2);
                    if (factoryuserData.factoryuser_name.indexOf(this.keyword) !== -1 &&
                        room_number.indexOf(this.floorKeyword) !== -1 &&
                        factoryuserData.care_level.indexOf(this.serchCareLevelKeyword) !== -1
                    )  {
                      factoryuser_array.push(factoryuserData);
                    }
                  };
                  const sort_factoryuser_data = factoryuser_array.slice()
                  .sort((a, b) => {
                    return a.number - b.number;
                   });

                return sort_factoryuser_data;
             },

              keywordSerchFactoryusers() {
               return this.serchFactoryusers.slice(0, 5);
             },

              //ページ数を取得する
             pages() {
              return Math.ceil(this.items.length / this.size);
            },
            // ページネーションで表示するページ番号の範囲を取得する
            displayPageRange() {
              this.half = Math.ceil(this.pageRange / 2);

              let start = 0;
              let end = 0;

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
                end = this.pages
                start = end - this.pageRange + 1;
              } else {
                //現在のページを真ん中に表示
                start = this.currentPage - this.half + 1;
                end = this.currentPage + this.half;
              }
              const indexes = [];
              for (let i = start; i <= end; i++) {
                indexes.push(i);
              }
              // console.log("indexes" + indexes);
              return indexes;
            }

     },
    methods: {
      getFactoryusers() {
        this.boolean_day_record_check = false;
        axios.get('/api/factoryusers').then((res) => {
          console.log(res.data);
          this.factoryusers = res.data;
         
        });
      },

      todayNotRegisteredRecord() {
            const array = [];
            this.boolean_day_record_check = true;
            axios.get('/api/factoryusers').then((res) => {
              for(let i = 0; i <res.data.length; i++) {
                if(res.data[i].day_record_check !== this.real_date.slice(0, 10)) {
                  array.push(res.data[i]);
                }
              }
              this.factoryusers = array;
            });
      },

           // 現在のページで表示するアイテムリストを取得する
            displayItems(array) {
              this.head = this.currentPage * this.size;
              this.items = array;
              this.arrayData = array.slice(this.head, this.head + this.size); //0 ~ 10までの配列を表示させる
            },

            //ページ先頭に移動する
            first() {
              this.currentPage = 0;
            },

            //ページ最後に移動する
            last() {
              this.currentPage = this.pages - 1;
            },

            //1ページ前に移動する

            prev() {
              if (0 < this.currentPage) {
                this.currentPage--;
              }
            },

            //1ページ次に移動する
            next() {
              if (this.currentPage < this.pages - 1) {
                this.currentPage++;
              }
            },

            //指定したページに移動する
            pageSelect(index) {
              this.currentPage = index - 1;
            },

    },

    created() {
      this.getFactoryusers();
      console.log(this.serchFactoryusers);
      console.log(this.auth_id)
      if(this.$route.path === '/factoryusers/id') {
        this.$router.push('/factoryusers/' + this.auth_id);
      }
    },
  }
</script>
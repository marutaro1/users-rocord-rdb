<template>
  <div class="mt-2" @mousemove.once="getManuel">
    <hr />
    <h4>マニュアル</h4>
    <div class="col-12">
      <label class="col-4 col-form-label">タイトル:</label>
      <div class="col-10 col-lg-3">
        <input type="data" class="form-control" v-model="title" />
      </div>
      <label class="col-6 col-form-label">新規マニュアル:</label>
      <div class="col-10 col-lg-5 mb-3">
        <textarea class="form-control" v-model="manuel"> </textarea>
      </div>
      <button @click="addManuel" class="btn btn-primary">登録</button>
    </div>

    <hr />

    <div class="mb-4">
      <label lass="col-2 col-form-label">タイトル更新:</label>
      <div class="col-10 col-lg-3">
        <input type="datal" class="form-control" v-model="update_title" />
      </div>
      <label lass="col-2 col-form-label">マニュアル更新:</label>
      <div class="col-10 col-lg-5">
        <textarea class="form-control" v-model="update_manuel"> </textarea>
      </div>
    </div>

    <hr />

    <h5>マニュアル一覧</h5>
    <div class="col-6 col-lg-3 mb-3">
      <label lass="col-2 col-form-label">キーワード検索:</label>
      <input
        type="text"
        class="form-control"
        v-model="keyword"
        list="manuel_data"
      />
       <datalist id="manuel_data">
            <option v-for="n in keywordSerchManuels" :key="n">
            {{ n.manuel_value }}
            </option>
        </datalist>
    </div>

    <div class="overflow-auto" style="height:300px;">
      <div v-for="manuel in manuelArray" :key="manuel.id">
        
        <p>タイトル: {{manuel.manuel_title}}</p>
        <p class="space"> {{manuel.manuel_value}}</p>
        <button
          @click="updateManuel(manuel)"
          class="btn btn-primary px-0 col-2 col-lg-1"
        >
          更新
        </button>
        <button
          @click="deleteManuel(manuel)"
          class="btn btn-primary px-0 col-2 col-lg-1 mx-2"
        >
          削除
        </button>
        <hr />
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
             id: String,
             login_user_id: String,
         },
         data() {
           return {
             keyword: '',
             staff_name: '',
             title: '',
             manuel: '',
             update_title: '',
             update_manuel: '',
             manuel_data: [],

            //<---- ページネーション処理 ---->
            currentPage: 0, // 現在のページ番号
            size: 10, // 1ページに表示するアイテムの上限
            pageRange: 6, // ページネーションに表示するページ数の上限
            items: [], // 表示するアイテムリスト
            head: '',
            arrayData: [],
            half: 0,
            dataArrays: []
           }
         },
         computed: {
            serchManuels() {
              const manuel_array  = [];
              for (let i in this.manuel_data) {
                const manuelData = this.manuel_data[i];
                if (manuelData.manuel_value.indexOf(this.keyword) !== -1)  {
                  manuel_array.push(manuelData);
                }
              };
              return manuel_array;
            },

              keywordSerchManuels() {
               return this.serchManuels.slice(0, 5)
             },

             manuelArray() {
              this.displayItems(this.serchManuels);
              return this.arrayData;
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
           addManuel() {
             const manuel_value = {
                factoryuser_id: this.id,
                staff_name: this.staff_name,
                manuel_title: this.title,
                manuel_value: this.manuel,
             }
             axios.post('/api/factoryusers/' + this.id + '/manuels', manuel_value).then((res) => {
               console.log(res);
               this.getManuel();
               this.title = '';
               this.manuel = '';
             })
           },
           getManuel() {
             axios.get('/api/factoryusers/' + this.id + '/manuels').then((res) => {
               this.manuel_data = res.data;
             })
           },
           updateManuel(manuel) {
             const manuel_value = {
                id: manuel.id,
                factoryuser_id: this.id,
                staff_name: this.staff_name,
                manuel_title: this.update_title,
                manuel_value: this.update_manuel,
             }
             axios.put('/api/factoryusers/manuels/' + String(manuel.id), manuel_value).then((res) => {
               console.log(res);
               this.getManuel();
               this.update_title = '';
               this.update_manuel = '';
             })

           },
           deleteManuel(manuel) {
             axios.delete('/api/factoryusers/manuels/' + manuel.id ).then((res) => {
               this.getManuel();
               console.log(res.data);
             })
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
           axios.get('/api/users/' + this.login_user_id).then((res) => {
               this.staff_name = res.data.name
               console.log(res.data);
               console.log(this.staff_name);
             })
         }
     }
 </script>
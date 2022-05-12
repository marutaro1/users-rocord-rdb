<template>
  <div
    class="mt-2"
    @mousemove.once="getTreatments"
  >
    <hr />
    <h4>処置</h4>
    <div>
      <div v-if="change_treatment_menu === false">
        <button @click="change_treatment_menu = true" class="btn btn-warning m-0 py-0 px-1">
          処置記録内容編集
        </button>
      </div>
      <div v-else-if="change_treatment_menu === true">
        <button @click="change_treatment_menu = false" class="btn btn-warning m-0 py-0 px-1">
          閉じる
        </button>
        <br>
        <label class="col-form-label col-5 mt-1">新規処置記録追加:</label>
        <div class="col-10 col-lg-6 mb-3">
          <textarea class="form-control" v-model="treatment"></textarea>
        </div>
        <button @click="postTreatments" class="btn btn-primary">
          追加
        </button>

      <hr />

    
        <label class="col-form-label col-5 pt-0">既存処置選択:</label>
        <div class="col-10 col-lg-6 mb-2">
          <select
            class="form-select form-select-sm"
            v-model="treatment_id"
          >
            <option value="">選択してください</option>
            <option v-for="treatment in treatments_data" :key="treatment.id" :value="treatment.id">
              {{treatment.treatment_value}}
            </option>
          </select>
        </div>

        <label class="col-form-label col-5">選択内容更新:</label>
        <div class="col-10 col-lg-6 mb-2">
          <input
            @focus="updateTreatmentValuePush"
            type="text"
            class="form-control"
            v-model="update_treatment"
          />
        </div>

        <button
          @click="updateTreatment"
          class="btn btn-primary"
        >
          更新
        </button>
        <button
          @click="deleteTreatment"
          class="btn btn-primary mx-2"
        >
          選択した処置記録を削除
        </button>
      </div>
    </div>
    
    <hr />

    <div>
      <label class="col-4 col-form-label">処置記録登録: </label>
      <div class="col-8 col-lg-3 mb-3">
        <input type="datetime-local" class="form-control" v-model="day" />
      </div>
      <div class="col-10 col-lg-3 mb-3">
        <select class="form-select form-select-sm" v-model="select_treatment_id">
          <option value="">選択してください</option>
          <option
          v-for="treatment in treatments_data" :key="treatment.id" :value="treatment.id"
          >
            {{treatment.treatment_value}}
          </option>
        </select>
      </div>
      <button @click="postTreatmentRecords" class="btn btn-primary">登録</button>
    </div>

    <hr />

    <label class="col-6 col-form-label">キーワード検索: </label>
    <div class="col-6 col-lg-3 mb-3">
      <input
        type="text"
        class="form-control"
        v-model="keyword"
        list="treatment_record_data"
      />
      <datalist id="treatment_record_data">
            <option v-for="n in keywordSerchTreatmentRecords" :key="n">
            {{ n.treatment_value }}
            </option>
        </datalist>
    </div>

    <div>
      <h5>処置記録</h5>
    </div>

    <div class="overflow-auto" style="height:300px;">
      <div v-for="treatment_record in treatmentRecordArray" :key="treatment_record.id">
        <p>日付: {{treatment_record.day.slice(0, -3)}}</p>
        <p>内容: {{treatment_record.treatment_value}}</p>
        <p>登録者: {{treatment_record.staff_name}}</p>
        <div v-if="edit_treatment_record === treatment_record.id ">
          <hr class="my-1">
          <button @click="edit_treatment_record = '' " class="btn btn-warning m-0 py-0 px-1">閉じる</button>
          <label class="col-6 col-form-label mx-1">処置記録更新:</label>
           <div class="col-8 col-lg-3 mb-2" style="height: 10px;">
        　  <input type="datetime-local" class="form-control" v-model="update_treatment_record_day" />
           </div>
           <br>
           <div class="col-8 col-lg-3" style="height: 40px;">
        　  <input type="text" class="form-control" v-model="update_treatment_record_value" />
           </div>
           <br>
          <button @click="updateTreatmentRecord(treatment_record)" class="btn btn-primary my-2">更新</button>
          <button
            @click="deleteTreatmentRecord(treatment_record.id)"
            class="btn btn-primary m-2 "
          >
            処置記録削除
          </button>
        </div>
        <div v-else="edit_treatment_record === ''">
          <button @click="editTreatmentRecordSelect(treatment_record)" class="btn btn-warning">内容編集</button>
        </div>
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
             change_treatment_menu: false,

             //treatment一覧に登録するためのデータ
             treatment: '',
             treatments_data: [],
             treatment_id: '',
             update_treatment: '',

             //日々のtreatmentを登録するためのデータ
             day: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("00" + new Date().getDate() ).slice(-2) +
                        "T" +
                        ("00" + new Date().getHours()).slice(-2) +
                        ":" +
                        "00",
            select_treatment_id: '',
            staff_name: '',
            treatment_records_data: [],
            update_treatment_record_value: '',
            update_treatment_record_day: '',
            edit_treatment_record: '',
            keyword: '',

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
           serchTreatmentRecords() {
             const treatment_record_data  = [];
                for (let i in this.treatment_records_data) {
                  const treatment_record = this.treatment_records_data[i];
                  if (treatment_record.treatment_value.indexOf(this.keyword) !== -1)  {
                    treatment_record_data.push(treatment_record);
                  }
              };

              const sort_treatment_record_data = treatment_record_data.slice()
                  .sort((a, b) => {
                    return Number(new Date(a.day)) - Number(new Date(b.day));
                   })
              .reverse();
              
              return sort_treatment_record_data;
           },

            keywordSerchTreatmentRecords() {
               return this.serchTreatmentRecords.slice(0, 5)
            },

           treatmentRecordArray() {
              this.displayItems(this.serchTreatmentRecords);
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
            },
         },
         methods: {
           postTreatments() {
             const treatment_value = {
               treatment_value: this.treatment,
             }
             axios.post('/api/treatments', treatment_value).then(() => {
               this.getTreatments();
               this.treatment = '';
             })
           },
           getTreatments() {
             axios.get('/api/treatments').then((res) => {
              this.treatments_data = res.data;
             }).then(() => {
              this.getTreatmentRecords();
             })
           },
           updateTreatmentValuePush() {
             if(this.treatment_id !== '') {
              axios.get('/api/treatments/' + this.treatment_id).then((res) => {
                console.log(res);
                  this.update_treatment = res.data.treatment_value;
              })
            }
           },
           updateTreatment() {
            const treatment_value = { 
              treatment_value: this.update_treatment,
            }
            axios.put('/api/treatments/' + this.treatment_id, treatment_value).then(() => {
              this.getTreatments();
              this.update_treatment = '';
            })
           },
           deleteTreatment() {
             axios.delete('/api/treatments/' + this.treatment_id).then(() => {
               this.getTreatments();
             })
           },

           postTreatmentRecords() {
             let treatment_record = '';
             axios.get('/api/treatments/' + this.select_treatment_id).then((responce) => {
               treatment_record = responce.data.treatment_value;
             }).then(() => {
              
               const treatment_record_value = {
                 factoryuser_id: this.id,
                 day: this.day,
                 treatment_id: this.select_treatment_id,
                 treatment_value: treatment_record,
                 staff_name: this.staff_name,
               }

               axios.post('/api/factoryusers/' + this.id + '/treatments', treatment_record_value).then(() => {
                 this.getTreatmentRecords();
                 this.day = new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("00" + new Date().getDate() ).slice(-2) +
                        "T" +
                        ("00" + new Date().getHours()).slice(-2) +
                        ":" +
                        "00";
                 this.select_treatment_id = '';
               })

            })
           },
           getTreatmentRecords() {
             axios.get('/api/factoryusers/' + this.id + '/treatments').then((res) => {
               this.treatment_records_data = res.data;
             })
           },
           editTreatmentRecordSelect(treatment_record) {
             if(treatment_record !== '') {
               this.edit_treatment_record = treatment_record.id;
               this.update_treatment_record_day = treatment_record.day.slice(0, -3);
               this.update_treatment_record_value = treatment_record.treatment_value;
               console.log(treatment_record.day.slice(0,-3));
             } else if(treatment_record === '') {
               this.edit_treatment_record = '';
             }
           },

           updateTreatmentRecord(treatment_record) {
              const treatment_record_value = {
                 factoryuser_id: this.id,
                 day: this.update_treatment_record_day,
                 treatment_id: treatment_record.treatment_id,
                 treatment_value: this.update_treatment_record_value,
                 staff_name: this.staff_name,
              }
              axios.put('/api/factoryusers/treatments/' + treatment_record.id, treatment_record_value).then((res) => {
                console.log(res.data);
                this.getTreatmentRecords();
                this.update_treatment_record_value = '';
              })
           },
           deleteTreatmentRecord(treatment_record_id) {
             axios.delete('/api/factoryusers/treatments/' + treatment_record_id).then(() => {
               this.getTreatmentRecords();
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
              this.staff_name = res.data.name;
            })

           
         },

    

     }
 </script>
<template>
  <div @mousemove.once="getMedicalHIstory" class="mt-2">
    <hr />
    <h4>既往歴</h4>

    <div>
      <label class="col-form-label col-5">発症日:</label>
      <div class="col-6 col-lg-3 mb-2">
        <input type="date" class="form-control" v-model="day" />
      </div>

      <label class="col-form-label col-5">診療科:</label>
      <div class="col-6 col-lg-3 mb-2">
        <select class="form-select form-select-sm" v-model="medical">
          <option value="">選択してください</option>
          <option value="内科">内科</option>
          <option value="外科">外科</option>
          <option value="眼科">眼科</option>
        </select>
      </div>
      
      <div class="col-10 col-lg-6 mb-3">
        <input  class="form-control" v-model="medical_history_value" />
      </div>
      <button @click="addMedicalHistory" class="btn btn-primary">
        登録
      </button>
    </div>
    <hr />
    <div>
      <label class="col-form-label col-5">既往歴更新:</label>
      <div class="col-6 col-lg-3 mb-2">
        <input type="date" class="form-control" v-model="update_day" />
      </div>

       <label class="col-form-label col-5">診療科:</label>
        <div class="col-6 col-lg-3 mb-2">
          <select class="form-select form-select-sm" v-model="update_medical">
            <option value="">選択してください</option>
            <option value="内科">内科</option>
            <option value="外科">外科</option>
            <option value="眼科">眼科</option>
          </select>
        </div>

      <div class="col-10 col-lg-6 mb-2">
        <input class="form-control" v-model="update_medical_history_value" />
      </div>
    </div>

    <hr />

    <div>
      <h5>既往歴</h5>
    </div>

    <div>

      <label class="col-5 col-form-label">診療科検索:</label>
      <div class="col-3 col-lg-3">
        <select class="form-select form-select-sm pb-0" v-model="medical_keyword">
          <option value=""></option>
          <option value="内科">内科</option>
          <option value="外科">外科</option>
          <option value="眼科">眼科</option>
        </select>
      </div>

      <label class="col-5 col-form-label pt-0">病名検索:</label>
      <div class="col-6 col-lg-3 mb-2">
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          list="medical_history_data"
        />
        <datalist id="medical_history_data">
            <option v-for="n in keywordSerchMedicalHistories" :key="n">
            {{ n.medical_history_value }}
            </option>
        </datalist>
      </div>
    </div>

    <div class="overflow-auto" style="height:300px;">
      <div v-for="history in medicalHistorySerchArray" :key="history.id">
        <p>日付: {{history.day.slice(0, 10)}}</p>
        <p>診療科: {{history.medical}}</p>
        <p>{{history.medical_history_value}}</p>
        <button
          @click.once="updateMedicalHistory(history)"
          class="btn btn-primary px-0 col-2 col-lg-1"
        >
          更新
        </button>
        <button
          @click="deleteMedicalHistory(history)"
          class="btn btn-primary px-0 mx-2 col-2 col-lg-1"
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
             login_user_id: String,
             id: Number
         },
         data() {
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
            medicalHistorySerchArray() {
                this.displayItems(this.serchMedicalHistories);
                return this.arrayData;
            },
            serchMedicalHistories() {
              const medical_history_array  = [];
              for (let i in this.medical_history_data) {
                const medicalHistoryData = this.medical_history_data[i];
                if (medicalHistoryData.medical_history_value.indexOf(this.keyword) !== -1 
                && medicalHistoryData.medical.indexOf(this.medical_keyword) !== -1
                )  {
                  medical_history_array.push(medicalHistoryData);
                }
              };

                  const sort_medical_history_data = medical_history_array.slice()
                  .sort((a, b) => {
                    return Number(new Date(a.day)) - Number(new Date(b.day));
                   })
                  .reverse();

              return sort_medical_history_data;
            },

            keywordSerchMedicalHistories() {
               return this.serchMedicalHistories.slice(0, 5);
            },

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
           addMedicalHistory() {
             const post_medical_history = {
                factoryuser_id: this.id,
                staff_name: this.staff_name,
                day: this.day,
                medical: this.medical,
                medical_history_value: this.medical_history_value,
            }
             axios.post('/api/factoryusers/' + this.id + '/medical_histories', post_medical_history).then((res) => {
               console.log(res.data);
               this.getMedicalHIstory();
               this.day = '';
               this.medical = '';
               this.medical_history_value = '';
             })
           },

           updateMedicalHistory(history) {
             const post_medical_history = {
                factoryuser_id: this.id,
                staff_name: this.staff_name,
                day: this.update_day,
                medical: this.update_medical,
                medical_history_value: this.update_medical_history_value,
            }
             axios.put('/api/factoryusers/medical_histories/' + history.id, post_medical_history).then((res) => {
               console.log(res.data);
               this.getMedicalHIstory();
               this.update_day = '';
               this.update_medical = '';
               this.update_medical_history_value = '';
             })
           },

           getMedicalHIstory() {
             axios.get('/api/factoryusers/' + this.id + '/medical_histories').then((res) => {
               this.medical_history_data = res.data;
             })
           },

           deleteMedicalHistory(history) {
             axios.delete('/api/factoryusers/medical_histories/' + history.id).then(() => {
               this.getMedicalHIstory();
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
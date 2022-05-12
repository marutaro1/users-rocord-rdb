<template>
  <div class="mt-2" @mousemove.once="getRecord">
    <hr />
    <h4>記録</h4>
    <div>
      <label class="col-4 col-form-label mb-1">新規記録入力:</label>
      <div class="col-8 col-lg-3 mb-3">
        <input type="datetime-local" class="form-control" v-model="day" />
      </div>
      <div class="col-10 col-lg-6 mb-3">
        <textarea class="form-control" v-model="record_value"> </textarea>
      </div>
      <button @click="submit" class="btn btn-primary mx-1">登録</button>
 
    </div>

    <hr />

    <div>
      <label class="col-4 col-form-label">記録更新:</label>
      <div class="col-8 col-lg-3 mb-3">
        <input type="datetime-local" class="form-control" v-model="update_day" />
      </div>
      <div class="col-10 col-lg-6">
        <textarea class="form-control" v-model="update_record_value"></textarea>
      </div>
      <br />
    </div>

    <hr />

    <div>
      <label lass="col-2 col-form-label">各月の記録抽出:</label>
      <div class="col-6 my-2">
        <input type="month" class="form-control" v-model="select_month" />
      </div>
      <button
       @click="getMonthData(select_month)"
        class="btn btn-primary px-1"
      >
       表示
      </button>
    </div>

    <hr />

    <div>
      <label class="col-5 col-form-label">日付指定記録抽出:</label>

      <div class="col-6 mb-2">
        <input type="date" class="form-control" v-model="dayKeywordFirst" />
        <p class="m-0 p-0">から</p>
        <input type="date" class="form-control" v-model="dayKeywordSecond" />
      </div>
      <button @click="trackDays(dayKeywordFirst, dayKeywordSecond)" class="btn btn-primary px-1">
       表示
      </button>
      <button @click="clearData" class="btn btn-primary px-1 mx-2">クリア</button>
    </div>

    <hr />
    
    <div>
      <div v-if="!select_month && !dayKeywordFirst && !dayKeywordSecond">
        <h5>{{ no_select_view_day }}の記録</h5>
      </div>
      <div v-else-if="select_month">
        <h5>{{select_month}}の記録</h5>
      </div>
      <div v-else-if="dayKeywordFirst && dayKeywordSecond && !select_month">
        <h5>{{dayKeywordFirst}}から{{dayKeywordSecond}}までの記録</h5>
      </div>

      <label class="col-6 col-form-label mb-1">キーワード検索:</label>
      <div class="col-6 mb-3">
        <input
          type="text"
          class="form-control"
          v-model="keyword"
          list="record_data"
        />
         <datalist id="record_data">
            <option v-for="n in keywordSerchRecords" :key="n">
            {{ n.record_value }}
            </option>
        </datalist>
      </div>

      <div class="overflow-auto" style="height:300px;">
        <div v-for="(record,key) in recordArray" :key="key">

          <p>日付: {{record.day}}</p>
          <p class="space">{{record.record_value}}</p>
          <p>登録者: {{record.staff_name}}</p>
          <button
            class="col-2 col-lg-1 btn btn-primary px-0"
            @click="updateRecord(record.id)"
          >
            更新
          </button>
          <button
            class="col-2 col-lg-1 btn btn-primary px-0 mx-2"
            @click="destoryRecord(record)"
          >
            削除
          </button>
          <button
            class="col-5 col-lg-2 btn btn-primary px-0"
            @click="postArchives(record)"
          >
            記録まとめへ追加
          </button>
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
             id: String,
             login_user_id: String,
         },
         data() {
           return {
             real_date: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("00" + new Date().getDate() ).slice(-2) +
                        "T" +
                        ("00" + new Date().getHours()).slice(-2) +
                        ":" +
                        "00", //入力した日付を格納する値
            
             day: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) +
                        "-" +
                        ("00" + new Date().getDate() ).slice(-2) +
                        "T" +
                        ("00" + new Date().getHours()).slice(-2) +
                        ":" +
                        "00",
             record_value: '',
             staff_name: 'staff',
             factoryuser_record_data: {},
             select_day_list: [],
             update_day: '',
             update_record_value: '',
             keyword: '',
             dayKeywordFirst: '',
             dayKeywordSecond: '',
             start_day: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) + "-01",
             end_day: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) + "-31",
             select_month: '',
             no_select_view_day: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2),
             login_user: [],

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
              serchRecords() {
                const record_data  = [];
                for (let i in this.factoryuser_record_data) {
                  const recordData = this.factoryuser_record_data[i];
                  if (recordData.record_value.indexOf(this.keyword) !== -1)  {
                    record_data.push(recordData);
                  }
                };

               const day_select_record_data = record_data.filter(rec => {
                    this.getSelectDay(this.start_day, this.end_day);
                    let custom_includes = (arr, target) => arr.some(el => target.includes(el));
                    //独自関数
                    return custom_includes(this.select_day_list, rec.day);
                  });

                  const sort_record_data = day_select_record_data.slice()
                  .sort((a, b) => {
                    return Number(new Date(a.day)) - Number(new Date(b.day));
                   })
                  .reverse();

                return sort_record_data;
             },

             keywordSerchRecords() {
               return this.serchRecords.slice(0, 5)
             },

            recordArray() {
              this.displayItems(this.serchRecords);
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
           getLoginUser() {
                axios.get('/api/users/' + this.login_user_id).then((res) => {
                        this.login_user = res.data;
                        return this.login_user;
                })
            },

           submit() {
             const record_data = {
               day: this.day,
               day_record_check: true,
               record_value: this.record_value,
               staff_name: this.login_user.name,
               factoryuser_id: this.id,
             }
             axios.post('/api/factoryusers/' + this.id + '/records', record_data).then((res) => {

                axios.get('/api/factoryusers/' + this.id).then((responce) => {
                  console.log(responce)
                  if( new Date( responce.data[0].day_record_check + 'T00:00' ).getTime() <= new Date ( this.day ).getTime() || responce.data[0].day_record_check === '・') {
                    const factoryuser = {
                      factoryuser_name: this.factoryuser_name,
                      birthday: this.birthday,
                      care_level: this.care_level,
                      number: this.number,
                      day_record_check: this.day.slice(0,10),
                    }
                    axios.put('/api/factoryusers/' + this.id, factoryuser).then((res) => {
                      console.log(res);
                      this.getRecord();
                      this.record_value = '';
                      this.day = this.real_date;
                    })
                  } else if(new Date ( this.day ).getTime() < new Date( responce.data[0].day_record_check + 'T00:00' ).getTime() ) {
                      this.getRecord();
                      this.record_value = '';
                      this.day = this.real_date;
                  }
                })

             })
           },

           updateRecord(record_id) {
             const record = {
               id: record_id,
               day: this.update_day,
               day_record_check: true,
               record_value: this.update_record_value,
               staff_name: this.login_user.name,
               factoryuser_id: String(this.id)
             }
             axios.put('/api/factoryusers/factoryuser/records/' + record_id, record).then((res) => {

                  axios.get('/api/factoryusers/' + this.id).then((responce) => {
                  console.log(responce)
                  if( new Date( responce.data[0].day_record_check + 'T00:00' ).getTime() <= new Date ( this.update_day ).getTime() ) {
                    const factoryuser = {
                      factoryuser_name: this.factoryuser_name,
                      birthday: this.birthday,
                      care_level: this.care_level,
                      number: this.number,
                      day_record_check: this.update_day.slice(0,10),
                    }
                    axios.put('/api/factoryusers/' + this.id, factoryuser).then((res) => {

                     console.log(res);
                     this.getRecord();
                     this.update_record_value = '';
                     this.update_day = '';
                     
                    })
                  }
                })
             })
           },

           getRecord() {
             axios.get('/api/factoryusers/' + this.id + '/records').then((res) => {
               this.factoryuser_record_data = res.data;
             });
           },

           getSelectDay(start, end) {
            let dayData = []
                //startDayからendDayまでの日付を入れる配列
                const startDate = new Date(start)
                const endDate = new Date(end)
                while (startDate < endDate) {
                    dayData = [...dayData, 
                        startDate.getFullYear()  +  '-' +("00" + (startDate.getMonth() + 1)).slice(-2)+ '-' + ("00" + (startDate.getDate())).slice(-2)]
                        startDate.setDate(startDate.getDate() + 1)
                        //startDayをdayData配列の中に入れ、+1日してwhileでendDayまでのループを回す
                        
                    }    
                    dayData = [...dayData, endDate.getFullYear() + '-' +("00" + (endDate.getMonth() + 1)).slice(-2)+ '-' + ("00" + (endDate.getDate())).slice(-2)]
                    this.select_day_list = dayData;       
                    //dayData配列内にstartDayからendDayまでのデータが格納され、それを空の配列内に入れ直す
           },

           destoryRecord(record_data) {
             const recordData = record_data;
             axios.delete('/api/factoryusers/factoryuser/records/' + record_data.id).then(() => {
                this.getRecord();

                axios.get('/api/factoryusers/' + this.id).then((responce) => {
                  console.log(recordData.day);

                  if( responce.data[0].day_record_check === recordData.day.slice(0,10) ) {
                  console.log(this.serchRecords[0].day.slice(0,10));
                    
                      const day_record_check_value = this.serchRecords[0].day.slice(0,10);
               
                      const factoryuser = {
                        factoryuser_name: this.factoryuser_name,
                        birthday: this.birthday,
                        care_level: this.care_level,
                        number: this.number,
                        day_record_check: day_record_check_value,
                      }
                      axios.put('/api/factoryusers/' + this.id, factoryuser).then((res) => {
                        console.log(res.data);
                      })
                  }

                })
             })
           },

           trackDays(start, end) {
             this.start_day = start;
             this.end_day = end;

           },
           getMonthData(day) {
             this.start_day = day + '-01'
             this.end_day = day + '-31'
             console.log(this.start_day + '/' + this.end_day)
           },

           postArchives(record) {
             let user_name = '';
             let user_number = '';
             axios.get('/api/factoryusers/' + this.id).then((responce) => {
               console.log(responce.data[0])
               user_name = responce.data[0].factoryuser_name;
               user_number = responce.data[0].number;
             }).then(() => {

             const post_archive_value = {
               factoryuser_id: this.id,
               factoryuser_name: user_name,
               factoryuser_number: user_number,
               staff_id: this.login_user_id,
               staff_name: this.login_user.name,
               day: this.real_date,
               archive_record: record.record_value,
               archive_memo: '・',
             }

             axios.get('/api/archives').then((res) => { 
               for(let i = 0; i < res.data.length; i++) {
                 if(res.data[i].day.slice(0, 10) === this.real_date.slice(0, 10) && String(res.data[i].factoryuser_id) === this.id) {
                    axios.delete('/api/archives/' + String(res.data[i].id));
                 }
              };
             }).then(() => {
              axios.post('/api/archives', post_archive_value)
             })

             })
           },

            sortArray(array) {
              //日付順に並び替える
              this.dataArrays = array
                .slice()
                .sort((a, b) => {
                  return Number(new Date(a.day)) - Number(new Date(b.day));
                })
                .reverse();
            },

            clearData() {
              this.dayKeywordFirst = '';
              this.dayKeywordSecond = '';
              this.start_day = new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) + "-01";
             this.end_day = new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) + "-31";
              this.getSelectDay(this.start_day, this.end_day);
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
         mounted() {
           this.getLoginUser();
         }
     }
 </script>
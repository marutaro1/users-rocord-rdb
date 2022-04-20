<template>
  <div class="mt-2 mx-3">
    <h3>記録まとめ</h3>
    <div>
      <label class="col-4 col-form-label">本日の日付:</label>
      <div class="col-6 col-lg-3 mb-2">
        <input type="date" class="form-control" v-model="serch_archive_today" />
      </div>
      <button @click="getArchives(serch_archive_today)" class="btn btn-primary">
        記録呼び出し
      </button>
    </div>
    <div>
      <label class="col-6 col-form-label">過去の記録呼び出し:</label>
      <div class="col-6 col-lg-3 mb-2">
        <input type="date" class="form-control" v-model="serch_archive_select_day" />
      </div>
      <div>
        <button @click="getArchives(serch_archive_select_day)" class="btn btn-primary">
         {{serch_archive_select_day}}:記録呼び出し
        </button>
      </div>
    </div>

    <hr />

    <div>
      <label class="col-4 col-form-label">記録更新:</label>
      <div class="col-10 col-lg-7">
        <textarea class="form-control" v-model="update_archive_record_value"></textarea>
      </div>
    </div>
    <hr />
    <h4>記録</h4>
    <div v-if="copy_button_boolean === true" class="text-center">
      <button @click="copyArchives" class="btn btn-warning mt-1 mb-3">
        {{serch_archive_select_day}}:記録コピー
      </button>
    </div>

    <div class="overflow-auto" style="height:600px;">
      <div v-for="archive in sortArchives" :key="archive.id">
        <p>
          部屋番号:
         <router-link :to="'/factoryusers/' + archive.staff_id + '/' + archive.factoryuser_id + '/records'">{{archive.factoryuser_number.slice(0,-1)}}</router-link>
        </p>
        <p class="mb-0">名前: {{archive.factoryuser_name}}</p>

        <button
          @click="copyArchiveRecord(archive)"
          class="btn btn-warning rounded-circle p-0 px-1 mb-1"
        >
          ✔︎
        </button>
        <p class="space">記録: {{archive.archive_record}}</p>

        <button
          @click="updateArchiveRecord(archive)"
          class="btn btn-primary"
        >
          更新
        </button>
        <button
          @click="deleteArchive(archive)"
          class="btn btn-primary mx-2"
        >
          削除
        </button>

        <div class="mt-2">
          <label class="col-4 col-form-label">メモ:</label>
          <div class="col-7 col-lg-4">
            <textarea
              class="form-control"
              v-model="archive.archive_memo"
            ></textarea>
          </div>

          <div class="mt-2">
            <button
              @click="postArchiveMemo(archive)"
              class="btn btn-primary"
            >
              メモ登録
            </button>
          </div>
          <div

            class="mt-1"
          >
            <div v-for="memo in archive_memos" :key="memo.id">
            <div v-if="archive.factoryuser_id === memo.factoryuser_id">
              <p>{{memo.memo_record}}
                <button
                @click="deleteArchiveMemo(memo)"
                class="btn btn-primary m-0 p-0"
              >
                ✖︎
              </button>
              </p>
            </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      login_user_id: String,
    },
    data() {
      return {
        archives: [],
        serch_archive_today: new Date().getFullYear() +
                        "-" +
                        ("00" + (new Date().getMonth() + 1)).slice(-2) + 
                         "-" +
                        ("00" + (new Date().getDate())).slice(-2),
        serch_archive_select_day: '',
        update_archive_record_value: '',
        archive_memos: [],
        copy_button_boolean: false,
      }
    },
    computed: {
      sortArchives() {
        const sort_archives_data = this.archives.slice()
                  .sort((a, b) => {
                    return Number(a.factoryuser_number) - Number(b.factoryuser_number);
                   });
        return sort_archives_data;
      }
    },
    methods: {
      getArchives(day) {
        if(day === this.serch_archive_today) {
          this.copy_button_boolean = false;
        } else if(day === this.serch_archive_select_day) {
          this.copy_button_boolean = true;
        }
        this.archives = [];
        axios.get('/api/archives').then((res) => {
          for(let i = 0; i < res.data.length; i++) {
            if(res.data[i].day.slice(0, 10) === day.slice(0, 10)) {
                this.archives.push(res.data[i]);
                if(day === this.serch_archive_select_day) {
                        if(res.data[i].day.slice(0, 10) === this.serch_archive_today) {
                          this.getArchiveMemo(res.data[i]);
                          console.log('コピーの日付')
                        }
                } else  {
                  this.getArchiveMemo(res.data[i]);
                  console.log('今日の日付')
                }
            } 
           } 
          });
      },
      copyArchives() {
        const today_archives = [];
        axios.get('/api/archives').then((responce) => {
          for(let n = 0; n < responce.data.length; n++) {
            if(responce.data[n].day.slice(0,10) === this.serch_archive_today) {
              today_archives.push(responce.data[n]);
              console.log(today_archives)
            }
          }
        }).then(() => {
          for(let count = 0; count < today_archives.length; count++) {
            axios.delete('/api/archives/' + today_archives[count].id);
          }
          for(let i = 0; i < this.archives.length; i++) {
            const copy_archive_data = {
              id: this.archives[i].id,
              factoryuser_id: this.archives[i].factoryuser_id,
              factoryuser_name: this.archives[i].factoryuser_name,
              staff_id: this.archives[i].staff_id,
              staff_name: this.archives[i].staff_name,
              day: this.serch_archive_today,
              archive_record: this.archives[i].archive_record,
              archive_memo: this.archives[i].archive_memo
            }

            axios.post('/api/archives', copy_archive_data).then((res) => {
              console.log(res.data);
            })
          }
        });
      },
      updateArchiveRecord(archive) {
        archive.archive_record = this.update_archive_record_value;
        axios.put('/api/archives/' + archive.id,  archive).then((res) => {
          this.update_archive_record_value = '';
        });
      },
      copyArchiveRecord(archive) {
        this.update_archive_record_value = archive.archive_record;
      },
      deleteArchive(archive) {
        axios.delete('/api/archives/' + String(archive.id)).then((res) => {
          console.log(res);
        })
      },
      postArchiveMemo(archive) {
        const archive_memo_value = {
          factoryuser_id: archive.factoryuser_id,
          staff_id: this.login_user_id,
          staff_name: 'staff',
          day: this.serch_archive_today.slice(0, 10),
          memo_record: archive.archive_memo,
        }
        axios.post('/api/memos', archive_memo_value).then(() => {
            axios.get('/api/archives').then((res) => {
              for(let i = 0; i < res.data.length; i++) {
                  if(res.data[i].day.slice(0, 10) === this.serch_archive_today) {
                   this.getArchiveMemo(res.data[i]);
                  }
                }
            });

        });
      
      },
      getArchiveMemo(archive) {
        this.archive_memos = [];
          axios.get('/api/memos').then((res) => {
            for(let i = 0; i < res.data.length; i++) {
              if(res.data[i].staff_id === Number(this.login_user_id) && res.data[i].day.slice(0,10) === archive.day.slice(0,10) && res.data[i].factoryuser_id === archive.factoryuser_id) {
                  this.archive_memos.push(res.data[i]);
            }
          }
        })
      },
      deleteArchiveMemo(memo) {
        axios.delete('/api/memos/' + memo.id)
          axios.get('/api/archives').then((res) => {
              for(let i = 0; i < res.data.length; i++) {
                  if(res.data[i].day.slice(0, 10) === this.serch_archive_today) {
                   this.getArchiveMemo(res.data[i]);
                  }
                }
              });
    
      }
    }
  }
</script>
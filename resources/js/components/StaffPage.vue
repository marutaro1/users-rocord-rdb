<template>
  <div @mousemove.once="getSelectStaffDailyWorks">
    <h3>業務編集</h3>
    <router-link :to="'/staffdaywork/' + login_user_id +'/works'" class="btn btn-primary p-1"
      >戻る</router-link
    >
    <div>
      <div>
        <p>職員名: {{select_staff_daily_works.staff_name}}</p>
        <p>PHS番号: {{ String(select_staff_daily_works.phs).slice(0,3) }}</p>
        <div v-for="(select_staff_daily_work, key) in select_staff_daily_work_array" :key="key">
          <p>
            {{select_staff_daily_work}}:
            <template v-if="change_work_check[key] === '' || change_work_check[key] === 'false'">
              未遂
            </template>
            <template v-else="change_work_check[key] === 'true'">
            完了
            </template>
            <button
              @click="clickChangeWorkCheck(key)"
              class="btn btn-primary p-1"
            >
              <div v-if="change_work_check[key] === '' || change_work_check[key] === 'false'">完了</div>
              <div v-else="change_work_check[key] === 'true'">未遂</div>
            </button>
          </p>
        </div>
      </div>
      
      <div>
        <label class="col-2 col-form-label">メモ:</label>
        <div class="col-lg-5 col-8">
          <textarea class="form-control" v-model="staff_memo"></textarea>
        </div>
      </div>
      <button
        @click="postCompleteWorkCheck(select_staff_daily_works.staff_name)"
        class="my-2 btn btn-primary"
      >
        登録
      </button>
    </div>
  </div>
</template>
<script>
     export default {
         props: {
             login_user_id: String,
             select_staff_id: String,
             today: String,
         },
         data() {
           return {
             select_staff_daily_works: [],
             select_staff_daily_work_array: [],
             change_work_check: [],
             work_check: [],
             staff_memo: '',
             staff_name: '・',
             complete_work_id: '',
           }
         },
         methods: {
           clickChangeWorkCheck(key){
             if(this.change_work_check[key] === 'false' || this.change_work_check[key] === '') {
               this.change_work_check[key] = 'true';
             
             } else if(this.change_work_check[key] === 'true') {
               this.change_work_check[key] = 'false';
             }
           },
            getSelectStaffDailyWorks() {
              axios.get('/api/staff_daily_work').then((res) => {
                for(let i = 0; i < res.data.length; i++) {
                  if(String(res.data[i].id) === this.select_staff_id && res.data[i].day === this.today) {
                    this.select_staff_daily_works = res.data[i];
                    const array_data =  res.data[i].works.split(',');
                    this.select_staff_daily_work_array =  Object.assign({}, array_data);
                      for(let n = 0; n < array_data.length; n++) {
                        this.change_work_check.push('');
                      }
                  }
                }
              }).then(() => {
                this.getCompleteWorkCheck();
              })
            },
            postCompleteWorkCheck(name) {
              axios.get('/api/users').then((res) => {
                for(let i = 0; i < res.data.length; i++) {
                 if(String(res.data[i].name) === name) {
                  this.staff_name = name;
                 }  
                }
              }).then(() => {
                console.log(this.staff_name);
                if(this.staff_memo === '' || this.staff_memo === '・') {
                  this.staff_memo = '・';
                }
                const add_work_check = {
                  staff_id: this.select_staff_id,
                  staff_name: this.staff_name,
                  day: this.today,
                  work_check: String(this.change_work_check),
                  staff_memo: this.staff_memo,
                }
                const array_length = []
                for(let n = 0; n < this.change_work_check.length; n++) {
                  array_length.push('');
                }
                console.log(array_length)
             
                  axios.put("/api/complete_works/" + this.complete_work_id, add_work_check).then((res) => {
                    this.staff_memo = res.data.staff_memo;
                  });
                
              })
            },
            getCompleteWorkCheck() {
                axios.get('/api/complete_works').then((res) => {                 
                          console.log(res);
                          console.log(res.data);
                          console.log(res.data.length);

                      for(let i = 0; i < res.data.length; i++) {
                        console.log(res.data[i]);
                        if(res.data[i] !== {} && res.data[i].day === this.today && String(res.data[i].staff_id) === this.select_staff_id) {
                          this.change_work_check = res.data[i].work_check.split(',');
                          this.staff_memo = res.data[i].staff_memo;
                          this.complete_work_id = res.data[i].id;
                          console.log(this.complete_work_id);
                         
                        }
                      }
                });
            }
         },
     }
 </script>
<template>
  <div class="mt-2 mx-3">
    <h2>業務</h2>
    <div>
      <label class="col-6 col-form-label">日付:</label>
      <div class="col-6 col-lg-3">
        <input type="date" v-model="today" class="form-control" />
      </div>
      <label class="col-6 col-form-label">部署:</label>
      <div class="col-6 col-lg-2 mb-2">
        <select class="form-select form-select-sm" v-model="user_department">
          <option value=null>選択してください</option>
          <option value="caregiver">介護</option>
          <option value="nurse">看護</option>
          <option value="rehabilitation">リハビリ</option>
          <option value="studentSupport">施設管理</option>
        </select>
      </div>
    </div>
    <div v-if="!open_staff_method">
      <button @click="getStaffName" class="mt-2 btn btn-warning">
        業務登録
      </button>
    </div>
  
    <div v-if="open_staff_method && login_user.user_department === user_department && login_user.user_offitial_position !== '' || open_staff_method && user_department === 'studentSupport' ">
      <button class="btn btn-warning py-0" @click="closeStaffData">×</button>
    </div>
    <div v-if="open_staff_method && login_user.user_department === user_department && login_user.user_offitial_position !== '' || open_staff_method && user_department === 'studentSupport' ">
      <div>
        <label class="col-4 col-form-label">新規業務登録</label>
        <div class="col-6 col-lg-3">
          <select
            class="form-select form-select-sm mb-2"
            v-model="week"
          >
            <option value="">選択してください</option>
            <option value="Sunday">日曜日</option>
            <option value="Monday">月曜日</option>
            <option value="Tuesday">火曜日</option>
            <option value="Wednesday">水曜日</option>
            <option value="Thursday">木曜日</option>
            <option value="Friday">金曜日</option>
            <option value="saturday">土曜日</option>
          </select>
        </div>
      </div>
      <div class="col-4 col-lg-5">
        <input
          type="text"
           v-model="new_work"
          class="form-control"
        />
        <button @click="addSelectNewWork" class="btn btn-primary mt-2">追加</button>
      </div>
      <div >
        <label class="col-5 col-form-label"> {{ today }} 曜日:</label>
        <div>
        <div class="col-6 col-lg-3">
          <select class="form-select form-select-sm" v-model="today_week">
            <option value="">選択してください</option>
            <option value="Sunday">日曜日</option>
            <option value="Monday">月曜日</option>
            <option value="Tuesday">火曜日</option>
            <option value="Wednesday">水曜日</option>
            <option value="Thursday">木曜日</option>
            <option value="Friday">金曜日</option>
            <option value="Saturday">土曜日</option>
          </select>
        </div>
      </div>
      <div v-for="staff in check_staffs_post" :key="staff.id">
      <div>
        <div>
          <label class="col-4 col-form-label">職員名:</label>
          <div class="col-6 col-lg-5" @click="getDayliWork">
            <select
             v-model="staff.staff_name"
              class="form-select form-select-sm"
            >
              <option value="">選択してください</option>
              <option
              v-for="i in select_staff_name" 
              :key="i.id"
              :value="i.name"
              >
               {{i.name}}
              </option>
            </select>
          </div>
        </div>
        </div>
          <div>
            <label class="col-4 col-form-label">PHS番号:</label>
            <div class="col-4 col-lg-2">
              <select class="form-select form-select-sm" v-model="staff.phs">
                <option value="">選択してください</option>
                <option
                  v-for="n in [
                    5000, 5010, 5020, 5030, 5040, 5050, 5060, 5070, 5080, 5090,
                    5100, 5101,
                  ]"
                  :value="n"
                  :key="n"
                >
                  {{ String(n).slice(0, -1) }}
                </option>
              </select>
            </div>
          </div>
          <div>
            <label class="col-5 col-form-label"> 業務選択:</label>
            <div class="col-4 col-lg-3">
              <select
                v-model="staff.staff_work"
                size="2"
                class="form-select form-select-sm"
                multiple
              >
                  <option
                    v-for="work in select_daily_work" 
                    :key="work.id"
                    :value="work.work"
                  >
                  {{work.work}}
                  </option>
              </select>
            </div>
          </div>
          <div>
            <label class="col-4 col-form-label">追加業務1:</label>
            <div class="col-6 col-lg-6">
              <input class="form-control" v-model="staff.add_staff_work_one" />
            </div>
            <label class="col-4 col-form-label">追加業務2:</label>
            <div class="col-6 col-lg-6">
              <input class="form-control" v-model="staff.add_staff_work_two" />
            </div>
            <label class="col-4 col-form-label">追加業務3:</label>
            <div class="col-6 col-lg-6">
              <input  class="form-control" v-model="staff.add_staff_work_three" />
            </div>
          </div>

          <button
            @click="addStaffData"
            class="my-3 btn btn-primary"
          >
            職員追加
          </button>
          <button
            v-if="check_staffs_post.length > 1"
            @click="removeStaffData(staff)"
            class="my-3 mx-2 btn btn-primary"
          >
            削除
          </button>
        <hr />
      </div>
      <button @click="addStaffDailyWork(check_staffs_post)" class="btn btn-warning">
        {{today}}:業務登録
      </button>
    </div>
    </div>
    <hr />
    <router-link :to="'/staffdaywork/' + login_user_id + '/works'" class="mb-2 btn btn-primary">
      {{today}}:業務表示
    </router-link>
    <router-view
    v-bind:today="today"
    v-bind:user_department="user_department"
    ></router-view>
  </div>
</template>
<script>
  export default {
    props: {
      login_user_id: String,
    },
    data() {
      return {
        login_user: [],
        today: new Date().getFullYear() +
             "-" +
             ("00" + (new Date().getMonth() + 1)).slice(-2) + 
             "-" +
             ("00" + (new Date().getDate())).slice(-2),
        user_department: null,
        open_staff_method: false,
        week: '',
        select_staff_name: [],
        today_week: '',
        new_work: '',
        select_daily_work: [],
        add_staff_work_one: '',
        add_staff_work_two: '',
        add_staff_work_three: '',
        check_staffs_post: [{
                    staff_name: '',
                    phs: '',
                    staff_work: [],
                    add_staff_work_one: '',
                    add_staff_work_two: '',
                    add_staff_work_three: '',
        }],
      }
    },
    methods: {
      closeStaffData() {
        this.open_staff_method = false;
        this.week = '';
        this.today_week = '';
        this.new_work = '';
        this.check_staffs_post.phs = '';
        this.select_daily_work = '';
      },
      getStaffName() {
        const staff_array = [];
        axios.get('/api/users').then((res) => {
          for(let i = 0; i < res.data.length; i++) {
            if(res.data[i].user_department === this.user_department) {
              staff_array.push(res.data[i]);
            }
              this.select_staff_name = staff_array;
              this.open_staff_method = true;
          }
        })
      },
      addSelectNewWork() {
        const new_daily_work = {
          day_of_week: this.week,
          work: this.new_work,
          user_department: this.user_department,
        }
        axios.post('/api/daily_work', new_daily_work).then((res) => {
          console.log(res.data);
          this.week = '';
          this.new_work = '';
        });
        this.getDayliWork();
      },
      getDayliWork() {
          const work_array = [];
          axios.get('/api/daily_work').then((res) => {
            for(let i = 0; i < res.data.length; i++) {
              if(res.data[i].user_department === this.user_department && res.data[i].day_of_week === this.today_week) {
                work_array.push(res.data[i]);
              }
            }
            this.select_daily_work = work_array;
          });
      },
      addStaffData() {//登録するためのstaffのデータを追加するためのメソッド
            this.check_staffs_post.push(this.independentObject())
        },
       removeStaffData(target) {//addStaffDataで追加したデータを削除するためのメソッド
            this.check_staffs_post.splice(target, 1)
        },
      independentObject() {
            return {
                staff_name: '',
                phs: '',
                staff_work: [],
                add_staff_work_one: '',
                add_staff_work_two: '',
                add_staff_work_three: '',
            }
        },
        addStaffDailyWork(staff) {
          const daily_work = [];
          for(let i = 0; i < staff.length; i++) {
          staff[i].staff_work.push(staff[i].add_staff_work_one, staff[i].add_staff_work_two, staff[i].add_staff_work_three);
            daily_work.push(
              {
                staff_name: staff[i].staff_name,
                day: this.today,
                phs: staff[i].phs,
                department: this.user_department,
                works: String(staff[i].staff_work),
                complete_work_check: false,
              }
            );
            axios.post('/api/staff_daily_work', daily_work[i]).then((res) => {
              console.log(res.data);
            });
          };
        },

      
    },
    created() {
      axios.get('/api/users/' + this.login_user_id).then((res) => {
        console.log(res.data);
        this.login_user = res.data;
      })
    }
}
</script>
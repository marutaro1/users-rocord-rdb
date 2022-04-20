<template>
  <div>
    <div v-for="staff in staff_daily_works" :key="staff.id">
      <div v-if="today === staff.day && user_department === staff.department">
        <p>職員名:{{staff.staff_name}}</p>
        <p>
          PHS番号:{{(staff.phs).slice(0,3)}}
        </p>

        <router-link
          :to=
          "'/staffdaywork/' + login_user_id + '/' + staff.id + '/staffpage'"
          class="btn btn-primary p-1"
          >編集</router-link
        >

          <div v-for="i in staffDailyWorkData.length">
            <div v-if="staffDailyWorkData[i - 1].id === staff.id">
              <div v-for="n in staffDailyWorkData[i - 1].works.length">
                <template v-if="staffDailyWorkData[i - 1].works[n - 1] !== '' ">
                  {{staffDailyWorkData[i - 1].works[n - 1]}}:
                </template>

                <template v-for="check in work_check" :key="check.name">
                  <template v-if="check.name === staff.staff_name && check.check[n - 1] === 'false'">
                    
                  </template>
                  <template v-else-if="check.name === staff.staff_name && check.check[n - 1] === 'true' ">
                    完了
                  </template>
                  <template v-else-if="check.name === staff.staff_name && check.check[n - 1] === '' ">
                    
                  </template>

                  <div v-if="check.name === staff.staff_name && n === staffDailyWorkData[i - 1].works.length">
                    {{check.memo}}
                  </div>
                </template>
                
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
      today: String,
      user_department: String,
    },
    data() {
      return {
        staff_daily_works: [],
        work_check: [{}],
        change_work_check: [],
        staff_memo: '',
        complete_work_id: '',
      }
    },
    computed: {
      staffDailyWorkData() {
        const array_works = []
        for(let i = 0; i < this.staff_daily_works.length; i++) {
          const array_data = {
            id: this.staff_daily_works[i].id,
            works: this.staff_daily_works[i].works.split(',')
          }
          array_works.push(array_data);
        }
        return array_works;
      }
    },
    methods: {
      getStaffDailyWorks() {
        axios.get('/api/staff_daily_work').then((res) => {
          this.staff_daily_works = res.data;
          console.log(this.staff_daily_works);
        });
        this.getCompleteWorkCheck();
      },
      getCompleteWorkCheck() {
        console.log('start');
        axios.get('/api/complete_works').then((res) => {
          for(let i = 0; i < res.data.length; i++) {
            if(res.data[i].day === this.today) {
            console.log(res.data[i]);
              this.work_check.push(
                { 
                  name: res.data[i].staff_name,
                  check: res.data[i].work_check.split(','),
                  day: res.data[i].day,
                  memo: res.data[i].staff_memo
                }
              );
            }
          }
        });
      }
    },

    created() {
      this.getStaffDailyWorks();
    }
  }
</script>
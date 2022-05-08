<template>
  <div class="mt-2" @mousemove.once="addUserNumber">
    <hr />
    <h4>利用者情報更新</h4>

    <label class="col-4 col-form-label">部屋番号:</label>
    <div class="col-4 col-lg-2 mb-1">
      <input
        type="number"
        class="form-control"
        v-model="update_number"
        placeholder="部屋番号"
      />
    </div>

    <label class="col-4 col-form-label">部屋内番号:</label>
    <div class="col-2 col-lg-1 mb-1">
      <select class="form-select form-select-sm" v-model="update_add_number">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>

    <label class="col-4 col-form-label">要介護度:</label>
    <div class="col-6 col-lg-2 mb-3">
      <select class="form-select form-select-sm" v-model="update_care_level">
        <option value="">選択してください</option>
        <option value="自立">自立</option>
        <option value="要支援1">要支援1</option>
        <option value="要支援2">要支援2</option>
        <option value="要介護1">要介護1</option>
        <option value="要介護2">要介護2</option>
        <option value="要介護3">要介護3</option>
        <option value="要介護4">要介護4</option>
        <option value="要介護5">要介護5</option>
      </select>
    </div>

    <button class="btn btn-primary" @click="updateUser">登録</button>
  </div>
</template>
<script>
     export default {
         props: {
             id: String,
             login_user_id: String,
             number: Number,
         },
         data() {
           return {
             update_number: '',
             update_add_number: '',
             update_care_level: '',
           }
         },
         computed: {
         },
         methods: {
          updateUser() {
            axios.get('/api/factoryusers/' + this.id).then((res) => {
              const factoryuser = {
                number: Number(this.update_number + this.update_add_number),
                factoryuser_name: res.data.name,
                care_level: this.update_care_level,
                birthday: res.data.birthday,
              }
              axios.put('/api/factoryusers/' + this.id, factoryuser).then((responce) => {
                console.log(responce);
                this.$router.go('/factoryusers/' + this.login_user_id + '/' + this.id + '/records' );

              })
            })
          },
          addUserNumber() {
           this.update_number = String(this.number).slice(0, -1);
           this.update_add_number = String(this.number).slice(-1);
          },

         },
     }
 </script>
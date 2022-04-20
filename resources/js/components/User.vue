<template>
  <div class="mt-2 mx-3" @mousemove.once="getFactoryuser">
    <h3>利用者個人ページ</h3>
    <div>
      <div>
        <router-link
          :to="'/factoryusers/' + login_user_id + '/' + id + '/records'"
          class="btn btn-primary px-2 col-lg-2"
          >記録</router-link
        >
        <router-link
          :to="'/factoryusers/' + login_user_id + '/' + id + '/updateuser'"
          class="btn btn-primary px-1 mx-1 col-lg-2"
          >情報更新</router-link
        >
        <router-link
          :to="'/factoryusers/' + login_user_id + '/' + id + '/manuel'"
          class="btn btn-primary px-1 col-lg-2"
          >マニュアル</router-link
        >
        <router-link
          :to="'/factoryusers/' + login_user_id + '/' + id + '/medicalhistory'"
          class="btn btn-primary px-1 mx-1 col-lg-2"
          >既往歴</router-link
        >
        <router-link
          :to="'/factoryusers/' + login_user_id + '/' + id + '/treatment'"
          class="btn btn-primary px-2 col-lg-2"
          >処置</router-link
        >
        <hr />
        <p>名前: {{ factoryuser.factoryuser_name }} |
           部屋番号: {{ String(factoryuser.number).slice(0, -1) }} |
           要介護度: {{ factoryuser.care_level }} </p>
        <p>生年月日: {{ factoryuser.birthday }} |
           年齢: {{ age_data }}歳</p>
      </div>
      <router-view v-bind:number="factoryuser.number">
      </router-view>
    </div>
  </div>
</template>
<script>
     export default {
         props: {
             id: String,
             login_user_id: String
         },
         data() {
           return {
             factoryuser: {},
             age_data: '',
           }
         },
         methods: {
           getFactoryuser() {
             let day_value = '';
             axios.get('/api/factoryusers/' + this.id).then((res) => {
               this.factoryuser = res.data[0];
               day_value = res.data[0].birthday;
               console.log(res.data);
             }).then(() => {
               const age_time = Date.now() - new Date(day_value).getTime();
               this.age_data = new Date(age_time).getUTCFullYear() - 1970;;
             })
           },
         }
     }
 </script>
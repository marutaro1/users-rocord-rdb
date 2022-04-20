<template>
  <div class="mt-2 mx-3">
    <h3>新規職員登録</h3>
    <div>
      <label class="col-4 col-form-label">新規職員名:</label>
      <div class="col-4 col-lg-2">
        <input
          type="text"
          class="form-control"
          v-model="user_name"
          placeholder="職員名"
        />
      </div>
      <br />
      <label class="col-4 col-form-label">部署:</label>
      <div class="col-6 col-lg-2">
        <select class="form-select form-select-sm" v-model="user_department">
          <option value="">選択してください</option>
          <option value="caregiver">介護</option>
          <option value="nurse">看護</option>
          <option value="rehabilitation">リハビリ</option>
          <option value="studentSupport">施設管理</option>
        </select>
      </div>
      <br />
      <label class="col-4 col-form-label">役職:</label>
      <div class="col-6 col-lg-2">
        <select class="form-select form-select-sm" v-model="user_official_position">
          <option value="">役職なし</option>
          <option value="leader">リーダー</option>
          <option value="chief">主任</option>
          <option value="chiefclerk">係長</option>
          <option value="sectionchief">課長</option>
        </select>
      </div>

      <br />

      <div>
        <label class="col-4 col-form-label">Eメール:</label>
        <div class="col-7 col-lg-3">
          <input
            type="text"
            class="form-control"
            v-model="email"
            placeholder="Eメール"
          />
        </div>

        <br />

        <label class="col-4 col-form-label">パスワード:</label>
        <div class="col-7 col-lg-3 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="password"
            placeholder="パスワード"
          />
        </div>
        <br />
        <button @click="postUser" class="btn btn-primary">登録</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      user_id: String,
    },
    data() {
      return {
        user_name: '',
        user_department: '',
        user_official_position: '',
        email: '',
        password: '',
      }
    },
    methods: {
      postUser() {
        const post_user_data = {
          name: this.user_name,
          user_name: this.user_name,
          user_department: this.user_department,
          user_official_position: this.user_official_position,
          email: this.email,
          password: this.password,
        }
        axios.post('/api/users', post_user_data).then((res) => {
          console.log(res.data);
        })
        axios.get('/api/users').then((res) => {
          console.log(res.data);
        })
      }
    }
  }
</script>
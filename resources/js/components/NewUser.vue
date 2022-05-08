<template>
  <div class="mt-2 mx-3">
    <h3>新規利用者登録</h3>
    <label class="col-4 col-form-label">名前:</label>
    <div class="col-lg-2 col-4">
      <input
        type="data"
        class="form-control"
        placeholder="名前"
        v-model="factoryuser_name"
      />
    </div>
    <br />
    <label class="col-4 col-form-label">生年月日:</label>
    <div class="col-md-3 col-6">
      <input type="date" class="form-control" v-model="birthday" />
    </div>
    <br />
    <label class="col-4 col-form-label">要介護度:</label>
    <div class="col-md-3 col-6">
      <select class="form-select form-select-sm" v-model="care_level">
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
    <br />
    <label class="col-4 col-form-label">部屋番号:</label>
    <div class="col-4 col-lg-3">
      <input
        type="number"
        class="form-control"
        placeholder="部屋番号"
        v-model="number"
      />
    </div>
    <br />
    <label class="col-4 col-form-label">部屋内番号:</label>
    <div class="col-lg-1 col-2">
      <select class="form-select form-select-sm" v-model="add_number">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
    <br />
    <button class="btn btn-primary" @click="submit">登録</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        factoryuser_name: '',
        birthday: '',
        care_level: '',
        number: 0,
        add_number: 0,
      }
    },
    methods: {
      submit() {
        const factoryuser = {
          factoryuser_name: this.factoryuser_name,
          birthday: this.birthday,
          care_level: this.care_level,
          number: String(this.number) + String(this.add_number),
          day_record_check: '・',
        }
        axios.post('/api/factoryusers', factoryuser).then((res) => {
          console.log(res);
        });
      },

    }
  }
</script>
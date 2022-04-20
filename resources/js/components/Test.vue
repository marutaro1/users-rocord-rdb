<template>
    <div>
        <p>test</p>
        <p>{{user_id}}</p>
    </div>
</template>
<script>
    export default {
      props: {
        user_id: Number
      },
      data() {
        return {
          login_user: []
        }
      },
      methods: {
        getLoginUser() {
                  axios.get("'/api/users/' + this.user_id").then((res) => {
                      this.login_user = res.data;
                      console.log(this.login_user);
                  })
              },

      }
    }
</script>
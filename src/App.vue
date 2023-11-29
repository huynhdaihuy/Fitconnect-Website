<script>
export default {
  components: {},
  data() {
    return {
      isLoggin: false,
    };
  },
  computed: {
    getStatusLoggin() {
      this.isLoggin = this.$store.state.auth.status.loggedIn;
      console.log("LOGIN STATE : " + this.isLoggin);
      return this.isLoggin;
    },
  },
};
</script>
<template>
  <div>
    <router-view />
  </div>
</template>
<style scoped></style>

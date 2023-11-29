<template>
  <div class="wrapper">
    <div class="left-main">
      <Left_Drawer @item-clicked="setActiveItem" />
    </div>
    <div class="remain-main">
      <div
        class="heading-section d-flex align-items-center justify-content-between"
      >
        <h2 class="section-title">{{ activeItem }}</h2>
        <div class="user-section mr-4 mt-4">
          <img :src="coach.url_avatar" alt="" />
          <p @click="handleLogout" class="mt-2 logout-btn">Logout</p>
        </div>
      </div>
      <div class="section-content">
        <template v-if="activeItem === 'Dashboard'">
          <DashboardContent />
        </template>
        <template v-else-if="activeItem === 'Course'">
          <CourseContent /> </template
        ><template v-else-if="activeItem === 'Exercise'">
          <ExerciseContent />
        </template>
        <template v-else-if="activeItem === 'Profile'">
          <ProfileContent />
        </template>
        <template v-else-if="activeItem === 'Certification'">
          <CertificationContent />
        </template>
        <!-- <router-view /> -->
      </div>
    </div>
  </div>
</template>
<script>
import Left_Drawer from "@/components/Left_Drawer.vue";
import DashboardContent from "@/components/MainContent/Dashboard.vue";
import ProfileContent from "@/components/MainContent/Profile.vue";
import CertificationContent from "@/components/MainContent/Certification.vue";
import ExerciseContent from "@/components/MainContent/Exercise.vue";
import CourseContent from "@/components/MainContent/Course.vue";

export default {
  components: {
    Left_Drawer,
    DashboardContent,
    ProfileContent,
    CertificationContent,
    ExerciseContent,
    CourseContent,
  },
  data() {
    return {
      isLoggin: false,
      widthScreen: window.innerWidth,
      heightScreen: window.innerHeight,
      activeItem: "Dashboard",
      coach: {},
    };
  },
  computed: {
    getStatusLoggin() {
      this.isLoggin = this.$store.state.auth.status.loggedIn;
      return this.isLoggin;
    },
  },
  methods: {
    handleLogout() {
      this.$store.dispatch("auth/logout").then(
        () => {
          console.log("LOGOUT !");
          this.$swal.fire({
            title: "Logout Sucessfully!",
            text: "You are logging out",
            icon: "success",
            iconColor: "green",
            confirmButtonText: "Cool",
            color: "black",
            heightAuto: false,
            confirmButtonColor: "green",
            background: "white",
          });
          setTimeout(() => {
            location.pathname = "/";
          }, 1500);
          console.log("LOGOUT !");
        },
        (error) => {
          console.log("LOGOUT FAILLED !");
        }
      );
    },
    setActiveItem(item) {
      this.activeItem = item;
    },
    getCoachLogin() {
      this.coach = this.$store.state.auth.user.coach;
    },
  },
  mounted() {
    this.getCoachLogin();
  },
};
</script>
<style scoped>
.wrapper {
  display: flex;
  width: 100%;
}
.left-main {
  flex: 0 0 calc(25%);
  background-color: var(--color-text-main-sub);
  padding: 20px;
  min-height: 100vh;
}

.remain-main {
  flex: 0 0 calc(75%);
}

.section-title {
  margin: 20px 40px;
  font-weight: 600;
}
.user-section {
  background-color: black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-section img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  object-fit: contain;
}

.logout-btn {
  color: red;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}
</style>

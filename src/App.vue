<template>
  <div class="wrapper ">
    <div class="left-main">
      <Left_Drawer @item-clicked="setActiveItem" />
    </div>
    <div class="remain-main ">
      <div
        class="heading-section d-flex align-items-center justify-content-between "
      >
        <h2 class="section-title">{{ activeItem }}</h2>
        <div class="user-section mr-4 mt-4">
          <img
            src="https://res.cloudinary.com/dggneknsl/image/upload/v1692727272/hijb6s2if6ildebslvnl.jpg"
            alt=""
          />
          <p style="color:red; font-size: 12px;font-weight: 700;" class="mt-1">Logout</p>
        </div>
      </div>
      <div class="section-content">
        <template v-if="activeItem === 'Dashboard'">
          <DashboardContent />
        </template>
        <template v-else-if="activeItem === 'Notification'">
          <NotificationContent />
        </template>
        <template v-else-if="activeItem === 'Message'">
          <MessageContent />
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
import Left_Drawer from "./components/Left_Drawer.vue";
import DashboardContent from "./components/MainContent/Dashboard.vue";
import NotificationContent from "./components/MainContent/Notification.vue";
import ProfileContent from "./components/MainContent/Profile.vue";
import CertificationContent from "./components/MainContent/Certification.vue";
import ExerciseContent from "./components/MainContent/Exercise.vue";
import CourseContent from "./components/MainContent/Course.vue";

export default {
  components: {
    Left_Drawer,
    DashboardContent,
    NotificationContent,
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
    };
  },
  computed: {
    getStatusLoggin() {
      this.isLoggin = this.$store.state.auth.status.loggedIn;
      return this.isLoggin;
    },
  },
  methods: {
    setActiveItem(item) {
      this.activeItem = item;
    },
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
  background-color: var(--color-drawer_item);
  padding: 20px;
  min-height: 100vh;
}

.remain-main {
  flex: 0 0 calc(75%);
  /* background-color: black; */
}

.section-title {
  margin: 20px 40px;
  font-weight: 600;
}
.user-section {
  width: 50px;
  height: 50px;
}

.user-section img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  object-fit: contain;
}
</style>

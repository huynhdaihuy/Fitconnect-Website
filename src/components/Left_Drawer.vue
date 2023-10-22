<template>
  <div class="main-content">
    <div class="logo">Admin Website</div>
    <ul class="menu-list">
      <li
        :class="{ active: activeItem === 'Dashboard' }"
        @click="setActiveItem('Dashboard')"
      >
        <i class="fas fa-tachometer-alt"></i> Dashboard
      </li>
      <li
        :class="{ active: activeItem === 'Notification' }"
        @click="setActiveItem('Notification')"
      >
        <i class="fas fa-bell"></i> Notification
      </li>
      <li
        :class="{ active: activeItem === 'Message' }"
        @click="setActiveItem('Message')"
      >
        <i class="fas fa-envelope"></i> Message
      </li>
      <li
        :class="{ active: activeItem === 'Course' }"
        @click="setActiveItem('Course')"
      >
        <i class="fas fa-book"></i> Course
      </li>
      <li
        :class="{ active: activeItem === 'Exercise' }"
        @click="setActiveItem('Exercise')"
      >
        <i class="fas fa-dumbbell"></i> Exercise List
      </li>
      <li
        :class="{ active: activeItem === 'Certification' }"
        @click="setActiveItem('Certification')"
      >
        <i class="fas fa-briefcase"></i> Certification List
      </li>
      <li
        :class="{ active: activeItem === 'Profile' }"
        @click="setActiveItem('Profile')"
      >
        <i class="fas fa-user"></i> Profile
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeItem: null,
    };
  },
  methods: {
    setActiveItem(item) {
      this.activeItem = item;
      this.$emit("item-clicked", item);
    },
  },
};
</script>

<style scoped>
.logo {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
  font-weight: 550;
}
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  border-radius: 8px;
  color: black;
}
.menu-list li i {
  margin: 0 12px;
}

.menu-list li.active {
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--color-drawer_item);
}
</style>

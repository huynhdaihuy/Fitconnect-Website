<template>
  <div class="profile">
    <div class="avatar">
      <img
        class="avatar-item"
        :src="coach.url_avatar"
        alt="Avatar"
      />
      <div class="middle">
        <input type="file" />
      </div>
    </div>
    <h3 class="title-heading">Information here</h3>
    <Form @submit="onSubmit" class="info">
      <div class="row align-items-center justify-content-center">
        <div class="col-6">
          <label for="fullName" class="title-input">Coach Name</label>
          <Field
            name="fullName"
            type="name"
            class="input-field"
            style="width: 200px"
          />
        </div>
        <div class="col-6">
          <label for="fullName" class="title-input"
            >Email
            <address></address
          ></label>
          <Field
            name="fullName"
            type="name"
            class="input-field"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-6">
          <label for="phone" class="title-input">Phone number</label>
          <Field
            name="phone"
            type="Phone"
            class="input-field"
            style="width: 200px"
          />
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col-6">
          <label for="address" class="title-input">Address</label>
          <Field
            name="address"
            type="name"
            class="input-field"
            style="width: 700px"
          />
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          <label for="password" class="title-input">Password</label>
          <Field
            :disabled="false"
            placeholder="*********"
            name="password"
            type="name"
            class="input-field col-5"
          />
        </div>
      </div>
      <div class="row justify-content-center">
        <button type="submit" class="submit-button flex align-items-center">
          Updated
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

export default {
  name: "Profile",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    //   profileData: Object,
  },
  data() {
    return {
      editing: false,
      editedProfile: { ...this.profileData },
      coach: {},
    };
  },
  methods: {
    getCoachInfo() {
      this.coach = this.$store.state.auth.user.coach;
    },
    toggleEdit(field) {
      this.editing = !this.editing;
      if (!this.editing) {
        this.editedProfile[field] = this.profileData[field];
      }
    },
    saveChanges() {
      this.$toast.success("Profile updated successfully");
      this.editing = false;
    },
    onSubmit(value) {
      console.log(value);
    },
  },
  computed: {},
  mounted() {
    this.getCoachInfo();
  },
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1000px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.title-heading {
  font-weight: 600;
}
.avatar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 300px;
  margin-bottom: 20px;
}
.avatar-item {
  width: 100%;
  object-fit: cover;
  height: 300px;
  border-radius: 50%;
  transition: 0.5s ease;
  backface-visibility: hidden;
  opacity: 1;
}
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}

.avatar:hover .avatar-item {
  opacity: 0.8;
}

.avatar:hover .middle {
  opacity: 1;
}
.info {
  min-width: 900px;
  padding: 0 200px;
}
.title-input {
  color: grey;
  display: block;
  font-weight: 600;
  font-size: 16px;
  margin-top: 4px;
}
.input-field {
  border-radius: 8px;
  height: 32px;
  border: 2px solid #d3d3d3;
}
.submit-button {
  margin: 24px 0;
  width: 360px;
  height: 40px;
  border-radius: 8px;
  background-color: black;
  color: var(--color-drawer_item);
}
.submit-button:active {
  opacity: 0.8;
}
</style>

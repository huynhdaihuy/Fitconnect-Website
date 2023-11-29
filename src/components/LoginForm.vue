<template>
  <div
    class="d-flex"
    style="height: 40px; background-color: var(--color-text-main)"
  >
    <div
      class="d-flex justify-content-center align-items-center pt-3 position-relative heading-section"
      style="min-width: 50%"
    >
      <p class="font-weight-bold">
        Email for work : fitconnect@gmail.support.com
      </p>
    </div>
    <div
      style="
        min-width: 50%;
        background-color: black;
        color: var(--color-text-main);
      "
      class="d-flex justify-content-beweent align-items-center pt-3 position-relative heading-section"
    >
      <p style="font-size: 12px; font-weight: 700">
        Call us for emergency: (+13) 676767
      </p>
      <i class="fa-brands fa-facebook mr-2 mb-3 ml-4"> </i>
      <p class="mr-5" style="font-size: 12px">Facebook</p>
      <i class="fa-brands fa-twitter mr-2 mb-3 ml-4"> </i>
      <p class="mr-5" style="font-size: 12px">Twitter</p>

      <i class="fa-brands fa-instagram mr-2 mb-3 ml-4"> </i>
      <p class="mr-5" style="font-size: 12px">Instagram</p>
    </div>
  </div>
  <div
    class="d-flex justify-content-center align-items-center pt-2"
    style="background-color: black"
  >
    <p
      class="m-0 p-3 d-inline"
      style="font-weight: 900; color: white; font-size: 40px"
    >
      BUILD
    </p>
    <p
      class="m-0 p-3 d-inline"
      style="font-weight: 900; color: var(--color-text-main); font-size: 40px"
    >
      YOUR
    </p>
    <p
      class="m-0 p-3 d-inline"
      style="font-weight: 900; color: white; font-size: 40px"
    >
      CAREER
    </p>
    <p
      class="m-0 p-3 d-inline"
      style="font-weight: 900; color: var(--color-text-main); font-size: 40px"
    >
      FITNESS
    </p>
  </div>
  <div class="wrapper">
    <div
      class="d-flex justify-content-center align-items-center position-relative ml-auto"
    >
      <i
        class="fa-solid fa-shield mr-2 position-absolute"
        style="
          color: var(--color-text-main);
          font-size: 20px;
          top: 0;
          left: -28px;
        "
      ></i>
      <p
        class="mr-5"
        style="color: var(--color-text-main); font-weight: 500; font-size: 12px"
      >
        For Coach only
      </p>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <p class="heading-form mr-4 mb-4">Login</p>
      <p
        class="mb-4"
        style="color: var(--color-text-main); font-size: 45px; font-weight: 500"
      >
        Fitconnect
      </p>
    </div>
    <Form class="form-wrapper" @submit="handleSubmit">
      <div class="form-group">
        <label
          for="username"
          style="color: var(--color-text-main); font-weight: 700"
          >Username</label
        >
        <Field
          type="text"
          name="username"
          class="form-control"
          placeholder="vd: puppy2111"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="form-group">
        <label
          For="password"
          style="color: var(--color-text-main); font-weight: 700"
          >Password</label
        >
        <Field type="password" name="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button type="submit" class="login-btn">Login</button>
      </div>
      <div class="mr-5">
        You don't have account?
        <router-link
          class="text-decoration-none"
          style="color: var(--color-text-main)"
          :to="{ name: 'RegisterView' }"
          >Register now</router-link
        >
      </div>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    async handleSubmit(user) {
      console.log("🚀 ~ file: LoginForm.vue:162 ~ handleSubmit ~ user:", user);
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$swal.fire({
            title: "Sucessfull!",
            text: "Welcome to Fitconnect Coach",
            icon: "success",
            iconColor: "green",
            confirmButtonText: "Cool",
            color: "black",
            heightAuto: false,
            confirmButtonColor: "green",
            background: "white",
          });
          setTimeout(() => {
            location.pathname = "/home";
          }, 1500);
          console.log("LOGIN !");
        },
        (error) => {
          this.$swal.fire({
            title: "Failed",
            text: "Your authentication is failed, try again",
            icon: "error",
            iconColor: "#ff6961",
            confirmButtonText: "Try again",
            color: "black",
            confirmButtonColor: "#ff6961",
            background: "white",
          });
          console.log("FAILLED !");
        }
      );
    },
   
  },
};
</script>
<style scoped>
.wrapper {
  background: url(../assets/img/login.jpg) no-repeat black center;
  background-size: contain;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
}
.heading-form {
  color: white;
  font-size: 38px;
  font-weight: 600;
}
.form-wrapper {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 80px;
}
.login-btn {
  width: 100%;
  background-color: black;
  outline: none;
  font-weight: 700;
  border: none;
  color: var(--color-text-main);
  padding: 6px 3px;
  border-radius: 30px;
  margin-top: 8px;
}
.login-btn:hover {
  opacity: 0.8;
}
.form-control:focus {
  border: 2px solid var(--color-text-main);
}

.heading-section::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border: solid transparent;
  border-width: 20px;
  border-right-color: black;
  border-bottom-color: black;
  pointer-events: none;
}
</style>

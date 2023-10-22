<template>
  <div class="wrapper">
    <p class="heading-form">Đăng nhập</p>
    <Form class="form-wrapper" @submit="handleSubmit">
      <div class="form-group">
        <label for="username">Tài khoản</label>
        <Field
          type="text"
          name="username"
          class="form-control"
          placeholder="vd: puppy2111"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="form-group">
        <label For="password">Mật khẩu</label>
        <Field type="password" name="password" class="form-control" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button type="submit" class="login-btn">Đăng nhập</button>
      </div>
      <div class="login-">
        Bạn chưa có tài khoản?
        <router-link
          class="text-decoration-none"
          style="color: var(--color-btn-red)"
          :to="{ name: 'RegisterView' }"
          >Đăng ký</router-link
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
import userService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "LoginForm",
  components: {
    userService,
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
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$swal.fire({
            title: "Thành công!",
            text: "Chúc mừng bạn đã đăng nhập thành công...",
            icon: "success",
            iconColor: "#ff6961",
            confirmButtonText: "Cool",
            color: "white",
            heightAuto: false,
            confirmButtonColor: "#ff6961",
            background: "black",
          });
          setTimeout(() => {
            location.pathname = "/";
          }, 1500);
          console.log("LOGIN !");
        },
        (error) => {
          this.$swal.fire({
            title: "Thất bại!",
            text: "Có vẻ như tài khoản hoặc mật khẩu của bạn đã nhập sai !",
            icon: "error",
            iconColor: "#ff6961",
            confirmButtonText: "Thử lại",
            color: "white",
            confirmButtonColor: "#ff6961",
            background: "black",
          });
          console.log("FAILLED !");
        }
      );
    },
    handleLogout() {
      this.$store.dispatch("auth/logout").then(
        () => {
          console.log("LOGOUT  !");
        },
        (error) => {
          console.log("FAILLED !");
        }
      );
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  background: url(../assets/img/login_img_thumb.jpg) no-repeat black;
  object-fit: contain;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
}
.heading-form {
  color: white;
  font-size: 30px;
  font-weight: 600;
}
.form-wrapper {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 80px;
}
.login-btn {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  outline: none;
  color: white;
  padding: 12px 8px;
  border-radius: 4px;
  margin-top: 8px;
}
.login-btn:hover {
  opacity: 0.8;
}
.login-btn:focus {
  background-color: var(--color-btn-red);
  color: black;
}
</style>
<template>
  <div class="wrapper d-flex">
    <div class="left_thumb">
      <img
        class="left_thumb-img"
        src="../assets/img/register_img_thumb.jpg"
        alt=""
      />
    </div>
    <div class="form_wrapper">
      <span class="heading_form">Đăng ký tài khoản !</span>
      <Form
        @submit="handleSubmit"
        class="form_register"
        :validation-schema="userFormSchema"
      >
        <div class="form-group">
          <label class="label_form" for="username">Tên tài khoản</label>
          <i class="fa-regular fa-user icon_form"></i>
          <Field
            name="username"
            type="text"
            class="form-control"
            placeholder="VD: puppy2111"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="label_form" for="password">Tên mật khẩu</label>
          <i class="fa-solid fa-lock icon_form"></i>
          <Field
            name="password"
            type="Password"
            class="form-control"
            placeholder="Tối thiểu 9 ký tự"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="label_form" for="name">Họ và tên</label>
          <i class="fa-regular fa-circle-question icon_form"></i>
          <Field name="name" type="text" class="form-control" />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="label_form" for="email">E-mail</label>
          <i class="fa-regular fa-envelope icon_form"></i>
          <Field
            name="email"
            type="email"
            class="form-control"
            placeholder="VD: huy@gmail.com"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="label_form" for="address">Địa chỉ</label>
          <i class="fa-regular fa-address-card icon_form"></i>
          <Field name="address" type="text" class="form-control" />
          <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
          <label class="label_form" for="phone">Số điện thoại</label>
          <i class="fa-solid fa-phone icon_form" style="color: white"></i>
          <Field name="phone" type="tel" class="form-control" />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Đăng ký</button>
        </div>
      </Form>
    </div>
  </div>
  <!-- Modal -->
  <div v-if="isShowModal" class="modal fade" id="exampleModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Đăng ký thành công !
          </h5>
        </div>
        <div class="modal-body text-center" style="font-size: 18px">
          Chào mừng bạn đến với Trek Cycling.
        </div>
        <div class="modal-footer">
          <router-link
            :to="{ path: '/' }"
            class="text-decoration-none btn-modal"
          >
            <button @click="handleModal" type="button" class="btn btn-modal">
              Trở về trang chủ !
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
// import userService from "../services/user.service";
export default {
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
    // userService,
  },
  data() {
    const userFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Tên tài khoản phải phải có giá trị.")
        .min(8, "Tên tài khoản phải ít nhất 8 ký tự.")
        .max(20, "Tên tài khoản có nhiều nhất 20 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(9, "Mật khẩu phải ít nhất 9 ký tự.")
        .max(20, "Mật khẩu có nhiều nhất 20 ký tự."),
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      userFormSchema,
      isShowModal: false,
    };
  },
  methods: {
    async handleSubmit(value) {
      try {
        await userService.create(value);
        this.isShowModal = !this.isShowModal;
      } catch (error) {
        console.log("FAILED !");
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: black;
}
.left_thumb {
  width: 50%;
}
.left_thumb-img {
  width: 100%;
  min-height: 150vh;
}
.form_wrapper {
  width: 50%;
  color: white;
  margin: 8rem 2rem;
  display: flex;
  flex-direction: column;
}
.heading_form {
  padding-top: 40px;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
  font-weight: 600;
}
.form_register {
  margin: auto;
}
.form-control {
  height: 20px;
  min-width: 120px;
  padding: 20px 80px;
  margin-top: 12px;
}
.label_form {
  margin-bottom: 0;
}
.icon_form {
  display: block;
  margin: 8px 0;
  font-size: 20px;
}
.btn {
  margin-top: 28px;
  width: 100%;
  padding: 8px;
  color: white;
  background-color: #1d1e22;
  border-color: black;
}
.btn:hover,
.btn:focus {
  border-color: var(--color-price);
}
.error-feedback {
  color: red;
}
.modal {
  display: block;
  opacity: 1;
}
.fade {
  background-color: rgba(0, 0, 0, 0.6);
}
.modal-content {
  margin-top: 20rem;
}
.btn-modal,
.btn-modal {
  width: 100%;
  border-color: transparent;
  outline: none;
}
.modal-header {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
  border-radius: 0;
  margin-top: -4px;
}
.modal-title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}
</style>
<template>
  <div class="wrapper d-flex">
    <div class="left_thumb">
      <img class="left_thumb-img" src="../assets/img/register.jpg" alt="" />
    </div>
    <div class="form_wrapper">
      <span class="heading_form">Register coach account</span>
      <Form
        @submit="handleSubmit"
        class="form_register"
        :validation-schema="userFormSchema"
      >
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="username">Username</label>
            <i class="ml-2 fa-regular fa-user icon_form"></i>
          </div>
          <Field
            name="username"
            type="text"
            class="form-control"
            placeholder="VD: puppy2111"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="password">Password</label>
            <i class="ml-2 fa-solid fa-lock icon_form"></i>
          </div>
          <Field
            name="password"
            type="Password"
            class="form-control"
            placeholder="Password for your account"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="name">Full name</label>
            <i class="ml-2 fa-regular fa-circle-question icon_form"></i>
          </div>
          <Field name="name" type="text" class="form-control" />
          <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="email">E-mail</label>
            <i class="ml-2 fa-regular fa-envelope icon_form"></i>
          </div>
          <Field
            name="email"
            type="email"
            class="form-control"
            placeholder="VD: huy@gmail.com"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="address">Address</label>
            <i class="ml-2 fa-regular fa-address-card icon_form"></i>
          </div>
          <Field name="address" type="text" class="form-control" />
          <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="phone_number">Phone</label>
            <i
              class="ml-2 fa-solid fa-phone icon_form"
              style="color: white"
            ></i>
          </div>
          <Field name="phone_number" type="tel" class="form-control" />
          <ErrorMessage name="phone_number" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="image">Gender</label>
            <i class="ml-2 fa-solid fa-images"></i>
          </div>
          <Field name="gender" type="radio" class="mt-2 ml-3" value="male" />
          Male
          <Field
            name="gender"
            type="radio"
            class="mt-2 ml-3"
            style="color: var(--color-text-main)"
            value="female"
          />
          Female
          <Field
            name="gender"
            type="radio"
            class="mt-2 ml-3"
            style="color: var(--color-text-main)"
            value="other"
          />
          Other
          <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start align-items-center">
            <label class="label_form" for="image"
              >Upload image for Avatar</label
            >
            <i class="ml-2 fa-solid fa-images"></i>
          </div>
          <Field name="image" type="file" class="mt-2" />
          <ErrorMessage name="image" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Submit</button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import coachService from "../services/coach.service";
import * as yup from "yup";
export default {
  name: "RegisterView",
  components: {
    Form,
    Field,
    ErrorMessage,
    coachService,
  },
  data() {
    const userFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Username must have value")
        .min(6, "Username's length at least is 6")
        .max(20, "Username's length at most is 20"),
      password: yup
        .string()
        .required("Password must have value.")
        .min(8, "Password's length at least is 6")
        .max(20, "Password's length at most is 20"),
      name: yup
        .string()
        .required("Name must have value")
        .min(2, "Name's length at least is 2")
        .max(50, "Name's length at most is 50"),
      email: yup
        .string()
        .email("E-mail's format is wrong")
        .max(50, "E-mail's length at most is 50"),
      address: yup.string().max(100, "Name's length at most is 100"),
      phone: yup
        .string()
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Phone's format is wrong"),
    });
    return {
      userFormSchema,
    };
  },
  methods: {
    async handleSubmit(value) {
      value.birthday = '1997-03-13';
      console.log(
        "🚀 ~ file: RegisterView.vue:153 ~ handleSubmit ~ value:",
        value
      );
      try {
        await coachService.create(value);
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
          location.pathname = "/";
        }, 1500);
      } catch (error) {
        console.log(error);
        console.log("FAILED !");
        this.$swal.fire({
          title: "Failed",
          text: "Your register is failed, try again",
          icon: "error",
          iconColor: "#ff6961",
          confirmButtonText: "Try again",
          color: "black",
          confirmButtonColor: "#ff6961",
          background: "white",
        });
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 150vh;
  background-color: black;
  overflow: hidden;
}
.left_thumb {
  width: 50%;
}
.left_thumb-img {
  position: relative;
  left: 0;
  height: 100%;
  object-fit: contain;
}
.form_wrapper {
  width: 50%;
  color: white;
  margin: 2rem 2rem;
  display: flex;
  flex-direction: column;
}
.heading_form {
  margin-right: 50%;
  padding-top: 20px;
  margin-bottom: 20px;
  color: var(--color-text-main);
  font-size: 28px;
  text-align: center;
  font-weight: 600;
}
.form_register {
  /* margin: auto;s */
}
.form-control {
  display: inline-block;
  height: 20px;
  width: 400px;
  padding: 20px;
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
  margin-left: 80px;
  width: 30%;
  padding: 8px;
  outline: none;
  border: none;
  color: black;
  background-color: yellow;
}
.btn:hover,
.btn:focus {
  border-color: var(--color-price);
}
.error-feedback {
  color: red;
  display: block;
  margin-top: 4px;
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

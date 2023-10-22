<template>
  <div class="wrapper flex align-items-center justify-content-center flex-wrap">
    <h3
      v-if="listExercise.length == 0"
      class="font-weight-bold"
      style="color: var(--color-red-pastel); font-size: 20px"
    >
      Loading data...
    </h3>
    <table v-else>
      <tr>
        <th class="title-table">No</th>
        <th class="title-table">Image</th>
        <th class="title-table">Name</th>
        <th class="title-table">Description</th>
        <th class="title-table">Duration</th>
        <th class="title-table add-btn" @click="this.isShowModal = true">
          <i
            class="fas fa-plus"
            style="color: var(--color-red-pastel); margin-right: 4px"
          ></i>
          Add one
        </th>
      </tr>
      <tr :key="exercise._id" v-for="(exercise, index) in listExercise">
        <td
          class="content-table"
          style="
            max-width: 20px;
            color: var(--color-red-pastel);
            font-weight: 700;
          "
        >
          {{ index + 1 }}
        </td>
        <td class="image-content p-2">
          <img :src="exercise.url_image" alt="" />
        </td>
        <td class="content-table">{{ exercise.name }}</td>
        <td class="content-table">{{ exercise.description }}</td>
        <td class="content-table">{{ exercise.duration }}</td>
        <td class="content-table" style="width: 40px">
          <a
            class="btn-section"
            style="margin-right: 8px; color: var(--color-blue-pastel)"
            >Edit</a
          >
          <a class="btn-section" style="color: var(--color-red-pastel)"
            >Delete</a
          >
        </td>
      </tr>
    </table>
    <!-- Modal -->
    <div v-if="isShowModal" class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-header flex align-items-center justify-content-center mb-3"
          >
            <h5 class="modal-title" id="exampleModalLabel">
              Add exercise <i class="fas fa-dumbbell ml-2"></i>
            </h5>
            <i
              class="fas fa-close ml-auto p-3 ml-3 btn-close"
              @click="this.isShowModal = false"
            ></i>
          </div>
          <div class="form_wrapper">
            <Form
              @submit="handleModal"
              class="form_register"
              :validation-schema="exerciseFormSchema"
            >
              <div class="form-group">
                <label class="label_form" for="name">Name of exercise</label>
                <Field
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="example: push up"
                />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="description">Description</label>

                <Field
                  name="description"
                  type="text"
                  class="form-control"
                  placeholder="The brief describe for exercise..."
                />
                <ErrorMessage name="description" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="duration">Duration</label>
                <Field
                  name="duration"
                  type="number"
                  class="form-control ml-3 mr-2"
                  placeholder="5,15,..."
                  style="display: inline-block; width: 100px"
                />minute
                <ErrorMessage name="duration" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="quantity_rep_per_set"
                  >The quantity rep for each set</label
                >
                <Field
                  name="quantity_rep_per_set"
                  type="number"
                  class="form-control"
                  placeholder="12 reps,etc..."
                />
                <ErrorMessage
                  name="quantity_rep_per_set"
                  class="error-feedback"
                />
              </div>
              <div class="form-group">
                <label class="label_form" for="quantity_set"
                  >The quantity set for exercise</label
                >
                <Field name="quantity_set" type="number" class="form-control" />
                <ErrorMessage name="quantity_set" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="image"
                  >Upload image for exercise</label
                >
                <Field name="image" type="file" class="form-control" />
                <ErrorMessage name="image" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="video"
                  >Upload video for exercise</label
                >
                <Field name="video" type="file" class="form-control" />
                <ErrorMessage name="video" class="error-feedback" />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-modal">
                  <i class="mr-1 fas fa-plus"></i> Add
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import ExerciseService from "../../services/exercise.service";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export default {
  name: "Exercise",
  components: { Form, Field, ErrorMessage, ExerciseService,useToast },
  props: {},
  data() {
    const exerciseFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Name must have value.")
        .min(8, "Name must be at least 8 characters.")
        .max(50, "Name must be at least 20 characters."),
      description: yup
        .string()
        .required("Description must have value")
        .min(9, "Description must be at least 10 characters"),
      duration: yup.number().required("Duration must have value."),
      quantity_rep_per_set: yup
        .number()
        .required("The quantity of rep must have value."),
      quantity_set: yup
        .number()
        .required("The quantity of rep must have value."),
    });
    return {
      isShowModal: false,
      certificationsCoach: [],
      listExercise: [],
      exerciseFormSchema,
    };
  },
  methods: {
    async handleModal(value) {
      const data = { ...value, coach_id: "64e4f51d77b1cf0e70352398" };
      try {
        const $toast = useToast();
        let instance = $toast.success("Saving data...");
        await ExerciseService.create(data);
        instance.dismiss();
        this.isShowModal = false;
      } catch (error) {
        console.log("FAILED !");
      }
    },
    changeDate(date) {
      const result = new Date().toLocaleDateString("en-GB");
      return result;
    },
    async getListExercise() {
      try {
        const result = await ExerciseService.getAll();
        this.listExercise = result;
      } catch (error) {
        console.log(
          "🚀 ~ file: Certification.vue:59 ~ getListExercise ~ error:",
          error
        );
      }
    },
  },
  mounted() {
    this.getListExercise();
  },
  computed: {},
};
</script>

<style scoped>
.wrapper {
  max-height: 800px;
  position: relative;
  padding: 60px;
  box-shadow: rgba(100, 100, 111, 0.2) 7px 7px 29px 7px;
}
.title-table {
  width: 120px;
  color: var(--color-drawer_item);
  background-color: black;
  padding: 8px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid white;
  font-size: 12px;
}
.content-table {
  max-width: 120px;
  border-bottom: 1px solid rgb(156, 151, 151);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 4px 8px;
}
.image-content {
  width: 120px;
  height: 120px;
}
.image-content img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: contain;
}
.add-btn:hover {
  cursor: pointer;
  background-color: var(--color-lightgrey-pastel);
  color: black;
}
.btn-section:hover {
  cursor: pointer;
  opacity: 0.8;
}

/* CSS modal */
.modal {
  display: block;
  opacity: 1;
  border-radius: 8px;
}
.fade {
  background-color: rgba(0, 0, 0, 0.6);
}

.modal-content {
  margin-top: 2rem;
  padding: 20px 40px;
  overflow-y: scroll;
  height: 1200px;
}
.btn-close {
  font-size: 22px;
}
.btn-close:hover {
  cursor: pointer;
  color: var(--color-btn-red);
}
.btn-modal {
  width: 100%;
  border-color: transparent;
  outline: none;
  background-color: var(--color-drawer_item);
}
.modal-header {
  display: flex;
  justify-content: center;
  color: black;
  border-radius: 0;
  margin-top: -4px;
}
.modal-title {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

/* CSS for form */
.label_form {
  font-weight: 600;
}
.error-feedback {
  color: red;
}
</style>

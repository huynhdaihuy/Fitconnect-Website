<template>
  <div class="ml-4 input_form d-flex position-relative">
    <input
      class="input_search_heading"
      type="text"
      v-model="searchTextExercise"
      placeholder="Enter the name of exercise you want to find ..."
    />
    <i class="fas fa-search icon_search_heading"> </i>
  </div>
  <div
    class="mt-5 wrapper flex align-items-center justify-content-center flex-wrap"
  >
    <h3
      v-if="listExercise.length == 0"
      class="font-weight-bold"
      style="color: var(--color-text-main); font-size: 20px"
    >
      Loading data...
    </h3>
    <table v-else style="width: 100%">
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
      <tr :key="exercise._id" v-for="(exercise, index) in fillExercises">
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
            @click="isShowUpdate   = true"
            >Edit</a
          >
          <a
            @click="handleDeleteExercise(exercise._id)"
            class="btn-section"
            style="color: var(--color-red-pastel)"
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
    <!-- Modal FORM Update -->
    <div v-if="isShowUpdate" class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-header flex align-items-center justify-content-center mb-3"
          >
            <h5 class="modal-title" id="exampleModalLabel">
              Update exercise <i class="fas fa-dumbbell ml-2"></i>
            </h5>
            <i
              class="fas fa-close ml-auto p-3 ml-3 btn-close"
              @click="isShowUpdate = false"
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
                  <i class="mr-1 fas fa-plus"></i> Update
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
import "vue-loading-overlay/dist/css/index.css";

export default {
  name: "Exercise",
  components: { Form, Field, ErrorMessage, ExerciseService },
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
      isShowUpdate: false,
      exerciseUpdate: null,
      searchTextExercise: "",
      certificationsCoach: [],
      listExercise: [],
      exerciseFormSchema,
      coach: {},
    };
  },
  computed: {
    fillExercises() {
      if (!this.searchTextExercise) return this.listExercise;
      return this.listExercise.filter((exercise, index) =>
        this.exercisesStrings[index].includes(
          this.searchTextExercise.toLowerCase()
        )
      );
    },
    fillExercisesCount() {
      return this.listExercise.length;
    },
    exercisesStrings() {
      return this.listExercise.map((exercise) => {
        const { name } = exercise;
        return [name.toLowerCase()].join("");
      });
    },
  },
  methods: {
    async handleUpdateExercise(value) {
      // const loader = this.$loading.show({ color: "yellow" });
      // try {
      //   if (this.list_exercise_per_day.length > 0) {
      //     value.list_exercise_per_day = this.list_exercise_per_day;
      //   }
      //   console.log("🚀 ~ file: Course.vue:599 ~ handleUpdateCourse ~ value:", value)
      //   await ExerciseService.update(this.updateCourse._id, value);
      // } catch (error) {
      //   console.log("ERROR ", error);
      // }
      // loader.hide();
      // this.isShowUpdate = false;
      // console.log(location);
      // // location.reload();
    },
    async handleDeleteExercise(id) {
      try {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You are deleting exercise, carefully !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "black",
            color: "orange",
            confirmButtonText: "Yes, delete it!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const response = await ExerciseService.delete(id);
              this.$swal.fire({
                title: "Deleted!",
                text: "Your exercise has been deleted.",
                icon: "success",
              });
              location.reload();
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    async handleModal(value) {
      const data = { ...value, coach_id: this.coach._id };
      try {
        const loader = this.$loading.show({ color: "yellow" });
        await ExerciseService.create(data);
        this.isShowModal = false;
        loader.hide();
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
        const loader = this.$loading.show({ color: "yellow" });
        this.coach = this.$store.state.auth.user.coach;
        const result = await ExerciseService.getByCoachId(this.coach._id);
        this.listExercise = result;
        loader.hide();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getListExercise();
  },
};
</script>

<style scoped>
.wrapper {
  max-height: 500px;
  position: relative;
  overflow-y: scroll;
  padding: 30px;
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

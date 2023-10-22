<template>
  <div class="wrapper flex align-items-center justify-content-center flex-wrap">
    <h3
      v-if="listCourse.length == 0"
      class="font-weight-bold"
      style="color: var(--color-red-pastel); font-size: 20px"
    >
      Loading data...
    </h3>
    <table v-else >
      <tr>
        <th class="title-table">No</th>
        <th class="title-table">Image</th>
        <th class="title-table">Name</th>
        <th class="title-table">Price</th>
        <th class="title-table">Period</th>
        <th class="title-table add-btn" @click="isShowModal = true">
          <i
            class="fas fa-plus"
            style="color: var(--color-red-pastel); margin-right: 4px"
          ></i>
          Add one
        </th>
      </tr>
      <tr :key="course._id" v-for="(course, index) in listCourse">
        <td class="content-table" style="max-width: 20px; font-weight: 700">
          {{ index }}
        </td>
        <td class="image-content p-2">
          <img :src="course.url_image" alt="" />
        </td>
        <td class="content-table">{{ course.name }}</td>
        <td class="content-table">{{ course.description }}</td>
        <td class="content-table">{{ course.duration }}</td>
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
              Add course <i class="fas fa-dumbbell ml-2"></i>
            </h5>
            <i
              style="z-index: 999"
              class="fas fa-close ml-auto p-3 ml-3 btn-close"
              @click="isShowModal = periodLength = 0"
            ></i>
          </div>
          <div class="form_wrapper">
            <Form
              @submit="createCourse"
              class="form_register"
              :validation-schema="exerciseFormSchema"
            >
              <div class="form-group">
                <label class="label_form" for="name">Name of course</label>
                <Field
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="example: Trainng summer"
                />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="description">Description</label>

                <Field
                  name="description"
                  type="text"
                  class="form-control"
                  placeholder="The brief introduce for course..."
                />
                <ErrorMessage name="description" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="duration">Price</label>
                <Field
                  name="price"
                  type="double"
                  class="form-control ml-3 mr-2"
                  placeholder="9.99,19.99,..."
                  style="display: inline-block; width: 100px"
                />$
                <ErrorMessage name="price" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="period">Period</label>
                <Field
                  v-model="periodLength"
                  name="period"
                  type="number"
                  class="form-control"
                  placeholder="7 days, 30 days..."
                  style="width: 120px"
                />
                <p class="d-inline mt-5 font-weight-bold">days</p>
                <ErrorMessage name="period" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form d-block" for="hardness"
                  >The hard level of course</label
                >
                <label
                  class="p-2 font-weight-bold"
                  :key="index"
                  v-for="(hardness, index) in listHardness"
                >
                  {{ hardness }}
                  <Field
                    name="hardness"
                    type="radio"
                    class="form-control"
                    style="font-size: 2px"
                    :value="hardness"
                  />
                </label>
                <ErrorMessage name="hardness" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="image"
                  >Upload image for represent course</label
                >
                <Field name="image" type="file" class="form-control" />
                <ErrorMessage name="image" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form d-block" for="category_id"
                  >Choose category for course</label
                >
                <label
                  class="p-2 font-weight-bold"
                  :key="category._id"
                  v-for="category in listCategory"
                >
                  {{ category.name }}
                  <Field
                    name="category_id"
                    type="radio"
                    class="form-control"
                    style="font-size: 2px"
                    :value="category._id"
                  />
                </label>
                <ErrorMessage name="category_id" class="error-feedback" />
              </div>

              <div v-if="periodLength">
                <label class="label_form d-block" for="category_id"
                  >Add exercise for course</label
                >
                <label
                  class="p-2 font-weight-bold"
                  :key="indexPeriod"
                  v-for="indexPeriod in periodLength"
                >
                  <div
                    v-if="periodLength >= 7 && indexPeriod % 7 == 0"
                    class="week-section mt-3 ml-1 p-1"
                    style="font-size: 14px"
                  >
                    <p class="mt-3">Repeat the exercise is same with</p>
                    <div
                      v-for="ind in indexPeriod / 7"
                      :key="ind"
                      class="d-flex align-items-center justify-content-around"
                    >
                      <p class="ml-2">Week {{ ind }}</p>

                      <button
                        class="btn-add-exercise-week"
                        @click="handleAddExerciseByWeek($event, ind)"
                      >
                        Choose
                      </button>
                    </div>
                  </div>
                  <div>
                    <p>Day {{ indexPeriod }}</p>
                  </div>
                  <div class="exercise-wrapper">
                    <div
                      :key="exercise._id"
                      v-for="(exercise, indexExercise) in listExercise"
                      class="mb-3 d-flex"
                    >
                      <img :src="exercise.url_image" alt="" class="mr-2" />
                      <div class="d-flex flex-column">
                        <span class="title-exercise">
                          {{ exercise.name }}
                        </span>
                        <span>
                          Duration:
                          <span
                            class="ml-2"
                            style="color: var(--color-red-rose)"
                            >{{ exercise.duration }}</span
                          >
                          min
                        </span>
                        <p>
                          <span
                            style="color: var(--color-red-rose)"
                            class="mr-1"
                            >{{ exercise.quantity_set }} </span
                          >Sets x
                          <span
                            style="color: var(--color-red-rose)"
                            class="mr-1"
                            >{{ exercise.quantity_rep_per_set }}
                          </span>
                          reps
                        </p>
                      </div>
                      <i
                        class="fas fa-check-square ml-auto mr-2 mt-4 icon-add-exercise"
                        style="font-size: 20px"
                        @click.prevent="
                          handleAddExerciseOnDay(
                            $event,
                            exercise._id,
                            indexExercise,
                            indexPeriod - 1
                          )
                        "
                      ></i>
                      <!-- v-if="
                          list_exercise_per_day.length > 0 &&
                          list_exercise_per_day[n].includes(exercise)
                        " -->
                      <!-- <i
                        class="fas fa-check-square mr-2 mt-4 icon-add-exercise"
                        style="font-size: 20px"
                      ></i> -->
                    </div>
                  </div>
                </label>
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
import CategoryService from "../../services/category.service";
import CourseService from "../../services/course.service";

export default {
  name: "Exercise",
  components: {
    Form,
    Field,
    ErrorMessage,
    ExerciseService,
    CategoryService,
    CourseService,
  },
  props: {},
  data() {
    const exerciseFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Name must have value.")
        .min(8, "Name must be at least 8 characters.")
        .max(50, "Name must be shorter 50 characters."),
      description: yup
        .string()
        .required("Description must have value")
        .min(9, "Description must be at least 10 characters"),
      price: yup.number().required("Price must have value."),
      period: yup.number().required("The period of rep must have value."),
      hardness: yup.string().required("The hardness must be choosen."),
      category_id: yup.string().required("The category must be choosen."),
    });
    return {
      isShowModal: false,
      certificationsCoach: [],
      listExercise: [],
      listCourse: [],
      listHardness: ["beginner", "immediately", "advance", "professional"],
      listCategory: [],
      list_exercise: [],
      list_exercise_per_day: [],
      periodLength: 0,
      exerciseFormSchema,
    };
  },
  methods: {
    async handleModal(value) {
      console.log("🚀 ~ file: Exercise.vue:200 ~ handleModal ~ value:", value);
      try {
        await ExerciseService.create(value);
        this.isShowModal = !this.isShowModal;
      } catch (error) {
        console.log("FAILED !");
      }
    },
    handleAddExerciseOnDay(event, idExercise, indexExercise, indexDay) {
      this.list_exercise_per_day[indexDay].push(idExercise);
    },
    handleAddExerciseByWeek(event, numWeek) {
      const buttonElement = event.target;
      var k = numWeek - 1;
      for (var i = numWeek; i < numWeek + 1; i++) {
        for (var j = 7 * i; j < 7 * i + 7 && j < this.periodLength; j++) {
          this.list_exercise_per_day[j] = this.list_exercise_per_day[k];
          k++;
        }
      }
      buttonElement.setAttribute("disabled", true);

      console.log(this.list_exercise_per_day);
      // buttonElement.innerHtml = 'Picked';
    },
    changeDate(date) {
      const result = new Date().toLocaleDateString("en-GB");
      return result;
    },
    async createCourse(value) {
      const data = {
        ...value,
        list_exercise_per_day: this.list_exercise_per_day,
        coach_id: "64e4f51d77b1cf0e70352398",
      };
      console.log("🚀 ~ file: Course.vue:347 ~ createCourse ~ list_exercise_per_day:", this.list_exercise_per_day)
      try {
        const response = await CourseService.create(data);
        console.log("🚀 ~ file: Course.vue:351 ~ createCourse ~ response:", response)
        this.isShowModal = false;
      } catch (error) {
        console.log(error);
      }

    },
    async getData() {
      try {
        const exerciseList = await ExerciseService.getAll();
        const categoryList = await CategoryService.getAll();
        const courseList = await CourseService.getAll();
        this.listExercise = exerciseList;
        this.listCourse = courseList;
        console.log("🚀 ~ file: Course.vue:367 ~ getData ~ listCourse:", this.listCourse)
        this.listCategory = categoryList;
      } catch (error) {
        console.log("🚀 ~ file: Certification.vue:59 ~ getData~ error:", error);
      }
    },
  },

  computed: {
    isContainExercise(indexPeriod, exerciseId) {
      return this.list_exercise_per_day[indexPeriod].contains(exerciseId);
    },
  },
  watch: {
    periodLength(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.list_exercise_per_day = [];

        for (let index = 0; index < newVal; index++) {
          this.list_exercise_per_day.push([]);
        }
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.wrapper {
  max-height: 800px;
  position: relative;
  padding: 60px;
  box-shadow: rgba(100, 100, 111, 0.2) 7px 7px 29px 7px;
  font-size: 12px;
  background-color: #fff;
}
.title-table {
  width: 120px;
  background-color: black;
  padding: 8px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid white;
  color: var(--color-drawer_item);
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
.modal-dialog .modal-content {
  margin-top: 2rem;
  padding: 20px 40px;
  overflow-y: scroll;
  height: 100vh;
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
  font-size: 16px;
}
.error-feedback {
  margin-top: 4px;
  display: block;
  color: red;
}
.add-exercise-btn {
  cursor: pointer;
  color: var(--color-btn-red);
  font-weight: 700;
  font-size: large;
}
.exercise-wrapper {
  width: 400px;
  height: 200px;
  overflow-y: scroll;
}
.exercise-wrapper img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
.title-exercise {
}

.icon-add-exercise:hover {
  cursor: pointer;
  opacity: 0.8;
  color: aquamarine;
}
.btn-add-exercise-week {
  width: 120px;
  background-color: var(--color-drawer_item);
  color: black;
  border: none;
  border-radius: 8px;
  float: right;
  font-size: 12px;
  padding: 4px 6px;
  font-weight: 600;
}
.btn-add-exercise-week:disabled {
  background-color: aliceblue;
  color: black;
}
</style>

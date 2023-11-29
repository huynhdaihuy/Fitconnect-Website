<template>
  <div class="ml-4 input_form d-flex position-relative">
    <input
      class="input_search_heading"
      type="text"
      v-model="searchTextCourse"
      placeholder="Enter the name of course you want to find ..."
    />
    <i class="fas fa-search icon_search_heading"> </i>
  </div>
  <div class="mt-5 wrapper">
    <h3
      v-if="isLoading"
      class="font-weight-bold"
      style="color: var(--color-text-main); font-size: 20px"
    >
      Loading data...
    </h3>
    <table v-else style="width: 100%">
      <tr>
        <th class="title-table">No</th>
        <th class="title-table">Image</th>
        <th class="title-table" style="width: 200px">Name</th>
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
      <tr :key="course._id" v-for="(course, index) in fillCourses">
        <td class="content-table" style="max-width: 20px; font-weight: 700">
          {{ index }}
        </td>
        <td class="image-content p-2">
          <img
            :src="course.url_image"
            alt=""
            class="m-1"
            style="object-fit: cover"
          />
        </td>
        <td class="content-table">{{ course.name }}</td>
        <td class="content-table">{{ course.price }} $</td>
        <td class="content-table">{{ course.period }}</td>
        <td class="content-table" style="width: 40px">
          <a
            @click="handleEditCourse(course)"
            class="btn-section"
            style="margin-right: 8px; color: var(--color-blue-pastel)"
            >Edit</a
          >
          <a
            @click="handleDeleteCourse(course._id)"
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
              Add course <i class="fas fa-dumbbell ml-2"></i>
            </h5>
            <i
              style="z-index: 999"
              class="fas fa-close ml-auto p-3 ml-3 btn-close"
              @click="isShowModal = false"
            ></i>
          </div>
          <!-- FORM ADD COURSE -->
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

              <div v-if="periodLength && fillExercisesCount > 0">
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
                  <div class="input_form">
                    <input
                      class="input_search"
                      type="text"
                      v-model="searchText"
                      @input="getSearchValue"
                      placeholder="Find exercise by name ..."
                    />
                    <span class="search_icon">
                      <i class="fas fa-search"> </i>
                    </span>
                  </div>
                  <div class="exercise-wrapper">
                    <div
                      :key="exercise._id"
                      v-for="(exercise, indexExercise) in fillExercises"
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
                      <i
                        v-if="
                          isExerciseAddedForDay(indexPeriod - 1, exercise._id)
                        "
                        class="fas fa-check-circle ml-2 mt-4 icon-exercise-added"
                        style="font-size: 20px; color: green"
                      ></i>
                      <i
                        v-if="
                          isExerciseAddedForDay(indexPeriod - 1, exercise._id)
                        "
                        class="fas fa-times-circle ml-2 mt-4 icon-remove-exercise"
                        style="font-size: 20px; color: red; cursor: pointer"
                        @click.prevent="
                          removeExerciseFromDay(indexPeriod - 1, exercise._id)
                        "
                      ></i>
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
    <!-- FORM UPDATE COURSE-->
    <div v-if="isShowUpdate" class="modal fade" id="updateModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-header flex align-items-center justify-content-center mb-3"
          >
            <h5 class="modal-title" id="exampleModalLabel">
              Update course <i class="fas fa-dumbbell ml-2"></i>
            </h5>
            <i
              style="z-index: 999"
              class="fas fa-close ml-auto p-3 ml-3 btn-close"
              @click="isShowUpdate = false"
            ></i>
          </div>
          <div class="form_wrapper">
            <Form
              @submit="handleUpdateCourse"
              class="form_register"
              v-if="updateCourse"
            >
              <div class="form-group">
                <label class="label_form" for="name">Name of course</label>
                <Field
                  name="name"
                  type="text"
                  class="form-control"
                  :placeholder="updateCourse.name"
                />
                <ErrorMessage name="name" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="description">Description</label>

                <Field
                  name="description"
                  type="text"
                  class="form-control"
                  :placeholder="updateCourse.description"
                />
                <ErrorMessage name="description" class="error-feedback" />
              </div>
              <div class="form-group">
                <label class="label_form" for="duration">Price</label>
                <Field
                  name="price"
                  type="double"
                  class="form-control ml-3 mr-2"
                  :placeholder="updateCourse.price"
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

              <div v-if="periodLength && fillExercisesCount > 0">
                <label class="label_form d-block" for="category_id"
                  >Update exercise for course</label
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
                  <div class="input_form">
                    <input
                      class="input_search"
                      type="text"
                      v-model="searchText"
                      @input="getSearchValue"
                      placeholder="Find course by name ..."
                    />
                    <span class="search_icon">
                      <i class="fas fa-search"> </i>
                    </span>
                  </div>
                  <div class="exercise-wrapper">
                    <div
                      :key="exercise._id"
                      v-for="(exercise, indexExercise) in fillExercises"
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
                      <i
                        v-if="
                          isExerciseAddedForDay(indexPeriod - 1, exercise._id)
                        "
                        class="fas fa-check-circle ml-2 mt-4 icon-exercise-added"
                        style="font-size: 20px; color: green"
                      ></i>
                      <i
                        v-if="
                          isExerciseAddedForDay(indexPeriod - 1, exercise._id)
                        "
                        class="fas fa-times-circle ml-2 mt-4 icon-remove-exercise"
                        style="font-size: 20px; color: red; cursor: pointer"
                        @click.prevent="
                          removeExerciseFromDay(indexPeriod - 1, exercise._id)
                        "
                      ></i>
                    </div>
                  </div>
                </label>
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
import CategoryService from "../../services/category.service";
import CourseService from "../../services/course.service";
import "vue-loading-overlay/dist/css/index.css";
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
      isShowUpdate: false,
      searchText: "",
      searchTextCourse: "",
      courseUpdate: null,
      certificationsCoach: [],
      listExercise: [],
      listCourse: [],
      listHardness: ["beginner", "immediately", "advance", "professional"],
      listCategory: [],
      list_exercise: [],
      list_exercise_per_day: [],
      periodLength: 0,
      exerciseFormSchema,
      isLoading: true,
    };
  },
  methods: {
    async handleUpdateCourse(value) {
      const loader = this.$loading.show({ color: "yellow" });
      try {
        if (this.list_exercise_per_day.length > 0) {
          value.list_exercise_per_day = this.list_exercise_per_day;
        }
        console.log("🚀 ~ file: Course.vue:599 ~ handleUpdateCourse ~ value:", value)
        await CourseService.update(this.updateCourse._id, value);
      } catch (error) {
        console.log("ERROR ", error);
      }
      loader.hide();
      this.isShowModal = false;
      console.log(location);
      // location.reload();
    },
    async handleModal(value) {
      try {
        await ExerciseService.create(value);
        this.isShowModal = !this.isShowModal;
      } catch (error) {
        console.log("FAILED !");
      }
    },
    async handleEditCourse(course) {
      this.isShowUpdate = true;
      this.updateCourse = course;
      this.periodLength = course.period;
    },
    isExerciseAddedForDay(indexDay, exerciseId) {
      return this.list_exercise_per_day[indexDay].includes(exerciseId);
    },
    removeExerciseFromDay(indexDay, exerciseId) {
      const dayExercises = this.list_exercise_per_day[indexDay];
      const exerciseIndex = dayExercises.indexOf(exerciseId);
      if (exerciseIndex !== -1) {
        dayExercises.splice(exerciseIndex, 1);
      }
      console.log(this.list_exercise_per_day);
    },
    handleAddExerciseOnDay(event, idExercise, indexExercise, indexDay) {
      this.list_exercise_per_day[indexDay].push(idExercise);
      this.searchText = "";
      console.log(this.list_exercise_per_day);
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
    },
    changeDate(date) {
      const result = new Date().toLocaleDateString("en-GB");
      return result;
    },
    async createCourse(value) {
      const coachId = this.$store.state.auth.user.coach._id;
      const loader = this.$loading.show({ color: "yellow" });
      const data = {
        ...value,
        list_exercise_per_day: this.list_exercise_per_day,
        coach_id: coachId,
      };
      try {
        const response = await CourseService.create(data);

        console.log(
          "🚀 ~ file: Course.vue:351 ~ createCourse ~ response:",
          response
        );
        this.isShowModal = false;
        loader.hide();
      } catch (error) {
        console.log(error);
      }
    },
    async getData() {
      try {
        const loader = this.$loading.show({ color: "yellow" });
        const coachId = this.$store.state.auth.user.coach._id;
        const categoryList = await CategoryService.getAll();
        const exerciseList = await ExerciseService.getByCoachId(coachId);
        const courseList = await CourseService.getbyCoachId(coachId);
        this.listExercise = exerciseList;
        this.listCourse = courseList;
        this.listCategory = categoryList;
        this.isLoading = false;
        loader.hide();
      } catch (error) {
        console.log(error);
      }
    },
    async handleDeleteCourse(id) {
      try {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You are deleting course, carefully !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "black",
            color: "orange",
            confirmButtonText: "Yes, delete it!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const response = await CourseService.delete(id);
              this.$swal.fire({
                title: "Deleted!",
                text: "Your course has been deleted.",
                icon: "success",
              });
              location.reload();
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    fillCourses() {
      if (!this.searchTextCourse) return this.listCourse;
      return this.listCourse.filter((course, index) =>
        this.coursesStrings[index].includes(this.searchTextCourse.toLowerCase())
      );
    },
    fillCoursesCount() {
      return this.listCourse.length;
    },
    coursesStrings() {
      return this.listCourse.map((course) => {
        const { name } = course;
        return [name.toLowerCase()].join("");
      });
    },
    fillExercises() {
      if (!this.searchText) return this.listExercise;
      return this.listExercise.filter((exercise, index) =>
        this.exercisesStrings[index].includes(this.searchText.toLowerCase())
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
  max-height: 500px;
  overflow-y: scroll;
  position: relative;
  padding: 30px;
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
  height: 60px;
}
.image-content img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
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

.input_form {
  position: relative;
  /* width: 800px; */
  display: flex;
  align-items: center;
  /* margin-left: 464px; */
}
.input_search {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 0.5px solid rgb(0 0 0 / 0.2);
  outline: none;
  border-radius: 4px;
}
.input_search:focus {
  border-color: black;
  box-shadow: 0 0 0 1px rgba(15, 15, 15, 0.25);
}
.search_icon {
  position: absolute;
  right: 12px;
  top: 16px;
  font-weight: 800;
  font-size: 20px;
}
</style>

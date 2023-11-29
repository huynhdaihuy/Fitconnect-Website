<template>
  <div class="mt-5 wrapper flex align-items-center justify-content-center">
    <h3
      v-if="certificationsCoach.length == 0"
      class="font-weight-bold"
      style="color: var(--color-red-pastel); font-size: 20px"
    >
      Loading data...
    </h3>
    <table v-else style="min-width: 920px">
      <tr>
        <th class="title-table">No</th>
        <th class="title-table">Place</th>
        <th class="title-table">Name</th>
        <th class="title-table">Expiration</th>
        <th class="title-table">Type</th>
        <th class="title-table add-btn">
          <i
            class="fas fa-plus"
            style="color: var(--color-red-pastel); margin-right: 4px"
          ></i>
          Add one
        </th>
      </tr>
      <tr
        :key="certification._id"
        v-for="(certification, index) in certificationsCoach"
      >
        <td
          class="content-table"
          style="
            max-width: 20px;
            color: var(--color-red-pastel);
            font-weight: 700;
          "
        >
          {{ index }}
        </td>
        <td class="content-table">{{ certification.issued_place }}</td>
        <td class="content-table">{{ certification.name }}</td>
        <td class="content-table">
          {{
            changeDate(certification.expiration_date)
              ? changeDate(certification.expiration_date)
              : "Infinity"
          }}
        </td>
        <td class="content-table">{{ certification.type }}</td>
        <td class="content-table" style="width: 40px">
          <a
            class="btn-section"
            style="margin-right: 8px; color: var(--color-blue-pastel)"
            >Edit</a
          >
          <a
            @click="handleDeleteCertification(certification._id)"
            class="btn-section"
            style="color: var(--color-red-pastel)"
            >Delete</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import CertificationService from "../../services/certification.service";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
export default {
  name: "Certification",
  components: { CircleProgress },
  props: {},
  data() {
    return {
      certificationsCoach: [],
    };
  },
  methods: {
    changeDate(date) {
      const result = new Date().toLocaleDateString("en-GB");
      return result;
    },
    async getCertificationCoach() {
      try {
        const coachId = this.$store.state.auth.user.coach._id;
        const result = await CertificationService.getByCoachId(coachId);
        this.certificationsCoach = result;
      } catch (error) {
        console.log(
          "🚀 ~ file: Certification.vue:59 ~ getCertificationCoach ~ error:",
          error
        );
      }
    },
    async handleDeleteCertification(id) {
      console.log(
        "🚀 ~ file: Certification.vue:97 ~ handleDeleteCertification ~ id:",
        id
      );
      try {
        this.$swal
          .fire({
            title: "Are you sure?",
            text: "You are deleting certification, carefully !",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "orange",
            cancelButtonColor: "black",
            color: "orange",
            confirmButtonText: "Yes, delete it!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const response = await CertificationService.delete(id);
              console.log(
                "🚀 ~ file: Course.vue:351 ~ createCourse ~ response:",
                response
              );
              this.$swal.fire({
                title: "Deleted!",
                text: "Your ceritication has been deleted.",
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
  mounted() {
    this.getCertificationCoach();
  },
  computed: {},
};
</script>

<style scoped>
.wrapper {
  max-height: 600px;
  overflow-y: scroll;
  position: relative;
  padding: 60px;
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
  border-bottom: 1px solid rgb(156, 151, 151);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 4px 8px;
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
</style>

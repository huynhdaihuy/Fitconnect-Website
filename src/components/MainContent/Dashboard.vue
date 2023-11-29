<template>
  <p
    v-if="isLoading"
    class="ml-4"
    style="font-size: 20px; color: var(--color-text-main); font-weight: bold"
  >
    Loading data ...
  </p>
  <div v-else class="">
    <div class="ml-3">
      <label class="font-weight-bold" for="timeRange">Statitics By:</label>
      <select
        style="background-color: black; color: var(--color-text-main)"
        class="ml-2"
        v-model="selectedTimeRange"
      >
        <option value="day">Day</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
    <button
      @click="handleChange"
      class="ml-3 mb-1 mr-3 position-relative"
      style="
        background-color: yellow;
        color: black;
        font-weight: 700;
        font-size: 12px;
        padding: 4px 10px;
        outline: none;
        border: none;
        border-radius: 10px;
      "
    >
      Apply
    </button>
    <div class="ml-4" v-if="selectedTimeRange === 'day'">
      <label for="selectedMonth" class="font-weight-bolder"
        >Select Month:</label
      >
      <select class="ml-2" v-model="selectedMonth">
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <label for="selectedYear" class="ml-3 font-weight-bolder"
        >Select Year:</label
      >
      <input type="number" class="ml-2" v-model="selectedYear" />
    </div>

    <div class="ml-2" v-if="selectedTimeRange === 'month'">
      <label for="selectedYear" class="ml-3 font-weight-bolder"
        >Select Year:</label
      >
      <input class="ml-2" type="number" v-model="selectedYear" />
    </div>

    <div class="mt-4 chart-static">
      <div class="square-element">
        <div class="title">
          <i class="fas fa-chart-line"></i>
          Sales
        </div>
        <div class="value" style="color: var(--color-price)">
          ${{ totalRevenue.toFixed(2) }}
        </div>
      </div>
      <div class="square-element">
        <div class="title">
          <i class="fas fa-book"></i>
          Course
        </div>
        <div class="value" style="color: #8ce5f8">{{ listCourse.length }}</div>
      </div>
      <div class="square-element">
        <div class="title">
          <i class="fas fa-user"></i>
          Customer
        </div>
        <div class="value" style="color: #e88e8e">
          {{ numCustomerPurchase }}
        </div>
      </div>
      <div class="square-element">
        <div class="title">
          <i class="fas fa-shopping-cart"></i>
          Sold Course
        </div>
        <div class="value" style="color: #f7d05e">{{ numCourseSold }}</div>
      </div>
    </div>
    <div class="chart-container" :key="chartKey">
      <Bar :data="dataChart" :options="optionsChart" />
    </div>
  </div>
</template>

<style scoped>
.chart-static {
  height: 200px;
  padding: 20px;
  margin: 0 60px;
  background-color: var(--color-text-main-sub);
  display: flex;
  gap: 12px;
  border-radius: 8px;
  width: 760px;
}

.square-element {
  margin: 10px 0 10px 10px;
  width: 140px;
  height: 140px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 5px 10px;
  font-weight: bold;
}

.title i {
  margin-right: 5px;
  font-size: larger;
}

.value {
  font-size: 20px;
  margin-top: 10px;
  font-weight: 600;
}

.chart-container {
  width: 800px;
  height: 400px;
  margin-top: 20px;
  margin-left: 40px;
}
</style>

<script>
import CourseService from "../../services/course.service";
import "vue-loading-overlay/dist/css/index.css";
import OrderService from "../../services/order.service";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "App",
  components: {
    Bar,
    CourseService,
    OrderService,
  },
  data() {
    return {
      chartKey: 0,
      idCoach: "",
      selectedTimeRange: "month",
      selectedMonth: 0,
      selectedYear: 0,
      isLoading: true,
      listCourse: [],
      listOrder: [],
      dataChart: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Revenue",
            backgroundColor: "black",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
    };
  },
  optionsChart: {
    responsive: true,
    maintainAspectRatio: false,
  },
  methods: {
    async getData() {
      try {
        const loader = this.$loading.show({ color: "yellow" });
        const coachId = this.$store.state.auth.user.coach._id;
        this.idCoach = coachId;
        const courseList = await CourseService.getbyCoachId(coachId);
        const orderList = await OrderService.getByCoachId(coachId);
        const revenueList = await OrderService.getByRevenueByMonth(
          2023,
          coachId
        );
        console.log(revenueList);
        this.dataChart.datasets[0].data = [...revenueList];
        this.listCourse = courseList;
        this.listOrder = orderList;
        console.log(this.listOrder.length);
        this.isLoading = false;
        loader.hide();
      } catch (error) {
        console.log(error);
      }
    },
    async handleChange() {
      const loader = this.$loading.show({ color: "yellow" });
      if (this.selectedTimeRange == "day") {
        const data = await OrderService.getByRevenueByDay(
          this.selectedMonth,
          this.selectedYear,
          this.idCoach
        );
        const newLabels = new Array(data.length);
        const newData = new Array(data.length);

        for (let index = 0; index < data.length; index++) {
          newLabels[index] = `Day ${index + 1}`;
          newData[index] = data[index];
        }
        this.dataChart.labels = newLabels;
        this.dataChart.datasets[0].data = newData;
      } else if (this.selectedTimeRange == "month") {
        const data = await OrderService.getByRevenueByMonth(
          this.selectedYear,
          this.idCoach
        );
        this.dataChart.labels = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const newData = new Array(data.length);
        for (let index = 0; index < data.length; index++) {
          newData[index] = data[index];
        }
        this.dataChart.datasets[0].data = newData;
      } else {
        const data = await OrderService.getByRevenueByYear(this.idCoach);
        const newData = new Array(data.length);
        for (let index = 0; index < data.length; index++) {
          newData[index] = data[index];
        }
        this.dataChart.datasets[0].data = newData;
        this.dataChart.labels = ["2023"];
      }
      this.chartKey++;
      loader.hide();
    },
  },
  computed: {
    numCourseSold() {
      return this.listCourse.reduce((acc, course) => acc + course.sold, 0);
    },
    numCustomerPurchase() {
      const arrCustomer = [];
      arrCustomer.push(this.listOrder[0].customer_id._id);
      for (let index = 1; index < this.listOrder.length; index++) {
        if (!arrCustomer.includes(this.listOrder[index].customer_id._id)) {
          console.log("oke");
          arrCustomer.push(this.listOrder[index].customer_id._id);
        }
      }
      console.log(arrCustomer.length);
      return arrCustomer.length;
    },
    totalRevenue() {
      return this.listOrder.reduce((acc, cur) => acc + cur.total_price, 0);
    },
  },
  async mounted() {
    await this.getData();
  },
};
</script>

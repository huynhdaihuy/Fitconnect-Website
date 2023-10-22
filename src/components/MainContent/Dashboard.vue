<template>
  <div class="chart-static ">
    <div class="square-element">
      <div class="title">
        <i class="fas fa-chart-line"></i>
        Sales
      </div>
      <div class="value" style="color: var(--color-price)">$99.99</div>
    </div>
    <div class="square-element">
      <div class="title">
        <i class="fas fa-book"></i>
        Course
      </div>
      <div class="value" style="color: #8ce5f8">30</div>
    </div>
    <div class="square-element">
      <div class="title">
        <i class="fas fa-user"></i>
        Customer
      </div>
      <div class="value" style="color: #e88e8e">9</div>
    </div>
    <div class="square-element">
      <div class="title">
        <i class="fas fa-shopping-cart"></i>
        Sold Course
      </div>
      <div class="value" style="color: #f7d05e">10</div>
    </div>
  </div>
  <div class="chart-container">
    <Bar :data="dataChart" :options="optionsChart" />
  </div>
</template>

<style scoped>
.chart-static {
  height: 200px;
  padding: 20px;
  margin: 0 60px;
  background-color: var(--color-drawer_item);
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
  },
  data() {
    return {
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
            backgroundColor: "#55586B",
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
};
</script>

<template>
    <bar-chart :data="chartData"></bar-chart>
  </template>
  
  <script>
  import { Bar  } from 'vue-chartjs';
  
  export default {
    extends: Bar,
    props: {
      chartData: {
        type: Object,
        required: true,
      },
      chartOptions: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      this.renderChart(this.chartData, this.chartOptions);
    },
  };
  </script>
  
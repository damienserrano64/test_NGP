<template>
  <div class="draggable">
    <div class="dragger"></div>
    <canvas id="price-chart" height="150" weight="100"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";

export default {
  props: [
    "chartdate", 
    "chartprice"
  ],
  mounted() {
    new Chart(document.getElementById("price-chart"), {
      type: "line",
      data: {
        labels: this.chartdate,
        datasets: [
          {
            label: "2019 BTC price",
            data: this.chartprice,
            borderColor: "#27367A",
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: "top",
        },
        hover: {
          mode: "label",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                min: 2000,
                max: 14000,
                stepSize: 3000,
              },
            },
          ],
        },
      },
    });
  },
};
</script>
<style>
.draggable {
  width: 600px;
  height: 310px;
  background: white;
  position: relative;
  z-index: 1;
}

.draggable.dragging {
  user-select: none;
}

.dragger {
  height: 30px;
  background: white;
  border-style: solid;
  border-color: #27367a;
}

.dragger::before {
  content: "Drag me";
  color: #27367a;
  background-color: white;
  display: inline-block;
}
</style>
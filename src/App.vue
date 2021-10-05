<template>
  <v-app>
    <v-main>
      <div class="draggable">
        <div class="dragger"></div>
        <canvas id="price-chart" height="150" weight="100"> </canvas>
      </div>
      <v-card>
        <v-card-title class="vcardtitle">
          Bitcoin Price
          <v-spacer></v-spacer>
          <v-text-field class="vtextfield"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          id="data-table"
          :headers="headers"
          :items="datas"
          :search="search"
          :footer-props="{
            'items-per-page-options': [10, 20, 30, 40, 50, -1],
          }"
        ></v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
import Chart from "chart.js";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Date", value: "date" },
        { text: "Price", value: "price" },
      ],
      datas: [],
    };
  },
  mounted() {
    axios
      .get(
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31"
      )
      .then((response) => {
        let dataTab = Object.entries(response.data.bpi);
        let dateTab = [];
        let priceTab = [];
        let dataObj = [];
        for (let i = 0; i < dataTab.length; i++) {
          dateTab[i] = dataTab[i][0];
          priceTab[i] = dataTab[i][1];
        }
        for (let i = 0; i < dataTab.length; i++) {
          //The object will be {date: '2019-01-01' , price: 3869.47}
          //I wanted to do that instead of using the API object because the objects that i recover from the API were like this {'2019-01-01' : 3869.47}
          //And i needed static keys (here, date: and price: ) to display the object on the data table
          const data = { date: dateTab[i], price: priceTab[i] };
          dataObj[i] = data;
        }
        //Put all the objects in the data table
        this.datas = dataObj;
        //Create the Chart
        new Chart(document.getElementById("price-chart"), {
          type: "line",
          data: {
            labels: dateTab,
            datasets: [
              {
                label: "2019 BTC price",
                data: priceTab,
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
      })
      .catch((error) => {
        console.log(error);
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
  border-color: #27367A;
}

.dragger::before {
  content: "Drag me";

  color: #27367A;
  background-color: white;
  display: inline-block;
}
.vcardtitle{
  color: #27367A;
}

element.style {
  color: #27367A;
}
</style>
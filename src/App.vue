<template>
<v-app>
  <v-main>
  <div>
    <my-chart v-if="dateTab !== []" :chartdate="dateTab" :chartprice="priceTab"></my-chart>
    <my-data-table :dataTabledata="dataObj"></my-data-table>
  </div>
  </v-main>
</v-app>
</template>
<script>
import axios from "axios";
import myDataTable from './components/mydataTable.vue';
import myChart from './components/mychart.vue'

export default {
  data(){
    return {
      dateTab: [],
      priceTab: [],
      dataObj: [],
    }
  },
  components:  {
    'my-chart' : myChart,
    'my-data-table' : myDataTable
  },
  mounted() {
    axios
      .get(
        "https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2019-12-31"
      )
      .then((response) => {
        let ax_dataTab = Object.entries(response.data.bpi);
        let ax_dateTab = [];
        let ax_priceTab = [];
        let ax_dataObj = [];
        for (let i = 0; i < ax_dataTab.length; i++) {
          ax_dateTab[i] = ax_dataTab[i][0];
          ax_priceTab[i] = ax_dataTab[i][1];
        }
        for (let i = 0; i < ax_dataTab.length; i++) {
          //The object will be {date: '2019-01-01' , price: 3869.47}
          //I wanted to do that instead of using the API object because the objects that i recover from the API were like this {'2019-01-01' : 3869.47}
          //And i needed static keys (here, date: and price: ) to display the object on the data table
          const data = { date: ax_dateTab[i], price: ax_priceTab[i] };
          ax_dataObj[i] = data;
        }
        //Put all the datas in the return values
        this.dataObj = ax_dataObj;
        this.dateTab = ax_dateTab;
        this.priceTab = ax_priceTab;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
</script>
<style>

</style>
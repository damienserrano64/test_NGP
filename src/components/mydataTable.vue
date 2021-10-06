<template>
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
</template>
<script>

export default {  
  props: [
      'dataTabledata' 
  ],
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
  mounted(){
      this.datas = this.dataTabledata;
    }   
};
</script>
<style>
.vcardtitle{
  color: #27367A;
}

element.style {
  color: #27367A;
}
</style>
<template>
  <div class="hello">
    <h1>{{ text }}</h1>
    <button @click="textChange">text change</button>
    <sample-component name="prop_name"></sample-component>
  </div>
</template>

<script>
import sampleComponent from "@/components/sampleComponent";
export default {
  name: 'mainView',
  components: {
    sampleComponent
  },
  data: function (){
    return {
      text: "hello world",
      prop_update: "prop_update",
      prop_name: ' prop_name'
    }
  },
  // created() {
  // },
  // mounted: function (){
  // },
  methods: {
    textChange(){
      this.text = "good new world";
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

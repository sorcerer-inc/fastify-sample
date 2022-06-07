<template>
  <div class="hello">
    <h1>{{ text }}</h1>
    <button @click="textInsert">update</button>
    <sample-component name="prop_name"></sample-component>
    <button @click="get">Api get method</button>
    <div>
      {{result}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import axios from "axios";
import sampleComponent from '../components/sampleComponent.vue'
const API_URL = process.env.VUE_APP_API_URL;

interface main {
  text: string,
  result: any
}

export default defineComponent({
  components: {
    sampleComponent
  },
  data() {
    return {
      text: 'hello',
      result: []
    } as main
  },
  created() {
  },
  methods: {
    async get(){
      const apiResult = await axios.get(`${API_URL}/`);
      this.result = apiResult.data;
    },
    textInsert(){
      this.text = 'hello world';
    }
  }
})
</script>

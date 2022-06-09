<template>
  <div class="hello">
    <h1>{{ text }}</h1>
    <div class="columns">
      <div class="column">
        First column
      </div>
      <div class="column">
        Second column
      </div>
      <div class="column">
        <button class="button is-link" @click="textInsert">update</button>
        <sample-component name="prop_name"></sample-component>
        <button class="button is-primary" @click="get">Api get method</button>
        <div>
          {{result}}
        </div>
      </div>
      <div class="column">
        Fourth column
      </div>
      <div class="column">
        Fifth column
      </div>
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

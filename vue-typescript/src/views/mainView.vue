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
        <button class="button is-link" @click="textInsert">main update</button>
        <sample-component :name="text"></sample-component>
        <button class="button is-primary" @click="get">Api get method</button>
        <div>
          {{result}}
        </div>
      </div>
      <div class="column">
        Composition API
        <div>
          <div>{{ counterState.count }}</div>
          <button class="button is-small mr-1" @click="add">+</button>
          <button class="button is-small" @click="sub">-</button>
        </div>
      </div>
      <div class="column">
        Fifth column
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, provide} from "vue";
import Counter from "../utils/counter";
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
  setup(){
    //mainModal 孫コンポーネントへの継承
    provide('location', 'North Pole');
    const {counterState, add, sub} = Counter();
    return{
      counterState,
      add,
      sub,
    }
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

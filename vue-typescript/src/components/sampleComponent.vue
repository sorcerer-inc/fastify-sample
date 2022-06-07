<template>
  <div>
    <h2>{{text}}</h2>
    <p>{{name}}</p>
    <p>{{count}}</p>
    <button @click="add">add</button>
    <button @click="sub">sub</button>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";

interface sample {
  text: string,
  count: number
}

export default defineComponent ({
  components:{},
  data() {
    return {
      text: '',
      count: 0
    } as sample
  },
  props: { //props内の型は先頭大文字
    name: String
  },
  created: function () {
    this.text = 'type check';
  },
  methods: {
    add(){
      this.count += 1;
    },
    sub(){
      this.count -= 1;
    }
  },
})
</script>

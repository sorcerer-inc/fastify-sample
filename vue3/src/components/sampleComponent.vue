<template>
  <div>
    <h2>{{text}}</h2>
    <p>{{name}}</p>
    <p>{{count}}</p>
    <button @click="add">add</button>
    <button @click="sub">sub</button>
  </div>
</template>

<script>
  export default {
    components: {},
    data: () => {
      return {
        text: '',
        count: 0
      }
    },
    props: ['name'],
    created() {
      this.text = "create update";
    },
    methods: {
      add(){
        this.count += 1;
      },
      sub(){
        this.count -= 1;
      }
    },
    computed: {
    },
  }
</script>

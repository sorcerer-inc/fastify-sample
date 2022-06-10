<template>
  <div class="my-3">
    <p>{{name}}</p>
    <h2>{{text}}</h2>
    <p>{{count}}</p>
    <button class="button is-info is-small" @click="add">add</button>
    <button class="button is-danger is-small" @click="sub">sub</button>
    <div class="mt-3">
      <button class="button" @click="modalOpen">modal Open</button>
    </div>

    <main-modal :is-active="isModal" text="sample Modal" @click-close="modalClose"></main-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import mainModal from "@/components/modals/mainModal.vue";

interface sample {
  text: string,
  count: number,
  isModal: boolean
}

export default defineComponent ({
  components:{
    mainModal
  },
  data() {
    return {
      text: '',
      count: 0,
      isModal: false
    } as sample
  },
  props: { //props内の型は先頭大文字
    name: String
  },
  created: function () {
    this.text = 'created insert';
  },
  methods: {
    modalOpen(){
      this.isModal = true;
    },
    modalClose(){
      this.isModal = false;
    },
    add(){
      this.count += 1;
    },
    sub(){
      this.count -= 1;
    }
  },
})
</script>

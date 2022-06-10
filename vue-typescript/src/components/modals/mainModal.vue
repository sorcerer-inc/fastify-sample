<template>
  <div class="modal" :class="{'is-active' : isActive}">
    <div class="modal-background" @click="modalClose"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button class="delete" aria-label="close" @click="modalClose"></button>
      </header>
      <section class="modal-card-body">
        {{text}}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button" @click="modalClose">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from "vue";

export default defineComponent ({
  props: {
    isActive: Boolean,
    text: String,
  },
  methods: {
    modalClose(){
      this.$emit('click-close');
    }
  }
})
</script>

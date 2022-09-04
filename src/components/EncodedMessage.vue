
<template>
  <div class="white">
    <h1>Encoded message:</h1>
  
    <ul style="padding-left: 0;">
      <li
        v-for="(section, i) in encodedString"
        :key="i"
        class="horizontal-list"
      >
        {{ section }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    props: {
      encodedString: Array
    }
  })
</script>

<style scoped>
  .horizontal-list {
    display: inline;
    padding: 5px;
  }
</style>
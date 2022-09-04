<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1 class="green">Welcome!</h1>
      <h3 class="white">Type up your message to encode.</h3>
      <InputForm
        @start-loading="startLoading"
        @stop-loading="stopLoading"
        @show-error="showError"
        @hide-error="hideError"
        @encode-input-string="encodeInputString"
      />
    </div>
  </header>

  <main>
    <div v-if="loading" class="loader"></div>
    <div v-else-if="error" class="error">
      <h3>Error!</h3>
      String is too long. Try with a shorter one (it shouldn't have more than 64 characters, counting only alphanumeric ones).
    </div>
    <EncodedMessage v-else :encodedString="encodedString"/>
  </main>
</template>

<script lang="ts">
  import InputForm from "./components/InputForm.vue";
  import EncodedMessage from "./components/EncodedMessage.vue";
  import { defineComponent } from "vue";

  export default defineComponent({

    components: {
      InputForm,
      EncodedMessage
    },

    data() {
      return {
        encodedString: [""],
        loading: false,
        error: false
      }
    },

    methods: {
      encodeInputString(encodedString: string[]) {
        this.encodedString = encodedString;
      },

      startLoading() {
        this.loading = true;
      },

      stopLoading() {
        this.loading = false;
      },

      showError() {
        this.error = true;
      },

      hideError() {
        this.error = false;
      }
    }
  }) 
</script>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }

  .loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    top: -10px;
  }

  h3 {
    font-size: 1.2rem;
  }
</style>

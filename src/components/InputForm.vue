<template>
  <div>
    <input
      v-model="inputString"
      type="text"
      class="input-string-style"
    /><br>
    <button
      @click="encodeInputString"
      :disabled="loading"
      class="button-style"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({

    data() {
      return {
        inputString: "",
        encodedString: [""],
        loading: false
      }
    },

    methods: {
      encodeInputString() {

        this.loading = true;
        this.$emit("startLoading");
        this.$emit("hideError");
        
        // Sometimes, when running npx vitest --coverage, the line percentage in this component is lower than expected (about 60%) because it doesn't count
        // the lines inside the setTimeout, which also include the shuffleString function. When this happens, removing the setTimeout results in the function
        // being included in the coverage. Here, I made the UX decision to keep the setTimeout, which serves as a simulation for the behavior of an asynchronous
        // call to a possible external service (backend) that provides the functionality to encode messages. At any rate, the test for this component
        // does indeed run the function, as it correctly checks the result of the encodedString array against the expected one.

        // Other times, everything is included and the coverage is, as it should, 100%. Unfortunately, I can't find the pattern that makes this happen,
        // so I thought it best to leave this comment explaining the situation, in case it should happen to someone else.

        setTimeout(() => {
          let normalizedString = this.inputString.replace(/[^a-z0-9]/gi, "").toLowerCase();

          if (normalizedString.length > 64) {
            this.$emit("showError");
            this.loading = false;
          }
          
          else {

            let rows = 0;
            let squareRoot = Math.sqrt(normalizedString.length);

            rows = squareRoot % 1 == 0 ? squareRoot : squareRoot - (squareRoot % 1) + 1;

            let stringInRows = this.shuffleString(normalizedString, rows, rows, true);
            this.encodedString = this.shuffleString(stringInRows, 1, stringInRows.length, false);
            
            this.$emit("encodeInputString", this.encodedString);
            this.loading = false;
          }

          this.$emit("stopLoading");
        }, 300);
      },

      // complexity: O(array.length / period) * O(innerLength))
      // In this case, array.length <= normalizedString.length <= 64, so array.length / period <= 64 too, since period is at least 1. innerLength is at most the value of rows,
      // which is sqrt(normalizedString.length), so innerLength <= 8. Finally, O(array.length / period) * O(length)) => O(64) * O(8) => O(1).

      shuffleString(array: string | string[], period: number, innerLength: number, firstShuffle: boolean) {

        let shuffledString = [];
        let tempString = "";

        for (let i = 0; i < array.length; i += period) {
          for (let j = 0; j < innerLength; j++) {
            if (firstShuffle) {
              tempString += array[i + j] ? array[i + j]  : "";
            } else {
              tempString += array[j][i] ? array[j][i] : " ";
            }
            if (j == innerLength - 1) {
              shuffledString.push(tempString);
              tempString = "";
            }
          }
        }

        return shuffledString;
      }
    }
  })
</script>

<style scoped>
  .input-string-style {
    padding: 7px;
    margin: 10px 0;
  }

  .button-style {
    width: 90px;
    padding: 5px;
  }
</style>
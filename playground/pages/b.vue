<script lang="ts">
export default {
  async asyncData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos')
    return {
      response: await data.json(),
    }
  },
  data() {
    return {
      response: null,
    }
  },
}
</script>

<template>
  <div>
    bbb
    <div id="response">
      {{ response }}
    </div>
  </div>
</template>

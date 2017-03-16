<template lang="html">
  <div class="">
    <h1>User detail for {{ id }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="css">
</style>

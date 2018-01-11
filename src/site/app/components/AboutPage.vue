<template>
  <div>I am {{ where }}!</div>
</template>

<script>
  import auth from './auth'

  export default {
    data () {
      return {
        where: 'about page'
      }
    }
  }
</script>


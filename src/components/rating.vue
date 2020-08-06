<template>
    <span>
       <b>&#9733;</b> {{ rating ? rating : 0 }}
    </span>
</template>
<script>
export default {
  name: 'rating',
  props: {
    rating: {
      type: Number,
      default: 0
    }
  }
}
</script>

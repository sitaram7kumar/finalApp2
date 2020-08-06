<template>
  <section class="card">
    <AllShows
      :selected-genre="selectedGenre"
      :search-string="searchString"
    />
  </section>
</template>

<script>
import AllShows from '@/components/all-shows.vue'
import eventBus from '@/event-bus'

export default {
  name: 'home',
  components: {
    AllShows
  },
  data: () => {
    return {
      searchString: null,
      selectedGenre: ''
    }
  },
  created () {
    eventBus.$on('change-input', data => {
      this.changeInput(data)
    })
  },
  methods: {
    changeInput ({ searchString, selectedGenre }) {
      this.searchString = searchString
      this.selectedGenre = selectedGenre
    }
  }
}
</script>

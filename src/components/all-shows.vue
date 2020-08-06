<template>
  <span>
    <p v-if="error" class="error">{{error}}</p>
    <div class="gallery-box" v-if="!isFetching && filteredShows.length">
      <Show v-for="show in filteredShows" :details="show" :key="show.id" />
    </div>
    <p v-else-if="!isFetching && filteredShows.length === 0" class="error">{{content.noRecordsMsg}}</p>
    <p v-else-if="isFetching" class="error">{{content.loadingMsg}}</p>
  </span>
</template>

<script>
import Show from '@/components/show.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'all-shows',
  components: { Show },
  data: () => {
    return {
      content: {
        loadingMsg: 'Loading...',
        noRecordsMsg: 'No records found.'
      }
    }
  },
  computed: {
    ...mapState(['tvShows', 'isFetching', 'error']),
    filteredShows () {
      return this.tvShows.filter(s => !this.selectedGenre.length || s.genres.find(g => g === this.selectedGenre))
    }
  },
  watch: {
    searchString (v) {
      v.trim().length ? this.SEARCH_TV_SHOWS(v) : this.LOAD_TV_SHOWS()
    }
  },
  methods: {
    ...mapActions(['LOAD_TV_SHOWS', 'SEARCH_TV_SHOWS'])
  },
  mounted () {
    if (!this.tvShows.length) {
      this.LOAD_TV_SHOWS()
    }
  },
  props: {
    selectedGenre: {
      type: String,
      default: ''
    },
    searchString: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
  .gallery-box {
      display: flex;
      flex-flow: wrap;
      align-items: center;
      justify-content: center;
      padding: 2%;
  }
</style>

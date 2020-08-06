<template>
    <span class="search-bar">
        <input
            type="text"
            class="search-input"
            :placeholder="inputAttr.placeHolder"
            :title="inputAttr.title"
            @input="changeInput()"
            v-model="inputValue"
        />
        <select class="search-input" v-model="selectedGenre" @change="emitChangeInput()" v-if="$store.getters.allGenre.length && $route.path === '/'">
            <option selected value="">{{ selectAttr.firstOption }}</option>
            <option v-for="genre in $store.getters.allGenre" :value="genre" :key="genre">{{genre}}</option>
        </select>
    </span>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import eventBus from '@/event-bus'

export default {
  name: 'search-bar',
  data: () => {
    return {
      inputAttr: {
        placeHolder: 'Search for tv shows..',
        title: 'Type in a name and hit Enter'
      },
      selectAttr: {
        firstOption: 'All Genres'
      },
      inputValue: '',
      selectedGenre: ''
    }
  },
  computed: {
    ...mapGetters(['allGenre']),
    ...mapState(['searchString'])
  },
  methods: {
    changeInput () {
      this.selectedGenre = ''
      this.emitChangeInput()
    },
    emitChangeInput () {
      eventBus.$emit('change-input', { searchString: this.inputValue, selectedGenre: this.selectedGenre })
    }
  },
  mounted () {
    this.inputValue = this.searchString
  }
}
</script>
<style lang="less" scoped>
    .search-bar {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      flex-grow: 0.5;
      @media (max-width: 485px) {
        flex-flow: column;;
      }
      .search-input {
        display: block;
        width: 30%;
        height: 20px;
        padding: 6px 12px;
        font-size: 14px;
        color: #555;
        border: 1px solid #ccc;
        border-radius: 4px;
        @media (max-width: 485px) {
           width: 50%;
            margin-bottom: 2%;
        }
        &:focus {
          border-color: #66afe9;
          outline: 0;
          -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
        }
      }
      select.search-input {
        margin-left: 2%;
        height: 34px;
        width: calc(30% + 24px);
        @media (min-width: 769px) {
          width: 20%;
          margin-left: 2%;
        }
        @media (max-width: 485px) {
          width: calc(50% + 25px);
          margin-left: 0px;
        }
      }
    }
</style>

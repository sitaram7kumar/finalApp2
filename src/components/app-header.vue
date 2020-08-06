<template>
    <header id="nav">
      <router-link :to="'/'">{{ $route.path !== '/' ? '&#8592;' : null }} {{navLink.name}}</router-link>
      <SearchBar />
    </header>
</template>
<script>
import SearchBar from '@/components/search-bar.vue'
export default {
  name: 'app-header',
  components: { SearchBar },
  data: () => {
    return {
      navLink: {
        name: 'Home'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #nav {
    padding: 20px;
    display: flex;
    background: #eee;
    position: fixed;
    width: 100%;
    a {
      font-weight: bold;
      margin: auto;
    }
    .router-link-exact-active {
      color: #42b983;
    }
  }
</style>

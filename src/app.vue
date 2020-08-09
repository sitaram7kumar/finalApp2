<template>
  <div id="main-container">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="less">
  body {
    margin: 0px;
    #main-container {
      color: #999;
      text-align: center;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      a {
        color: #0573be;
        text-decoration: none;
      }
      .card {
        margin: auto;
        max-width: 100%;
        padding: 84px 3%;
        min-height: 300px;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        @media (max-width: 485px) {
          padding-top: 120px;
        }
      }
    }
  }
</style>

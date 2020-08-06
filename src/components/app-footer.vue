<template>
    <footer>
        &copy; {{content.copyrightMsg}}
    </footer>
</template>

<script>
export default {
  data: () => {
    return {
      content: {
        copyrightMsg: 'Copyright 2020, All Rights Reserved'
      }
    }
  }
}
</script>

<style lang="less" scoped>
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 10px;
        font-size: 10px;
        background: #eee;
    }
</style>

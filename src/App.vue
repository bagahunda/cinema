<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
html
  box-sizing border-box

*, *:after, *:before
  box-sizing inherit

body
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

.container
  width 100%
  max-width 1000px
  margin 0 auto
</style>

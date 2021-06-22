<template>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: "DMSans-Regular";
  src: local("DMSans-Regular"), url("../public/fonts/DMSans-Regular.ttf") format("truetype");
}

#app {
  font-family: DMSans-Regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1024px;
  margin: auto;
}
</style>

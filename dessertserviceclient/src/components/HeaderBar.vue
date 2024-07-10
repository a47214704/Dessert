<template>
  <div class="px-5 md:h-24 h-12 bg-sky-100 flex justify-between items-center shadow">
    <div class="flex justify-between w-full items-center">
      <div class="">
        <span class="md:text-3xl text-xl font-black font-serif">Just Dessert</span>
      </div>
      <nav>
        <router-link to="/Home">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/product">Product</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

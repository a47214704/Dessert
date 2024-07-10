<template>
  <div class="home">
    <HeaderBar></HeaderBar>
    {{ product }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
let product = ref('Home page')
</script>

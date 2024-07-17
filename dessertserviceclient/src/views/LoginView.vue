<template>
  <div class="h-screen flex justify-center items-center px-4">
    <div class="bg-white px-4 py-6 rounded-md shadow">
      <div class="">
        <span class="font-black text-2xl ">登入後台</span><br>
        <span class="font-blod text-sm text-gray-400">歡迎使用Just Dessert後台系統</span>
      </div>
      <div class="grid grid-cols-2 gap-2 gap-y-4 gap-x-0 mt-6">
        <label class="text-center font-bold ">UserName</label>
        <input type="text" class="px-2 rounded border-2 border-slate-500" placeholder="請輸入使用者" v-model="userRequest.name">
        <label class=" text-center font-bold">Password:</label>
        <input type="password" class="px-2 rounded border-2 border-slate-500" placeholder="請輸入密碼" v-model="userRequest.password">
      </div>
      <button class="mt-8 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-500" @click="doLogin()" >登入</button>
      <p class=" text-red-600">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/apis/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let userRequest = ref({
  name: '',
  password: ''
});
let errorMessage = ref('');

async function doLogin() {
  errorMessage.value = '';
  
  let res = await login(userRequest.value);
  console.log(res);
  if (res.errorMessage == "success") {
    localStorage.setItem('jwtToken', `Bearer ${res.result.jwtToken}`);
    router.push({ path: 'home' });
  } else {
    userRequest.value.name = '';
    userRequest.value.password = '';
    errorMessage.value = res.errorMessage;
  }
}
</script>
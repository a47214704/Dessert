<template>
  <div class="home">
    <HeaderBar></HeaderBar>
    <div class="flex justify-center w-full p-5 overflow-x-auto">
      <table class="rounded-lg min-w-full bg-white border border-gray-200">
        <thead class="">
          <tr class="bg-gray-400 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6 ">Password</th>
            <th class="py-3 px-6 ">email</th>
            <th class="py-3 px-6 ">category</th>
            <th class="py-3 px-6 ">Action</th>
          </tr>
        </thead>
        <tbody class=" text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 bg-gray-600">
            <td><input class="px-2 text-right rounded-sm" v-model="newUser.name"></td>
            <td><input type="password" class="px-2 text-right rounded-sm" v-model="newUser.password"></td>
            <td><input class="px-2 text-right rounded-sm" v-model="newUser.email"></td>
            <td><input class="px-2 text-right rounded-sm" v-model.number="newUser.category"></td>
            <td>
              <button class=" bg-sky-800 text-white rounded hover:bg-sky-600 py-1 px-3 text-sm my-2 mr-2" @click="doAdd()">Add</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-100" v-for="(user, index) in users" :key="index">
            <td class="py-3 px-6">{{ user.name }}</td>
            <td class="py-3 px-6"></td>
            <td class="py-3 px-6 "><input class="px-2 text-right rounded-sm" v-model="user.email"></td>
            <td class="py-3 px-6"><input class="px-2 text-right rounded-sm" v-model.number="user.category"></td>
            <td class="">
              <button class=" bg-sky-800 text-white rounded hover:bg-sky-600 py-1 px-3 text-sm my-2 mr-2" @click="doEdit(index)">Edit</button>
              <button class=" bg-red-800 text-white rounded hover:bg-red-600 py-1 px-3 text-sm my-2" @click="doDelete(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import HeaderBar from '@/components/HeaderBar.vue';
import { addUser, deleteUser, editUser, getUserList } from '@/apis/user';

let users = ref([]);
let newUser = ref({
  name: '',
  password: '',
  email: '',
  category: ''
});


async function getListUsers() {
  const res = await getUserList();
  if (res.errorMessage == "success") {
    users.value = res.result;
  }
}

async function doEdit(index) {
  const user = users.value[index];
  const res = await editUser(user.id, user);
  if (res.errorMessage == "success") {
    users.value[index] = res.result;
  }
}

async function doDelete(user) {
  const res = await deleteUser(user.id);
  if (res.errorMessage == "success") {
    getListUsers();
  }
}

async function doAdd() {
  const res = await addUser(newUser.value);
  if (res.errorMessage == "success") {
    getListUsers();
    newUser.value = {
      name: '',
      description: '',
      status: 0,
      inventory: 0
    }
  }
}

onMounted(() => {
  getListUsers();
});
</script>

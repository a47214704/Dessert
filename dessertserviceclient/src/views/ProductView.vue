<template>
  <div class="product">
    <HeaderBar></HeaderBar>
    <div class="flex justify-center w-full p-5 overflow-x-auto">
      <table class="rounded-lg min-w-full bg-white border border-gray-200">
        <thead class="">
          <tr class="bg-gray-400 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6 ">Description</th>
            <th class="py-3 px-6 ">Status</th>
            <th class="py-3 px-6 ">Inventory</th>
            <th class="py-3 px-6 ">Action</th>
          </tr>
        </thead>
        <tbody class=" text-gray-600 text-sm font-light">
          <tr class="border-b border-gray-200 bg-gray-600">
            <td><input class="px-2 text-right rounded-sm" v-model.number="newProduct.name"></td>
            <td><input class="px-2 text-right rounded-sm" v-model.number="newProduct.description"></td>
            <td><input class="px-2 text-right rounded-sm" v-model.number="newProduct.status"></td>
            <td><input class="px-2 text-right rounded-sm" v-model="newProduct.inventory"></td>
            <td>
              <button class=" bg-sky-800 text-white rounded hover:bg-sky-600 py-1 px-3 text-sm my-2 mr-2" @click="doAdd()">Add</button>
            </td>
          </tr>
          <tr class="border-b border-gray-200 hover:bg-gray-100" v-for="(product, index) in products" :key="index">
            <td class="py-3 px-6">{{ product.name }}</td>
            <td class="py-3 px-6 "><input class="px-2 text-right rounded-sm" v-model="product.description"></td>
            <td class="py-3 px-6"><input class="px-2 text-right rounded-sm" v-model.number="product.status"></td>
            <td class="py-3 px-6"><input class="px-2 text-right rounded-sm" v-model="product.inventory"></td>
            <td class="">
              <button class=" bg-sky-800 text-white rounded hover:bg-sky-600 py-1 px-3 text-sm my-2 mr-2" @click="doEdit(index)">Edit</button>
              <button class=" bg-red-800 text-white rounded hover:bg-red-600 py-1 px-3 text-sm my-2" @click="doDelete(product)">Delete</button>
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
import { addProduct, deleteProduct, editProduct, getProductList } from '@/apis/product';

let products = ref([]);
let newProduct = ref({
  name: '',
  description: '',
  status: 0
});

async function getProducts() {
  const res = await getProductList();
  if (res.errorMessage == "success") {
    products.value = res.result;
  }
}

async function doEdit(index) {
  const product = products.value[index];
  const res = await editProduct(product.id, product);
  if (res.errorMessage == "success") {
    products.value[index] = res.result;
  }
}

async function doDelete(product) {
  const res = await deleteProduct(product.id);
  if (res.errorMessage == "success") {
    getProducts();
  }
}

async function doAdd() {
  const res = await addProduct(newProduct.value);
  if (res.errorMessage == "success") {
    getProducts();
    newProduct.value = {
      name: '',
      description: '',
      status: 0,
      inventory: 0
    }
  }
}

onMounted(() =>{
  getProducts();
})
</script>
import http from '@/http/axios';

export async function getProduct(id) {
    const res = await http.get(`/api/Products/${id}`);
    return res.data;
}

export async function getProductList() {
    const res = await http.get(`/api/Products`);
    return res.data;
}

export async function editProduct(id, product) {
    const res = await http.put(`/api/Products/${id}`, product);
    return res.data;
}

export async function addProduct(product) {
    const res = await http.post(`/api/Products`, product);
    return res.data;
}

export async function deleteProduct(id) {
    const res = await http.delete(`/api/Products/${id}`);
    return res.data;
}

export async function uploadFile(id, data) {
    const res = await http.uploadFile(`/api/Products/${id}/UploadFile`, data);
    return res.data;
}
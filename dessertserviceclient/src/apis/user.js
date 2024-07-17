import http from '@/http/axios';

export async function getUser(id) {
    const res = await http.get(`/api/Users/${id}`);
    return res.data;
}

export async function getUserList() {
    const res = await http.get(`/api/Users`);
    return res.data;
}

export async function editUserList(id, user) {
    const res = await http.post(`/api/Users/${id}`, user);
    return res.data;
}

export async function addUserList(user) {
    const res = await http.post(`/api/Users`, user);
    return res.data;
}

export async function deleteUser(id) {
    const res = await http.delete(`/api/Users/${id}`);
    return res.data;
}

export async function login(user) {
    const res = await http.post(`/api/Users/login`, user);
    return res.data;
}
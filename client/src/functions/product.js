import axios from 'axios'


export const remove = async (id) =>
    await axios.delete('http://localhost:5000/api/product/' + id)

export const create = async (data) =>
    await axios.post('http://localhost:5000/api/product', data)
    
export const getdata = async () => {
    return await axios.get('http://localhost:5000/api/product')
}
export const read = async (id) => {
    return await axios.get('http://localhost:5000/api/product/' + id)
}
export const update = async (id, data) => {
    return await axios.put('http://localhost:5000/api/product/' + id, data)
}
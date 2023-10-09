import { configureStore, createSlice } from '@reduxjs/toolkit'

let movies = createSlice({
    name: 'movies',
    initialState: [
        {},
    ],
    reducers: {
        getInfo(state, info) {
            let movie = {id: info.payload.id, title: info.payload.title, count: 1};
            let item = state.find(obj => obj.id === info.payload.id);
            if(item) {
                item.count += 1;
            }else{
                state.push(movie);
            };
        },
        addCount(state, info) {
            state.forEach(item => {
                if(String(item.id) === info.payload) {
                    item.count += 1;
                }
            })
        },
        minusCount(state, info) {
            state.forEach(item => {
                if(item.count > 1 && String(item.id) === info.payload) {
                    item.count -= 1;
                }else if(item.count < 1 && String(item.id) === info.payload){
                    item.count = 1;
                }
            })
        },
        deleteItem(state, info) {
            let a = {id : info.payload.id, title : info.payload.title, count : 1};
            let item = state.find(obj => obj.id === info.payload.id);
            if(item) {
                state.splice(a, 1);
            }
        }
    }
})

export let {getInfo, addCount, minusCount, deleteItem} = movies.actions

export default configureStore({
    reducer: {
        movies: movies.reducer,
    }
})
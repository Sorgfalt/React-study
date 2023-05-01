import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
	name : 'user',
	initialState : {accessToken : '', refreshToken : ''},
	reducers : {
		addAccessToken(state, action){
			state.push(action.push)
		},
		addRefreshToken(state, action){
			state.push(action.push)
		}
	}
})

export let {addAccessToken, addRefreshToken} =  user.actions

export default configureStore({
  reducer: { 
		user : user.reducer,
	}
}) 
import axios from 'axios';

export const tokenRefresh = async (accessToken, refreshToken) => {

    const refresh = await axios(`http://phone.pinodev.shop:8000/api/user/token`, {
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization: `Bearer ${accessToken}`,
            Refresh:refreshToken,
        }
    }).then((res) => {
        console.log('res.data', res.data);
        return res.data;
    }).catch((error) => {
        console.log('Token refresh error', error.message);
        return error;
    }) 
    return refresh;
}

export const setInterceptor = (token) => {

	if (!token) return false
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

	return true

}
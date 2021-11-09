export default function useFetch() {
	const baseFetch = async (path, method = 'GET') => {
		const response = await  fetch(process.env.VUE_APP_FB_URL + path, { type: method })
		const data = await response.json()
		return data
	}

	return { baseFetch }
}

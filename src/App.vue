<template>
	<TheHeaderVue></TheHeaderVue>
	
	<main>
		<router-view />
	</main>
</template>

<script>
import TheHeaderVue from "./components/TheHeader.vue"

export default {
	setup() {
		// const checkHosting = async () => {
		// 	const response = await fetch('https://radikal.ru', { type: 'POST', mode: 'cors' })
		// 	console.log(response);
		// 	if (response.status !== 200) {
		// 		alert('Сервис временно недоступен, зайдите позже')
		// 	} 
		// }

		// checkHosting()
	},
	components: { TheHeaderVue }
}
</script>

<style lang="scss" src="@/assets/styles/main.scss"></style>

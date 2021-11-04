<template>
	<div class="share">
		<a
			v-for="link in links" :key="link.title"
			:href="link.href"
			rel="nofollow noopener"
			target="_blank"
			:title="link.title"
			:style="{backgroundColor: link.color}"
			class="share__link"
		>
			<img :src="link.icon" :alt="link.title" class="share__icon" />
		</a>
	</div>
</template>

<script>
import { computed } from '@vue/reactivity'

export default {
	props: {
		shareLink: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const title = document.title
		const shareLink = computed(() => props.shareLink)

		const links = computed(() => [
			{
				title: 'Вконтакте', 
				href: `https://vk.com/share.php?url=${shareLink.value}&title=${title}&utm_source=share2`,
				icon: 'https://img.icons8.com/color/48/000000/vk-com.png',
				color: '#1976d2'
			},
			{
				title: 'Facebook', 
				href: `https://www.facebook.com/sharer.php?src=sp&u=${shareLink.value}&title=${title}&utm_source=share2`,
				icon: 'https://img.icons8.com/fluency/48/000000/facebook.png',
				color: '#115a9b'
			},
			{
				title: 'Одноклассники', 
				href: `https://connect.ok.ru/offer?url=${shareLink.value}&title=${title}&utm_source=share2`,
				icon: 'https://img.icons8.com/color/48/000000/odnoklassniki.png',
				color: '#ff9800'
			},
			{
				title: 'Telegram', 
				href: `https://t.me/share/url?url=${shareLink.value}&text=${title}&utm_source=share2`,
				icon: 'https://img.icons8.com/color/50/000000/telegram-app.png',
				color: '#29b6f6'
			},
			{
				title: 'WhatsApp', 
				href: `https://api.whatsapp.com/send?text=${title}%20${shareLink.value}&utm_source=share2`,
				icon: 'https://img.icons8.com/color/48/000000/whatsapp.png',
				color: '#4fc75e'
			},
			{
				title: 'Мой мир', 
				href: `https://connect.mail.ru/share?url=${shareLink.value}&title=${title}&utm_source=share2`,
				icon: 'https://img.icons8.com/color/48/000000/apple-mail.png',
				color: '#1e88e5'
			}
		])

		return { links, shareLink }
	}
}
</script>

<style lang="scss" scoped>
.share {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	&__link {
		display: inline-flex;
		margin-right: 10px;
		border-radius: 4px;

		transition: all .3s;

		&:last-child {margin-right: 0;}
		&:hover {
			transform: scale(1.05);
			filter: drop-shadow(0px 0px 2px #444);
		}
	}
	&__icon {
		width: 32px;
		height: 32px;
	}
}
</style>

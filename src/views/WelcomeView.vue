<template>
	<div class="container">
		<div class="left-section">
			<img src="../assets/images/auroraLogo.png" alt="Logo AURORA z narzędziami" class="logo" />
			<ContactList />
			<div class="login-btn-box">
				<router-link to="/login">
					<img src="../assets/images/loginImage.png" alt="" class="login-img" />
				</router-link>
			</div>
		</div>
		<div class="right-section">
			<img :src="`https://pawelkajdas.pl/public/app/public/` + imageUrl" alt="" />
		</div>
	</div>
</template>

<script>
import instanceAxios from '@/axios'
import { useAuthStore } from '@/stores/auth.js'
import ContactList from '@/components/layout/ContactList.vue'
export default {
	name: 'WelcomeView',
	components: { ContactList },
	data() {
		return {
			imageUrl: '',
		}
	},
	mounted() {
		const authStore = useAuthStore()
		const token = authStore.token
		instanceAxios
			.get('mainPhotos', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				this.imageUrl = response.data.data.url
			})
			.catch(error => {
				console.error('Błąd pobierania obrazka z API:', error)
			})
	},
}
</script>

<style scoped>
.container {
	margin-top: 6rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.left-section,
.right-section {
	width: 50%;
}

.logo {
	width: 90%;
	max-width: 450px;
}

.login-btn-box {
	width: 80%;
	max-width: 300px;
}

.login-img {
	width: 100%;
}

.right-section img {
	width: 100%;
	height: 80vh;
}
</style>

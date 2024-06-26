import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('BearerToken') || null,
		userId: localStorage.getItem('userId') || null,
		isAdmin: JSON.parse(sessionStorage.getItem('admin')) || null,
		isLoggedIn: false,
	}),
	getters: {
		isAuthenticated: state => state.isLoggedIn,
		isLoggedAdmin: state => !!state.isAdmin,
	},
	actions: {
		async login(login, password) {
			const response = await instanceAxios.post('authenticate', { login, password })
			const token = await response.data.data.token
			const userId = await response.data.data.user.id
			const admin = await response.data.data.user.isAdmin
			this.token = token
			this.userId = userId
			this.isAdmin = admin
			this.isLoggedIn = true
			localStorage.setItem('BearerToken', token)
			localStorage.setItem('userId', userId)
			sessionStorage.setItem('admin', admin)
		},
		async logout() {
			localStorage.removeItem('BearerToken')
			localStorage.removeItem('userId')
			sessionStorage.removeItem('admin')
			this.token = null
			this.userId = null
			this.isAdmin = null
			this.isLoggedIn = false
		},
		async register(email, login, password, companyName) {
			const response = await instanceAxios.post('bo/users', {
				email,
				login,
				password,
				companyName,
			})
			return response.data
		},
		async fetchUser() {
			const response = await instanceAxios.get('bo/users')
			if (response.status === 200) {
				this.isLoggedIn = true
			}
		},
	},
})

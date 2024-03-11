import { defineStore } from 'pinia'
import instanceAxios from '@/axios'

export const useAuthStore = defineStore('auth', {
	state: () => ({
		token: localStorage.getItem('BearerToken') || null,
	}),
	getters: {
		isAuthenticated: state => !!state.token,
	},
	actions: {
		async login(email, password) {
			const response = await instanceAxios.post('authenticate', { email, password })
			const token = await response.data.data.token
			this.token = token
			localStorage.setItem('BearerToken', token)
		},
		async logout() {
			localStorage.removeItem('BearerToken')
			this.token = null
		},
		async register(email, password, companyName, companyAddress) {
			const response = await instanceAxios.post('bo/users', {
				email,
				password,
				companyName,
				companyAddress,
			})
			return response.data
		},
	},
})

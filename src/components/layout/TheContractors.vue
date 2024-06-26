<template>
	<div class="users-box">
		<h1>Lista kontrahentów:</h1>
		<p v-if="!usersStore.users.length">Brak kontrahentów na liście!</p>
		<div class="table-box" v-else>
			<table>
				<thead>
					<th>NAZWA FIRMY</th>
					<th>LOGIN</th>
					<th>EMAIL</th>
					<th>PRZYPISANO</th>
					<th>CENNIK</th>
					<th>AKCJE</th>
					<th class="login-counter-header">
						LOGOWANIE<br />
						SUMA
						<button class="delete-count-btn" @click="clearCounter">
							<img src="../../assets/images/icons/X.png" alt="" />
						</button>
					</th>
				</thead>
				<tbody>
					<tr v-for="user in usersStore.users" :key="user.id">
						<td>{{ user.companyName }}</td>
						<td>{{ user.login }}</td>
						<td>{{ user.email }}</td>
						<td>{{ user.priceList }}</td>

						<td>
							<select v-model="user.priceList" @change="updatePriceList(user.id, user.priceList)">
								<option v-for="priceList in usersStore.priceLists" :key="priceList.id" :value="priceList.id">
									{{ priceList.name }}
								</option>
							</select>
						</td>
						<td class="actions-box">
							<button class="pass-reset-btn" @click="openModal(user.id)">Resetuj hasło</button>
							<button class="delete-contractor-btn" @click="deleteUser(user.id)">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</td>
						<td>
							{{ user.loginCounter }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<ResetPassword :open="isResetOpen" :userId="resetUserId" @close="closeModal" />
	</div>
</template>

<script>
import instanceAxios from '@/axios'
import Swal from 'sweetalert2'
import { useUsersStore } from '@/stores/users.js'
import ResetPassword from '@/components/layout/ResetPassword.vue'

export default {
	name: 'TheContractors',
	components: { ResetPassword },
	setup() {
		const usersStore = useUsersStore()
		return { usersStore }
	},
	data() {
		return {
			isResetOpen: false,
			resetUserId: null,
		}
	},
	mounted() {
		this.showUsers()
	},
	methods: {
		async showUsers() {
			try {
				await this.usersStore.fetchUsers()
				await this.usersStore.fetchPriceLists()
			} catch (error) {
				console.error('Blad pobierania uzytkownikow:', error)
			}
		},
		async openModal(userId) {
			this.isResetOpen = true
			this.resetUserId = userId
		},
		closeModal() {
			this.isResetOpen = false
			this.resetUserId = null
		},
		async updatePriceList(userId, priceListId) {
			try {
				await instanceAxios.post(`bo/priceLists/${priceListId}/attachUser/${userId}`)
				Swal.fire({
					title: 'Sukces!',
					text: 'Ustawiono nowy cennik!',
					icon: 'success',
				})
				await this.usersStore.fetchUsers()
			} catch (error) {
				console.error('Blad przy aktualizacji cennika:', error)
			}
		},
		async deleteUser(userId) {
			try {
				await instanceAxios.delete(`bo/users/${userId}`)
				Swal.fire({
					title: 'Sukces!',
					text: 'Usunięto kontrahenta!',
					icon: 'success',
				})
				await this.usersStore.fetchUsers()
			} catch (error) {
				console.error('Blad usuwania kontrahenta', error)
			}
		},
		async clearCounter() {
			try {
				await instanceAxios.post('bo/users/clearCounterLogin')
				Swal.fire({
					title: 'Sukces!',
					text: 'Wyzerowano licznik logowań!',
					icon: 'success',
				})
				await this.usersStore.fetchUsers()
			} catch (err) {
				console.error('Blad przy czyszczeniu licznika logowan', err)
			}
		},
	},
}
</script>

<style scoped>
.users-box {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

table,
th,
td {
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-size: 1.4rem;
	font-weight: bold;
	text-align: center;
	padding: 0.5rem;
}
tr {
	border-bottom: 3px solid rgb(255, 101, 1);
}

th {
	background-color: rgb(255, 101, 1);
	color: rgb(255, 255, 255);
	font-size: 1.8rem;
}
thead {
	position: sticky;
	top: 0;
	left: 0;
}
td {
	max-width: 200px;
	word-wrap: break-word;
}

.table-box {
	max-height: 450px;
	overflow-y: auto;
}

table {
	width: 1400px;
}

tbody {
	background-color: rgba(51, 50, 50, 0.514);
}

h1 {
	border-bottom: 1px solid white;
	margin-bottom: 1rem;
}
p {
	font-size: 3rem;
}
.row-td {
	display: flex;
}

.pass-reset-btn {
	padding: 0.8rem;
	border: none;
	border-radius: 5px;
	background-color: rgb(255, 101, 1);
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	cursor: pointer;
}
.delete-contractor-btn {
	margin-left: 1rem;
	padding: 0.8rem;
	border: none;
	border-radius: 5px;
	background: none;
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	cursor: pointer;
}
.delete-contractor-btn img {
	width: 20px;
	height: 20px;
}
select {
	width: 75%;
	border: none;
	outline: none;
	background-color: rgb(255, 101, 1);
	padding: 0.5rem;
	border-radius: 8px;
	color: #fff;
	font-size: 1.6rem;
}
.login-counter-header {
	font-size: 1.2rem;
	position: relative;
}
.delete-count-btn {
	position: absolute;
	border: none;
	background: none;
	top: 50%;
	right: 2px;
	transform: translateY(-50%);
	cursor: pointer;
}
.delete-count-btn img {
	width: 15px;
	height: 15px;
}
</style>

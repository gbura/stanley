<template>
	<div class="photos-container">
		<div class="photos-box">
			<table>
				<thead>
					<th>
						Nazwa zdjęcia produktu
						<span>Ilość zdjęć: {{ this.photosStore.photos.length }}</span>
					</th>
				</thead>
				<tbody>
					<tr>
						<td class="search-box">
							<img src="../../assets/images/icons/search.png" alt="" class="search-icon" />
							<input type="text" class="search-input" placeholder="Wyszukaj po nazwie..." v-model="searchQuery" />
							<button class="delete-btn" @click="deleteSearchQuery">
								<img src="../../assets/images/icons/X.png" alt="" class="delete-btn-img" />
							</button>
						</td>
					</tr>
					<tr v-for="photo in filteredPhotos" :key="photo.id" v-if="this.photosStore.photos.length > 0">
						<td class="photo-name">
							{{ photo.name }}
							<button class="delete-photo-btn" @click="photosStore.deletePhoto(photo.id)">
								<img src="../../assets/images/icons/X.png" alt="" />
							</button>
						</td>
					</tr>
					<h2 v-else>Brak zdjęć w katalogu...</h2>
				</tbody>
			</table>
		</div>
		<button @click="openPopup" class="add-btn">Dodaj</button>
		<UpdateImage :open="isPopupOpen" @close="closePopup" />
	</div>
</template>

<script>
import { usePhotosStore } from '@/stores/photos.js'
import UpdateImage from '@/components/layout/UpdateImage.vue'
export default {
	name: 'ItemsPhotos',
	components: {
		UpdateImage,
	},
	setup() {
		const photosStore = usePhotosStore()
		return { photosStore }
	},
	data() {
		return {
			isPopupOpen: false,
			searchQuery: '',
		}
	},
	computed: {
		filteredPhotos() {
			return this.photosStore.photos.filter(photo => {
				return photo.name.toLowerCase().includes(this.searchQuery.toLowerCase())
			})
		},
	},
	methods: {
		openPopup() {
			this.isPopupOpen = true
		},
		closePopup() {
			this.isPopupOpen = false
		},
		deleteSearchQuery() {
			this.searchQuery = ''
		},
	},
	mounted() {
		this.photosStore.getPhotos()
	},
}
</script>

<style scoped>
.photos-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 900px;
	height: 100%;
}
.photos-box {
	width: 100%;
	max-height: 450px;
	overflow-y: auto;
}
.search-input {
	width: 100%;
	border: none;
	outline: none;
	padding: 1rem 2.5rem;
}
.search-box input {
	position: relative;
}
.delete-btn {
	position: absolute;
	right: 10px;
	top: 8px;
	padding: 0.5rem;
	border: none;
	background: none;
	cursor: pointer;
}
.delete-btn-img {
	width: 15px;
	height: 15px;
}

.search-box .search-icon {
	position: absolute;
	top: 50%;
	left: 15px;
	width: 15px;
	height: 15px;
	transform: translateY(-50%);
	z-index: 15;
}
h2 {
	text-align: center;
	padding: 2rem 0;
}
table,
th,
td {
	border: 2px solid rgb(255, 101, 1);
	border-collapse: collapse;
	font-family: 'Arial', sans-serif;
	font-weight: bold;
	padding: 1rem;
}
table {
	width: 100%;
}
th {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	background-color: rgb(255, 101, 1);
	font-size: 1.8rem;
	text-align: center;
	border: 3px solid rgb(175, 106, 15);
}
th span {
	font-size: 1.3rem;
}
tbody {
	background-color: rgba(51, 50, 50, 0.514);
}
tbody tr {
	position: relative;
}
.photo-id {
	width: 50px;
}
.delete-photo-btn {
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	padding: 0.5rem;
	border: none;
	background: none;
	color: red;
	cursor: pointer;
}
.delete-photo-btn img {
	width: 15px;
	height: 15px;
}
.add-btn {
	border: none;
	background-color: rgb(255, 101, 1);
	padding: 1rem 3rem;
	margin: 2rem 0;
	cursor: pointer;
	border-radius: 8px;
	color: white;
	font-weight: bold;
	font-size: 1.8rem;
	width: 120px;
}
.add-btn:hover {
	background-color: rgb(247, 119, 34);
}
</style>

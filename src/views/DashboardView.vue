<template>
	<div class="modal">
		<div class="wrapper">
			<div class="container">
				<template v-if="!dataLoaded">
					<SkeletonLoader />
				</template>
				<template v-else>
					<button class="toggle-slider-btn" @click="toggleSlider">
						{{ !isOpenSlider ? '<--- Ukryj katalog zdjęć --->' : '<--- Pokaż katalog zdjęć --->' }}
					</button>
					<TheSwiper v-if="!isOpenSlider" />
					<div class="right-box">
						<div class="items-table">
							<ItemsTable @row-click="changeItemImage" @next-tab-click="changeItemImage" />
						</div>
						<div class="item-img">
							<img :src="`https://pawelkajdas.pl/public/app/public/` + selectedItemImage" alt="" />
						</div>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import TheSwiper from '@/components/ui/TheSwiper.vue'
import ItemsTable from '@/components/layout/ItemsTable.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SkeletonLoader from '@/components/ui/SkeletonLoader.vue'

export default {
	components: {
		TheSwiper,
		ItemsTable,
		BaseButton,
		SkeletonLoader,
	},
	name: 'DashboardView',
	data() {
		return {
			dataLoaded: false,
			selectedItemImage: '',
			isOpenSlider: false,
		}
	},
	mounted() {
		setTimeout(() => {
			this.dataLoaded = true
		}, 1000)
	},
	methods: {
		changeItemImage(productImage) {
			if (productImage) {
				this.selectedItemImage = productImage.url
			} else if (productImage === null) {
				this.selectedItemImage = 'X.jpg'
			}
		},
		toggleSlider() {
			this.isOpenSlider = !this.isOpenSlider
		},
	},
}
</script>

<style scoped>
.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100%;
	background-color: rgba(0, 0, 0, 0.527);
}
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	gap: 6rem;
	margin-top: 10rem;
	width: 100%;
	height: 100%;
}

.toggle-slider-btn {
	font-size: 2.5rem;
	writing-mode: vertical-lr;
	transform: rotate(180deg);
	background: none;
	border: none;
	color: #b9b5b5;
	cursor: pointer;
}
.toggle-slider-btn:hover {
	color: #cfcbcb;
}

.right-box {
	display: flex;
	flex-direction: column;
}

.item-img img {
	border: 5px solid rgb(255, 101, 1);
	width: 350px;
	margin-top: 4rem;
}

@media (min-width: 1200px) {
	.container {
		flex-direction: row;
	}
}
</style>

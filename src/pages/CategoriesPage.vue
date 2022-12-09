<template>
	<div class="grid">
		<div class="s12">
			<article class="border medium no-padding center-align middle-align">
				<div class="padding">
					<h5>¿Deseas buscar una receta?</h5>

					<div
						class="field label suffix border animate__animated animate__bounce"
					>
						<input
							v-model="searchTerm"
							@keyup.enter="search"
							type="text"
							placeholder="ingrediente a buscar"
						/>
						<i>search</i>
					</div>
				</div>
			</article>
		</div>

		<template v-if="categorias.length > 0">
			<div
				class="s12"
				v-for="categoria in categorias"
				:key="categoria.idCategory"
			>
				<article class="no-padding">
					<img
						class="responsive medium"
						:src="categoria.strCategoryThumb"
					/>
					<div class="padding">
						<h5>{{ categoria.strCategory }}</h5>
						<p class="large-text">
							{{ categoria.strCategoryDescription }}
						</p>
						<nav>
							<button
								class="round"
								@click="
									$router.push({
										name: 'category',
										params: { c: categoria.strCategory },
									})
								"
							>
								Ver
							</button>
						</nav>
					</div>
				</article>
			</div>
		</template>
		<template v-else>
			<div class="s12 medium no-padding center-align middle-align">
				<a class="loader large" v-if="isLoading"></a>
				<h5 v-else>SIN DATOS</h5>
			</div>
		</template>
	</div>

	<the-toast v-model="showError" :error="error"></the-toast>
</template>

<script setup>
	import { onMounted, ref } from 'vue'
	import axios from 'axios'
	import { useResolver } from 'composables/resolver.js'
	import TheToast from '../components/TheToast.vue'
	import { useRouter } from 'vue-router'

	const getCategories = async () => {
		return (
			await axios.get(
				'https://www.themealdb.com/api/json/v1/1/categories.php'
			)
		).data
	}

	const searchTerm = ref('')
	const showError = ref(false)
	const categorias = ref([])

	const { tryResolve, data, error, isLoading } = useResolver()
	const router = useRouter()

	onMounted(async () => {
		if (await tryResolve(() => getCategories())) {
			categorias.value = data.value.categories
		} else {
			showError.value = true
		}
	})

	const search = async () => {
		if (searchTerm.value !== '') {
			router.push({ name: 'ingredient', params: { i: searchTerm.value } })
		}
	}
</script>

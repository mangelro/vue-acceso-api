import { ref, watch } from 'vue';
<template>
	<template v-if="meals && meals.length > 0">
		<table class="border">
			<tbody>
				<tr
					v-for="meal in currentMeals"
					:key="meal.idMeal"
					@click="navigate(meal)"
				>
					<td>{{ meal.strMeal }}</td>
					<td>
						<div class="img-hover-zoom">
							<img :src="meal.strMealThumb" class="responsive" />
						</div>
					</td>
					<td>
						<nav class="right-align">
							<button @click="remove(meal)" class="none m l">
								delete
							</button>
						</nav>
					</td>
				</tr>
			</tbody>
		</table>
	</template>

	<template v-else>
		<div class="fill medium-height middle-align center-align">
			<div class="center-align">
				<i class="extra">sentiment_very_dissatisfied</i>
				<h5>Sin datos</h5>
				<div class="space"></div>
				<nav>
					<button @click="$router.push({ name: 'categories' })">
						<i>home</i>
						<span>volver</span>
					</button>
				</nav>
			</div>
		</div>
	</template>
</template>

<script setup>
	import { onMounted, ref, watch } from 'vue'
	import { useRouter } from 'vue-router'

	const props = defineProps({
		meals: {
			type: Array,
			default: () => [],
		},
	})

	const rotuer = useRouter()
	const currentMeals = ref([])

	/**
	 * Cada vez que se niega v-if y luego pasa a true se monta el control
	 */
	onMounted(() => {
		//console.log('onMounted')
		currentMeals.value = [...props.meals]
	})

	watch(
		() => props.meals,
		() => {
			//console.log('watch')
			currentMeals.value = props.meals
		},
		{ deep: true } //muy importante para verificar los cambios en el array de las propiedades
	)

	const remove = item => {
		const index = currentMeals.value.findIndex(
			m => m.idMeal === item.idMeal
		)
		currentMeals.value.splice(index, 1)
	}

	const navigate = ({ idMeal }) =>
		rotuer.push({ name: 'recipe', params: { i: idMeal } })
</script>

<style scoped>
	tr:hover {
		background-color: var(--active);
	}
	/* [1] The container */
	.img-hover-zoom {
		width: 200px;
		height: 200px;
		overflow: hidden; /* [1.2] Hide the overflowing of child elements */
	}

	/* [2] Transition property for smooth transformation of images */
	.img-hover-zoom img {
		object-fit: cover;
		aspect-ratio: 16/9;
		filter: grayscale(70%);
		transition: transform 1s, filter 1s ease-in-out;
		/* transition: transform 0.5s ease; */
	}

	/* [3] Finally, transforming the image when container gets hovered */
	.img-hover-zoom:hover img {
		transform: scale(1.5) translate(-10px, -10px);
		filter: grayscale(0);
	}
</style>

<template>
	<div class="page active">
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
	</div>
</template>

<script>
	import { defineComponent } from 'vue'

	export default defineComponent({
		name: 'MainLayout',
		components: {},
		/* props:{}, */

		setup(/*props*/) {
			return {}
		},
	})
</script>

<style scoped></style>

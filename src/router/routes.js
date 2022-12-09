/**

 */

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'categories',
				component: () => import('@/pages/CategoriesPage.vue'),
			},
			{
				path: 'category/:c',
				name: 'category',
				component: () => import('@/pages/CategoryPage.vue'),
				props: router => {
					return {
						category: router.params.c,
					}
				},
			},
			{
				path: 'ingredients/:i',
				name: 'ingredient',
				component: () => import('@/pages/IngredientPage.vue'),
				props: router => {
					return {
						ingredient: router.params.i,
					}
				},
			},
			{
				path: 'recipe/:i',
				name: 'recipe',
				component: () => import('@/pages/RecetaPage.vue'),
				props: router => {
					return {
						idMeal: Number.parseInt(router.params.i),
					}
				},
			},
		],
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/error',
		name: 'error',
		component: () => import('@/pages/ErrorPage.vue'),
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('@/pages/NotFoundPage.vue'),
	},
]

export default routes

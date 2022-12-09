<template>
	<!-- <nav class="left m l">
		<img src="https://www.beercss.com/favicon.png" class="circle margin" />
		<a>
			<i>home</i>
			<div>Home</div>
		</a>
		<a>
			<i>search</i>
			<div>Search</div>
		</a>
		<a>
			<i>share</i>
			<div>Share</div>
		</a>
		<a>
			<i>more_vert</i>
			<div>More</div>
		</a>
	</nav>

	<nav class="bottom s">
		<a>
			<i>home</i>
		</a>
		<a>
			<i>search</i>
		</a>
		<a>
			<i>share</i>
		</a>
		<a>
			<i>more_vert</i>
		</a>
	</nav> -->

	<header>
		<nav>
			<button class="circle transparent" @click="$router.go(-1)">
				<i>arrow_backward</i>
			</button>
			<h5 class="max">The meal DB</h5>
			<button class="circle transparent">
				<i>attach_file</i>
			</button>
			<button class="circle transparent">
				<i>today</i>
			</button>
			<button class="circle transparent">
				<i>more_vert</i>
			</button>
		</nav>
	</header>

	<main class="responsive">
		<router-view />
	</main>

	<img src="~assets/wave.svg" alt="" class="onda" />
	<footer class="medium no-padding center-align middle-align">
		<div class="texto">
			<h5>
				Miguel Angel Romera Ortega &copy;{{ new Date().getFullYear() }}
			</h5>
		</div>
	</footer>
</template>

<style scoped>
	footer {
		min-height: 150px;
		color: var(--on-primary);
		background-color: var(--primary);
	}
</style>


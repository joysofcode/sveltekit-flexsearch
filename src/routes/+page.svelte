<script lang="ts">
	import { onMount } from 'svelte'
	import { createPostsIndex, searchPostsIndex, type Result } from '$lib/search'

	let search: 'loading' | 'ready' = 'loading'
	let searchTerm = 'imagine'
	let results: Result[] = []

	onMount(async () => {
		const posts = await fetch('/search.json').then((res) => res.json())
		createPostsIndex(posts)
		search = 'ready'
	})

	$: if (search === 'ready') {
		results = searchPostsIndex(searchTerm)
	}
</script>

{#if search === 'ready'}
	<div class="search">
		<input
			bind:value={searchTerm}
			placeholder="Search"
			autocomplete="off"
			spellcheck="false"
			type="search"
		/>

		<div class="results">
			{#if results}
				<ul>
					{#each results as result}
						<li>
							<a href="/{result.slug}">
								{@html result.title}
							</a>
							<p>{@html result.content}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(body) {
		font-family: 'Manrope', sans-serif;
		font-size: 1.5rem;
		color: hsl(220 10% 98%);
		background-color: hsl(220 10% 10%);
	}

	.search {
		width: 90vw;
		max-width: 600px;
		position: fixed;
		left: 50%;
		top: 20%;
		translate: -50% -0%;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 20px hsl(0 0% 0% / 40%);
		overflow: hidden;

		& input {
			width: 100%;
			padding: 1.5rem;
			color: hsl(220 10% 98%);
			background-color: hsl(220 10% 20%);
			font: inherit;
			border: none;
			outline: none;
		}
	}

	.results {
		max-height: 48vh;
		padding: 1.5rem;
		background-color: hsl(220 10% 14%);
		overflow-y: auto;
		scrollbar-width: thin;

		& ul {
			display: grid;
			gap: 1rem;
			padding: 0px;
			margin: 0px;
			list-style: none;

			& li:not(:last-child) {
				padding-block: 0.5rem;
				border-bottom: 1px solid hsl(220 10% 20%);
			}
		}

		& a {
			display: block;
			font-size: 1.5rem;
			color: hsl(220 10% 80%);
			text-decoration: none;
			transition: color 0.3s ease;

			&:hover {
				color: aqua;
			}
		}
	}
</style>

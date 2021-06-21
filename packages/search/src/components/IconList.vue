<template>
	<div>
		<ul class="grid grid-cols-8">
			<li v-for="icon in icons" :key="`${icon.id}-${icon.lib.id}`">
				<Icon :icon="icon" />
			</li>
		</ul>
	</div>
</template>

<script>
import Icon from "./Icon";
export default {
	name: "IconList",
	props: {
		icons: Array,
	},
	components: {
		Icon,
	},
};
</script>

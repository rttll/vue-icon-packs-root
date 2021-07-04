<template>
  <code class="block">
    <input
      type="text"
      :value="text"
      class="block w-full p-4 text-lg bg-transparent outline-none hover:bg-gray-100"
      onFocus="this.setSelectionRange(0, this.value.length)"
    />
  </code>
</template>

<script>
export default {
  name: 'Copy',
  props: {
    text: String,
  },
};
</script>

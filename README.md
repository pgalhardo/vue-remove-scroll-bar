# vue-remove-scroll-bar

[![npm](https://img.shields.io/npm/v/vue-remove-scroll-bar.svg)](https://www.npmjs.com/package/vue-remove-scroll-bar)
[![bundle size](https://badgen.net/bundlephobia/minzip/vue-remove-scroll-bar)](https://bundlephobia.com/result?p=vue-remove-scroll-bar)
[![downloads](https://badgen.net/npm/dm/vue-remove-scroll-bar)](https://www.npmtrends.com/vue-remove-scroll-bar)

A lightweight Vue component to hide scrollbars while preserving the scrollbar gap. This prevents layout shifts when transitioning between scrollable and non-scrollable states. Based on [react-remove-scroll-bar](https://github.com/theKashey/react-remove-scroll-bar) by [theKashey](https://github.com/theKashey).

## Basic Usage

```vue
<script setup lang="ts">
import { RemoveScrollBar } from 'vue-remove-scroll-bar'
</script>

<template>
  <RemoveScrollBar /> -> no scroll bar
</template>
```

## Credit

This is a Vue port of [react-remove-scroll-bar](https://github.com/theKashey/react-remove-scroll-bar) by [theKashey](https://github.com/theKashey).

## License

MIT

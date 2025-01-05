<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { stylesheetSingleton } from 'react-style-singleton'
import {
  lockAttribute,
  fullWidthClassName,
  zeroRightClassName,
  noScrollbarsClassName,
  removedBarSizeVariable,
} from './constants'
import { type GapMode, getGapWidth } from './utils'

const Style = stylesheetSingleton()

export interface Props {
  noRelative?: boolean
  noImportant?: boolean
  gapMode?: GapMode
}

const props = withDefaults(defineProps<Props>(), {
  noRelative: false,
  noImportant: false,
  gapMode: 'margin',
})

const getCurrentUseCounter = (): number => {
  const counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10)
  return isFinite(counter) ? counter : 0
}

const getStyles = computed(() => {
  const gap = getGapWidth(props.gapMode)
  const important = !props.noImportant ? '!important' : ''
  const allowRelative = !props.noRelative

  return `
    .${noScrollbarsClassName} {
      overflow: hidden ${important};
      padding-right: ${gap.gap}px ${important};
    }
    body[${lockAttribute}] {
      overflow: hidden ${important};
      overscroll-behavior: contain;
      ${[
        allowRelative && `position: relative ${important};`,
        props.gapMode === 'margin' &&
          `
        padding-left: ${gap.left}px;
        padding-top: ${gap.top}px;
        padding-right: ${gap.right}px;
        margin-left:0;
        margin-top:0;
        margin-right: ${gap.gap}px ${important};
        `,
        props.gapMode === 'padding' && `padding-right: ${gap.gap}px ${important};`,
      ]
        .filter(Boolean)
        .join('')}
    }

    .${zeroRightClassName} {
      right: ${gap.gap}px ${important};
    }

    .${fullWidthClassName} {
      margin-right: ${gap.gap}px ${important};
    }

    .${zeroRightClassName} .${zeroRightClassName} {
      right: 0 ${important};
    }

    .${fullWidthClassName} .${fullWidthClassName} {
      margin-right: 0 ${important};
    }

    body[${lockAttribute}] {
      ${removedBarSizeVariable}: ${gap.gap}px;
    }
  `
})

onMounted(() => {
  document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString())
  Style.add(getStyles.value)
})

onUnmounted(() => {
  const newCounter = getCurrentUseCounter() - 1
  if (newCounter <= 0) {
    document.body.removeAttribute(lockAttribute)
  } else {
    document.body.setAttribute(lockAttribute, newCounter.toString())
  }
  Style.remove()
})
</script>

<template>
  <slot />
</template>

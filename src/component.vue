<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import {
  fullWidthClassName,
  lockAttribute,
  noScrollbarsClassName,
  removedBarSizeVariable,
  zeroRightClassName,
} from './constants'
import { type GapMode, type GapOffset, getGapWidth } from './utils/gap'
import { useStylesheet } from './utils/stylesheet'

const Style = useStylesheet()

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

// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
const getStyles = (
  { left, top, right, gap }: GapOffset,
  allowRelative: boolean,
  gapMode: GapMode = 'margin',
  important: string,
) => `
  .${noScrollbarsClassName} {
    overflow: hidden ${important};
    padding-right: ${gap}px ${important};
  }
  body[${lockAttribute}] {
    overflow: hidden ${important};
    overscroll-behavior: contain;
    ${[
      allowRelative && `position: relative ${important};`,
      gapMode === 'margin' &&
        `
    padding-left: ${left}px;
    padding-top: ${top}px;
    padding-right: ${right}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${gap}px ${important};
    `,
      gapMode === 'padding' && `padding-right: ${gap}px ${important};`,
    ]
      .filter(Boolean)
      .join('')}
  }

  .${zeroRightClassName} {
    right: ${gap}px ${important};
  }

  .${fullWidthClassName} {
    margin-right: ${gap}px ${important};
  }

  .${zeroRightClassName} .${zeroRightClassName} {
    right: 0 ${important};
  }

  .${fullWidthClassName} .${fullWidthClassName} {
    margin-right: 0 ${important};
  }

  body[${lockAttribute}] {
    ${removedBarSizeVariable}: ${gap}px;
  }
`

onMounted(() => {
  document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString())

  /*
   gap will be measured on every component mount
   however it will be used only by the "first" invocation
   due to singleton nature of <Style
   */
  const gap = getGapWidth(props.gapMode)

  Style.add(
    getStyles(gap, !props.noRelative, props.gapMode, !props.noImportant ? '!important' : ''),
  )
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
  <slot></slot>
</template>

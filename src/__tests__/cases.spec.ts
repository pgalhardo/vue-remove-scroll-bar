import { mount } from '@vue/test-utils'
import RemoveScrollBar from '../component.vue'
import { lockAttribute } from '../constants'
import { describe, it, expect } from 'vitest'

const createTestComponent = (actionName = 'toggle') => ({
  components: { RemoveScrollBar },
  template: `
    <div>
      <button @click="lock = !lock">{{ actionName }}</button>
      <RemoveScrollBar v-if="lock" />
    </div>
  `,
  data() {
    return {
      lock: false,
      actionName,
    }
  },
})

describe('RemoveScrollBar', () => {
  it('should toggle the lock attribute on mount/unmount', async () => {
    const wrapper = mount(createTestComponent())
    const button = wrapper.find('button')

    expect(document.body.getAttribute(lockAttribute)).toBeNull()
    expect(window.getComputedStyle(document.body).overflow).toBe('')

    await button.trigger('click')
    expect(document.body.getAttribute(lockAttribute)).toBeDefined()

    await new Promise((resolve) => setTimeout(resolve, 1))
    expect(window.getComputedStyle(document.body).overflow).toBe('hidden')

    await button.trigger('click')
    expect(document.body.getAttribute(lockAttribute)).toBeNull()
    expect(window.getComputedStyle(document.body).overflow).toBe('')
  })

  it('should handle nested cases', async () => {
    const t1 = mount(createTestComponent('toggle1'))
    const t2 = mount(createTestComponent('toggle2'))

    const button1 = t1.find('button')
    const button2 = t2.find('button')

    expect(document.body.getAttribute(lockAttribute)).toBeNull()

    await button1.trigger('click')
    await button2.trigger('click')
    expect(document.body.getAttribute(lockAttribute)).toBeDefined()

    await button1.trigger('click')
    expect(document.body.getAttribute(lockAttribute)).toBeDefined()

    await button2.trigger('click')
    expect(document.body.getAttribute(lockAttribute)).toBeNull()
  })
})

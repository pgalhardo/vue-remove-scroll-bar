// Components
import RemoveScrollBar from '../component.vue'

// Types
import type { Meta, StoryObj } from '@storybook/vue3'

// Utilities
import { ref } from 'vue'

const meta = {
  title: 'Components/RemoveScrollBar',
  component: RemoveScrollBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RemoveScrollBar>

export default meta
type Story = StoryObj<typeof meta>

// Basic example showing scroll bar removal
export const Basic: Story = {
  render: () => ({
    components: { RemoveScrollBar },
    setup() {
      const isLocked = ref(false)

      return { isLocked }
    },
    template: `
      <div>
        <RemoveScrollBar v-if="isLocked" />
        <div style="padding: 20px">
          <button @click="isLocked = !isLocked">
            {{ isLocked ? 'Enable Scroll' : 'Disable Scroll' }}
          </button>
          <div style="height: 200vh; padding: 20px; background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)">
            Scroll content - try scrolling when locked
          </div>
        </div>
      </div>
    `,
  }),
}

// Test multiple instances
export const MultipleInstances: Story = {
  render: () => ({
    components: { RemoveScrollBar },
    setup() {
      const lock1 = ref(false)
      const lock2 = ref(false)

      return { lock1, lock2 }
    },
    template: `
      <div style="padding: 20px">
        <div style="margin-bottom: 20px">
          <RemoveScrollBar v-if="lock1" />
          <button @click="lock1 = !lock1">
            Lock 1: {{ lock1 ? 'Enabled' : 'Disabled' }}
          </button>
        </div>
        <div style="margin-bottom: 20px">
          <RemoveScrollBar v-if="lock2" />
          <button @click="lock2 = !lock2">
            Lock 2: {{ lock2 ? 'Enabled' : 'Disabled' }}
          </button>
        </div>
        <div style="height: 200vh; padding: 20px; background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)">
          Test multiple scroll locks
        </div>
      </div>
    `,
  }),
}

// Test different gap modes
export const GapModes: Story = {
  render: () => ({
    components: { RemoveScrollBar },
    setup() {
      const isLocked = ref(false)
      const gapMode = ref<'margin' | 'padding'>('margin')

      return { isLocked, gapMode }
    },
    template: `
      <div style="padding: 20px">
        <div style="margin-bottom: 20px">
          <RemoveScrollBar v-if="isLocked" :gapMode="gapMode" />
          <button @click="isLocked = !isLocked" style="margin-right: 10px">
            {{ isLocked ? 'Enable Scroll' : 'Disable Scroll' }}
          </button>
          <select v-model="gapMode">
            <option value="margin">Margin Mode</option>
            <option value="padding">Padding Mode</option>
          </select>
        </div>
        <div style="height: 200vh; padding: 20px; background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)">
          Test different gap modes
        </div>
      </div>
    `,
  }),
}

// Test with fixed elements
export const WithFixedElements: Story = {
  render: () => ({
    components: { RemoveScrollBar },
    setup() {
      const isLocked = ref(false)

      return { isLocked }
    },
    template: `
      <div>
        <RemoveScrollBar v-if="isLocked" />
        <div style="position: fixed; top: 0; left: 0; right: 0; background: #fff; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
          Fixed Header
          <button @click="isLocked = !isLocked" style="margin-left: 20px">
            {{ isLocked ? 'Enable Scroll' : 'Disable Scroll' }}
          </button>
        </div>
        <div style="height: 200vh; padding: 80px 20px 20px; background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)">
          Content with fixed header
        </div>
        <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #fff; padding: 20px; box-shadow: 0 -2px 4px rgba(0,0,0,0.1)">
          Fixed Footer
        </div>
      </div>
    `,
  }),
}

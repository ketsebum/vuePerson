/**
 * Created by ketse on 7/8/17.
 */
import { mutations } from '@/vuex'

const { increment, decrement } = mutations

describe('mutations', () => {
  it('INCREMENT', () => {
    const state = {count: 0}
    increment(state)
    expect(state.count).to.equal(1)
  })
  it('DECREMENT', () => {
    const state = {count: 1}
    decrement(state)
    expect(state.count).to.equal(0)
  })
})

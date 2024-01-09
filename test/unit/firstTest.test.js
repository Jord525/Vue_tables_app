import { createPinia, setActivePinia } from 'pinia'
import { test, expect, describe, beforeEach} from 'vitest'
import {useTableStore} from "../../src/stores/table.js"

describe('Progress store', ()=>{
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('sortBy must be empty', ()=>{
    const progress = useTableStore()
    expect(progress.sortBy).toBe('')
  })
})



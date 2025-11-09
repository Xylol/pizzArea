import { describe, it, expect } from 'vitest'

interface CircularPizza {
  type: 'circular'
  diameter: number
  price: number
}

interface RectangularPizza {
  type: 'rectangular'
  width: number
  height: number
  price: number
}

type Pizza = CircularPizza | RectangularPizza

function calculateArea(pizza: Pizza): number {
  if (pizza.type === 'circular') {
    const radius = pizza.diameter / 2
    return Math.PI * radius * radius
  } else {
    return pizza.width * pizza.height
  }
}

function calculateValuePerMoney(pizza: Pizza): number {
  const area = calculateArea(pizza)
  return pizza.price > 0 ? area / pizza.price : 0
}

describe('Pizza Calculations', () => {
  describe('calculateArea', () => {
    it('calculates circular pizza area correctly', () => {
      const pizza: CircularPizza = { type: 'circular', diameter: 30, price: 10 }
      const area = calculateArea(pizza)
      expect(area).toBeCloseTo(706.858, 2)
    })

    it('calculates rectangular pizza area correctly', () => {
      const pizza: RectangularPizza = { type: 'rectangular', width: 30, height: 40, price: 12 }
      const area = calculateArea(pizza)
      expect(area).toBe(1200)
    })
  })

  describe('calculateValuePerMoney', () => {
    it('calculates value per money for circular pizza', () => {
      const pizza: CircularPizza = { type: 'circular', diameter: 30, price: 10 }
      const value = calculateValuePerMoney(pizza)
      expect(value).toBeCloseTo(70.686, 2)
    })

    it('calculates value per money for rectangular pizza', () => {
      const pizza: RectangularPizza = { type: 'rectangular', width: 30, height: 40, price: 12 }
      const value = calculateValuePerMoney(pizza)
      expect(value).toBe(100)
    })

    it('returns 0 when price is 0', () => {
      const pizza: CircularPizza = { type: 'circular', diameter: 30, price: 0 }
      const value = calculateValuePerMoney(pizza)
      expect(value).toBe(0)
    })
  })
})

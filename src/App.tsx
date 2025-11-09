import { useState } from 'react'

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

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [pizzaType, setPizzaType] = useState<'circular' | 'rectangular'>('circular')

  const [circularDiameter, setCircularDiameter] = useState('')
  const [circularPrice, setCircularPrice] = useState('')

  const [rectWidth, setRectWidth] = useState('')
  const [rectHeight, setRectHeight] = useState('')
  const [rectPrice, setRectPrice] = useState('')

  const addPizza = () => {
    if (pizzaType === 'circular') {
      const diameter = parseFloat(circularDiameter)
      const price = parseFloat(circularPrice)
      if (!isNaN(diameter) && !isNaN(price) && diameter > 0 && price > 0) {
        setPizzas([...pizzas, { type: 'circular', diameter, price }])
        setCircularDiameter('')
        setCircularPrice('')
      }
    } else {
      const width = parseFloat(rectWidth)
      const height = parseFloat(rectHeight)
      const price = parseFloat(rectPrice)
      if (!isNaN(width) && !isNaN(height) && !isNaN(price) && width > 0 && height > 0 && price > 0) {
        setPizzas([...pizzas, { type: 'rectangular', width, height, price }])
        setRectWidth('')
        setRectHeight('')
        setRectPrice('')
      }
    }
  }

  const removePizza = (index: number) => {
    setPizzas(pizzas.filter((_, i) => i !== index))
  }

  const sortedPizzas = [...pizzas].sort((a, b) => calculateValuePerMoney(b) - calculateValuePerMoney(a))

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 'clamp(1rem, 5vw, 2rem)',
    }}>
      <h1 style={{ marginBottom: 'var(--space-s)', textAlign: 'center', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>PizzArea Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-m)', textAlign: 'center' }}>
        Calculate pizza value: pizza per money
      </p>

      <div style={{
        background: 'var(--color-surface)',
        padding: 'clamp(1rem, 4vw, 2rem)',
        borderRadius: 'var(--radius)',
        maxWidth: '500px',
        width: '100%',
        marginBottom: 'var(--space-m)',
      }}>
        <div style={{ marginBottom: 'var(--space-s)' }}>
          <label style={{ display: 'block', marginBottom: '0.75rem' }}>Pizza Type:</label>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                id="pizza-type-round"
                name="pizzaType"
                value="circular"
                checked={pizzaType === 'circular'}
                onChange={(e) => setPizzaType(e.target.value as 'circular' | 'rectangular')}
                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
              />
              Round
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                id="pizza-type-rectangle"
                name="pizzaType"
                value="rectangular"
                checked={pizzaType === 'rectangular'}
                onChange={(e) => setPizzaType(e.target.value as 'circular' | 'rectangular')}
                style={{ marginRight: '0.5rem', cursor: 'pointer' }}
              />
              Rectangle
            </label>
          </div>
        </div>

        {pizzaType === 'circular' ? (
          <>
            <div style={{ marginBottom: 'var(--space-s)' }}>
              <label htmlFor="circular-diameter" style={{ display: 'block', marginBottom: '0.5rem' }}>Diameter:</label>
              <input
                type="number"
                id="circular-diameter"
                name="diameter"
                value={circularDiameter}
                onChange={(e) => setCircularDiameter(e.target.value)}
                placeholder="e.g., 30"
                min="0"
                step="0.1"
              />
            </div>
            <div style={{ marginBottom: 'var(--space-s)' }}>
              <label htmlFor="circular-price" style={{ display: 'block', marginBottom: '0.5rem' }}>Price:</label>
              <input
                type="number"
                id="circular-price"
                name="price"
                value={circularPrice}
                onChange={(e) => setCircularPrice(e.target.value)}
                placeholder="e.g., 10"
                min="0"
                step="0.01"
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 'var(--space-s)', marginBottom: 'var(--space-s)' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="rect-width" style={{ display: 'block', marginBottom: '0.5rem' }}>Width:</label>
                <input
                  type="number"
                  id="rect-width"
                  name="width"
                  value={rectWidth}
                  onChange={(e) => setRectWidth(e.target.value)}
                  placeholder="e.g., 30"
                  min="0"
                  step="0.1"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="rect-height" style={{ display: 'block', marginBottom: '0.5rem' }}>Height:</label>
                <input
                  type="number"
                  id="rect-height"
                  name="height"
                  value={rectHeight}
                  onChange={(e) => setRectHeight(e.target.value)}
                  placeholder="e.g., 40"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            <div style={{ marginBottom: 'var(--space-s)' }}>
              <label htmlFor="rect-price" style={{ display: 'block', marginBottom: '0.5rem' }}>Price:</label>
              <input
                type="number"
                id="rect-price"
                name="price"
                value={rectPrice}
                onChange={(e) => setRectPrice(e.target.value)}
                placeholder="e.g., 12"
                min="0"
                step="0.01"
              />
            </div>
          </>
        )}

        <button
          onClick={addPizza}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--color-primary)',
            color: 'var(--color-text)',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Add Pizza
        </button>
      </div>

      {sortedPizzas.length > 0 && (
        <div style={{
          width: '100%',
          maxWidth: '600px',
        }}>
          <h2 style={{ marginBottom: 'var(--space-s)' }}>Results (sorted by value)</h2>
          {sortedPizzas.map((pizza, index) => {
            const area = calculateArea(pizza)
            const valuePerMoney = calculateValuePerMoney(pizza)
            const bestValue = index === 0

            return (
              <div
                key={index}
                style={{
                  background: bestValue ? 'rgba(79, 70, 229, 0.1)' : 'var(--color-surface)',
                  border: bestValue ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  padding: 'clamp(0.75rem, 3vw, 1rem)',
                  borderRadius: 'var(--radius)',
                  marginBottom: 'var(--space-s)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', wordWrap: 'break-word' }}>
                      {pizza.type === 'circular'
                        ? `Round: ${pizza.diameter} diameter`
                        : `Rectangle: ${pizza.width} × ${pizza.height}`
                      }
                      {bestValue && <span style={{ color: 'var(--color-primary)', marginLeft: '0.5rem', display: 'inline-block' }}>BEST VALUE</span>}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                      Price: {pizza.price.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                      Area: {area.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                      Value: {valuePerMoney.toFixed(2)} pizza/money
                    </div>
                  </div>
                  <button
                    onClick={() => removePizza(pizzas.indexOf(pizza))}
                    style={{
                      background: '#8c2b2b',
                      color: 'var(--color-text)',
                      border: 'none',
                      borderRadius: 'var(--radius)',
                      padding: '0.5rem 1rem',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      flexShrink: 0,
                      alignSelf: 'flex-start',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            )
          })}

          <button
            onClick={() => setPizzas([])}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#8c2b2b',
              color: 'var(--color-text)',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: 'var(--space-s)',
            }}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  )
}

export default App

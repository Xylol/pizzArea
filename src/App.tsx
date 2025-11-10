import { useState, useRef } from 'react'

type Pizza = {
  type: 'circular' | 'rectangular'
  diameter?: number
  width?: number
  height?: number
  price: number
  name?: string
}

function calculateArea(pizza: Pizza): number {
  if (pizza.type === 'circular') {
    if (!pizza.diameter) return 0
    const radius = pizza.diameter / 2
    return Math.PI * radius * radius
  } else {
    if (!pizza.width || !pizza.height) return 0
    return pizza.width * pizza.height
  }
}

function calculateValuePerMoney(pizza: Pizza): number {
  const area = calculateArea(pizza)
  return pizza.price > 0 ? area / pizza.price : 0
}

function formatPizzaDescription(pizza: Pizza): string {
  if (pizza.type === 'circular') {
    return `Round: ${pizza.diameter} diameter`
  }

  return `Rectangle: ${pizza.width} × ${pizza.height}`
}

function App() {
  const [pizzas, setPizzas] = useState<Pizza[]>([])
  const [pizzaType, setPizzaType] = useState<'circular' | 'rectangular'>('circular')

  const [circularDiameter, setCircularDiameter] = useState('')
  const [circularPrice, setCircularPrice] = useState('')

  const [rectWidth, setRectWidth] = useState('')
  const [rectHeight, setRectHeight] = useState('')
  const [rectPrice, setRectPrice] = useState('')

  const [pizzaName, setPizzaName] = useState('')

  const diameterInputRef = useRef<HTMLInputElement>(null)
  const widthInputRef = useRef<HTMLInputElement>(null)

  const addPizza = () => {
    if (pizzaType === 'circular') {
      const diameter = parseFloat(circularDiameter)
      const price = parseFloat(circularPrice)
      if (!isNaN(diameter) && !isNaN(price) && diameter > 0 && price > 0) {
        const pizza: Pizza = { type: 'circular', diameter, price }
        if (pizzaName.trim()) {
          pizza.name = pizzaName.trim()
        }
        setPizzas([...pizzas, pizza])
        setCircularDiameter('')
        setCircularPrice('')
        setPizzaName('')
        setTimeout(() => diameterInputRef.current?.focus(), 0)
      }
    } else {
      const width = parseFloat(rectWidth)
      const height = parseFloat(rectHeight)
      const price = parseFloat(rectPrice)
      if (!isNaN(width) && !isNaN(height) && !isNaN(price) && width > 0 && height > 0 && price > 0) {
        const pizza: Pizza = { type: 'rectangular', width, height, price }
        if (pizzaName.trim()) {
          pizza.name = pizzaName.trim()
        }
        setPizzas([...pizzas, pizza])
        setRectWidth('')
        setRectHeight('')
        setRectPrice('')
        setPizzaName('')
        setTimeout(() => widthInputRef.current?.focus(), 0)
      }
    }
  }

  const removePizza = (index: number) => {
    setPizzas(pizzas.filter((_, i) => i !== index))
  }

  const sortedPizzas = [...pizzas].sort((a, b) => calculateValuePerMoney(b) - calculateValuePerMoney(a))

  const isFormValid = pizzaType === 'circular'
    ? circularDiameter && circularPrice && parseFloat(circularDiameter) > 0 && parseFloat(circularPrice) > 0
    : rectWidth && rectHeight && rectPrice && parseFloat(rectWidth) > 0 && parseFloat(rectHeight) > 0 && parseFloat(rectPrice) > 0

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
        Calculate pizza per money, value counts
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (isFormValid) {
            addPizza()
          }
        }}
        style={{
          background: 'var(--color-surface)',
          padding: 'clamp(1rem, 4vw, 2rem)',
          borderRadius: 'var(--radius)',
          maxWidth: '500px',
          width: '100%',
          marginBottom: 'var(--space-m)',
        }}
      >
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
                ref={diameterInputRef}
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
                placeholder="e.g., 15"
                min="0"
                step="0.01"
              />
            </div>
            <div style={{ marginBottom: 'var(--space-s)' }}>
              <label htmlFor="pizza-name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
              <input
                type="text"
                id="pizza-name"
                name="name"
                value={pizzaName}
                onChange={(e) => setPizzaName(e.target.value)}
                placeholder="optional name"
                style={{ color: pizzaName ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 'var(--space-s)', marginBottom: 'var(--space-s)' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="rect-width" style={{ display: 'block', marginBottom: '0.5rem' }}>Width:</label>
                <input
                  ref={widthInputRef}
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
                placeholder="e.g., 23"
                min="0"
                step="0.01"
              />
            </div>
            <div style={{ marginBottom: 'var(--space-s)' }}>
              <label htmlFor="pizza-name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name:</label>
              <input
                type="text"
                id="pizza-name"
                name="name"
                value={pizzaName}
                onChange={(e) => setPizzaName(e.target.value)}
                placeholder="optional name"
                style={{ color: pizzaName ? 'var(--color-text)' : 'var(--color-text-secondary)' }}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: isFormValid ? 'var(--color-primary)' : '#52525b',
            color: 'var(--color-text)',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: '1rem',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
            opacity: isFormValid ? 1 : 0.6,
          }}
          onMouseEnter={(e) => {
            if (isFormValid) {
              e.currentTarget.style.background = 'var(--color-primary-hover)'
            }
          }}
          onMouseLeave={(e) => {
            if (isFormValid) {
              e.currentTarget.style.background = 'var(--color-primary)'
            }
          }}
        >
          Add Pizza
        </button>
      </form>

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
                    {pizza.name && (
                      <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', wordWrap: 'break-word' }}>
                        {pizza.name}
                      </div>
                    )}
                    <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', wordWrap: 'break-word' }}>
                      {formatPizzaDescription(pizza)}
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

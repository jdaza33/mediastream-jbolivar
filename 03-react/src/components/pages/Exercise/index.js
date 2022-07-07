import React, { useState } from 'react'
import './assets/styles.css'

export default function Exercise01 () {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  // const discountRules = [
  //   {
  //     m: [3, 2],
  //     discount: 0.25
  //   },
  //   {
  //     m: [2, 4, 1],
  //     discount: 0.5
  //   },
  //   {
  //     m: [4, 2],
  //     discount: 0.1
  //   }
  // ]

  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Star Wars',
      price: 20,
      quantity: 2
    }
  ])

  const getTotal = () => cart.reduce((res, val) => (val.price * val.quantity) + res, 0)

  const addCart = (cart) => {
    setCart((oldCarts) => {
      if (oldCarts.find((c) => c.id === cart.id)) {
        return [
          ...oldCarts.map((c) =>
            c.id === cart.id ? { ...c, quantity: c.quantity + 1 } : c
          )
        ]
      } else return [...oldCarts, { ...cart, quantity: 1 }]
    })
  }

  const plusCart = (cartId) => {
    setCart((oldCarts) => [
      ...oldCarts.map((c) =>
        c.id === cartId ? { ...c, quantity: c.quantity + 1 } : c
      )
    ])
  }

  const minusCart = (cartId) => {
    setCart((oldCarts) =>
      [
        ...oldCarts.map((c) => {
          if (c.id === cartId && c.quantity <= 1) return null
          if (c.id === cartId && c.quantity > 1)
            // eslint-disable-next-line curly
            return { ...c, quantity: c.quantity - 1 }
          else return c
        })
      ].filter((c) => c)
    )
  }

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map(o => (
            <li className="movies__list-card" key={o.id}>
              <ul>
                <li>
                  ID: {o.id}
                </li>
                <li>
                  Name: {o.name}
                </li>
                <li>
                  Price: ${o.price}
                </li>
              </ul>
              <button onClick={() => addCart(o)}>
                Add to cart
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(x => (
            <li className="movies__cart-card" key={x.id}>
              <ul>
                <li>
                  ID: {x.id}
                </li>
                <li>
                  Name: {x.name}
                </li>
                <li>
                  Price: ${x.price}
                </li>
              </ul>
              <div className="movies__cart-card-quantity">
                <button onClick={() => minusCart(x.id)}>
                  -
                </button>
                <span>
                  {x.quantity}
                </span>
                <button onClick={() => plusCart(x.id)}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${getTotal()}</p>
        </div>
      </div>
    </section>
  )
}

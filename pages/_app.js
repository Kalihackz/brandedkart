import React from 'react'
import NextNProgress from "nextjs-progressbar"
import '../styles/globals.css'
import Navbar from '../components/Navbar/Navbar'

function MyApp({ Component, pageProps }) {

	const [ cart, setCart ] = React.useState([])
	const [ loading, setLoading ] = React.useState(true)
	const [ totalQuantity, setTotalQuantity ] = React.useState(0)
	const [ totalAmount, setTotalAmount ] = React.useState(0)

	React.useEffect(() => {

		fetch('/api/cart')
		.then( response => response.json())
		.then( data => {
			if ( data && data.success ) {
				setCart( data.items )
				setTotalQuantity( data.count )
				setTotalAmount( data.subtotal )
				return setLoading(false)
			}
			return
		} )
		.catch((err) => console.log('Can not load cart at these moment'))

	},[])

	const addToCart = ( _id, title, image, price ) => ( event ) => {

		event.preventDefault()

		setLoading(true)

		fetch('/api/addtocart', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			body: JSON.stringify({ _id: _id, title:title, image:image, price:price })
		}
		)
		.then((resp) => resp.json())
		.then((data) => {

			if (data && data.success ) {
				return (
					fetch('/api/cart')
					.then( response => response.json())
					.then( data => {
						if ( data && data.success ) {
							setCart( data.items )
							setTotalQuantity( data.count )
							setTotalAmount( data.subtotal )
							return setLoading(false)
						}
						return
					} )
					.catch((err) => console.log('Can not load cart at these moment'))
				)
			}
			return console.log('Not added')
		})
		.catch((err) => console.log('Please wait for sometime'))

	}

	const removeFromCart = ( _id, price ) => ( event ) => {

		event.preventDefault()

		setLoading(true)

		fetch('/api/removefromcart', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data'
			},
			body: JSON.stringify({ _id: _id, price:price })
		}
		)
		.then((resp) => resp.json())
		.then((data) => {

			if (data && data.success ) {
				return (
					fetch('/api/cart')
					.then( response => response.json())
					.then( data => {
						if ( data && data.success ) {
							setCart( data.items )
							setTotalQuantity( data.count )
							setTotalAmount( data.subtotal )
							return setLoading(false)
						}
						return
					} )
					.catch((err) => console.log('Can not load cart at these moment'))
				)
			}
			return console.log('Not removed')
		})
		.catch((err) => console.log('Please wait for sometime'))
	}

	return (
		<>
			<NextNProgress color="black" options={{ showSpinner: false }} />
			<Navbar 
				cart={cart} 
				totalQuantity={totalQuantity} 
				totalAmount={totalAmount}
				addToCart={addToCart}
				removeFromCart={removeFromCart}
				loading={loading}
			/>
			<Component {...pageProps} addToCart={addToCart} removeFromCart={removeFromCart} />
		</>
	)
}

export default MyApp

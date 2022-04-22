import React from 'react'
import Link from 'next/link'

import Cart from '../../icons/Cart'
import Cross from '../../icons/Cross'
import Logo from '../../icons/Logo'
import Spinner from '../Spinner/Spinner'

const Navbar = ( { cart, loading, totalQuantity, totalAmount, addToCart, removeFromCart } ) => {

	const toggleCart = () => {
		if ( ref.current.classList.contains('translate-x-full') ){
			ref.current.classList.remove('translate-x-full')
			ref.current.classList.add('translate-x-0')
		} else if ( !ref.current.classList.contains('translate-x-full') ){
			ref.current.classList.remove('translate-x-0')
			ref.current.classList.add('translate-x-full')
		}
	}

	const ref = React.useRef()

	const cartElements = cart.map( ( item ) => {
		return (
				<li key={item._id}>
					<div className="item flex my-5 items-center justify-center">
						<div className='w-2/3 font-semibold mx-4'>{ item.title }</div>
						<img className='mx-4' width="50px" src={item.image} alt={item.title}/>
						<div className='flex font-semibold items-center justify-center'>
							<button onClick={addToCart( item._id, item.title, item.image, item.price )} className='outline-0'>Add</button>
							<span className='mx-3'>{item.quantity}</span>
							<button onClick={removeFromCart( item._id, item.price )} className='outline-0'>Remove</button>
						</div>
					</div>
				</li>
		)
	} )

	return (
		<div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
			<div className='logo mx-5'>
				<Link href={'/'}>
					<a>
						<Logo/>
					</a>
				</Link>
			</div>
			<div className='nav mx-10'>
				<ul className='flex items-center space-x-6 font-bold md:text-md'>
					<Link href={'/'}>
						<a><li>All</li></a>
					</Link>
					<Link href={'/mobiles'}>
						<a><li>Mobiles</li></a>
					</Link>
					<Link href={'/hoodies'}>
						<a><li>Hoodies</li></a>
					</Link>
				</ul>
			</div>
			<div onClick={toggleCart} className='cart absolute right-0 top-4 mx-5'>
				<span className="relative inline-block cursor-pointer">
					<Cart className='text-xl md:text-2xl cursor-pointer'/>
					<span className="absolute top-2 right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black bg-yellow-500 transform translate-x-1/2 -translate-y-1/2 rounded-full">{totalQuantity}</span>
				</span>
			</div>	
			<div  ref={ref} className='sidecart w-96 h-full overflow-y-auto absolute top-0 right-0 bg-pink-100 px-2 py-10 transform transition-transform translate-x-full'>
				<div onClick={toggleCart} className='absolute top-4 right-3 cursor-pointer'><Cross/></div>
				<h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
				{
					totalQuantity > 0 ?
						loading ? <Spinner type={'Cart'} /> :
						<>
							<h2 className='font-bold text-xl text-center'>Total Items : {totalQuantity}</h2>
							<h2 className='font-bold text-xl text-center'>Sub Total : Rs. {totalAmount}</h2>
							<ol className='list-decimal px-5'>
								{cartElements}
							</ol>
						</>
					:
					<h2 className='text-center my-4'>Shopping Cart Empty</h2>
				}
			</div>	
		</div>
	)
}

export default Navbar

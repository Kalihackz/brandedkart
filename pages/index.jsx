import React from 'react'
import Head from 'next/head'

export default function Home( { data, addToCart, removeFromCart } ) {

	const listElements = (data.items).map(( item ) => {
		return (
				<div key={item._id} className='border flex flex-col justify-center items-center shadow-lg mx-20 my-10'>
					<img src={item.image} className='w-9/12' alt={item.title} />
					<div title={item.title} className='text-center'>{item.title.length>30?`${item.title.substring(0, 30)}...`:item.title}</div>
					<div title={item.title} className='text-center'>Price : Rs. {item.price}</div>
					<div className='flex justify-evenly my-5' style={{width: '226px'}}>
						<button className='p-2 bg-pink-500 rounded w-24' onClick={addToCart( item._id, item.title, item.image, item.price )} >Add</button>
						<button className='p-2 bg-pink-500 rounded w-24' onClick={removeFromCart( item._id, item.price )} >Remove</button>
					</div>
				</div>
		)
	})

	return (
		<div>
			<Head>
				<title>Branded Kart</title>
				<meta charSet="UTF-8" />
				<meta name="description" content="Welcome to Branded Kart" />
				<meta property="og:site_name" content="Branded Kart" />
				<meta property="og:url" content="https://brandedkart-kalihackz.vercel.app/" />
				<meta property="og:image" content="https://brandedkart-kalihackz.vercel.app/favicon.ico" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://brandedkart-kalihackz.vercel.app/" />
				<link rel="icon" href="/favicon.ico" type="image/icon type" />
			</Head>
			<div className='h-56 bg-slate-300 flex flex-col justify-center items-center'>
				<div className='text-3xl md:text-6xl lg:text-6xl py-3'>Welcome to Branded Kart</div>
				<div className='text-xl md:text-2xl lg:text-2xl'>An E-commerce store by Abir Ghosh</div>
			</div>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{listElements}
			</div>
		</div>
	)
}

export async function getServerSideProps() {

    const res = await fetch(`${process.env.SERVER_URI}/api/items`)
    const data = await res.json()

    if ( data.success === false) {
        return {
          notFound: true,
        }
    }
    
    // Pass data to the page via props
    return { props: { data } }
}

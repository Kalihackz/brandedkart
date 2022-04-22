import React from 'react'
import Head from 'next/head'

export default function hoodies( { data, addToCart, removeFromCart } ) {

	const listElements = (data.items).map(( item ) => {
		return (
				<div key={item._id} className='border flex flex-col justify-center items-center shadow-lg mx-20 my-10'>
					<img src={item.image} className='w-9/12' alt={item.title} />
					<div title={item.title} className='text-center p-4'>{item.title.length>30?`${item.title.substring(0, 30)}...`:item.title}</div>
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
				<title>Branded Kart | Hoodies</title>
				<meta charSet="UTF-8" />
				<meta name="description" content="Welcome to Hoodies Section" />
				<meta property="og:site_name" content="Branded Kart" />
				<meta property="og:url" content="https://brandedkart-kalihackz.vercel.app/" />
				<meta property="og:image" content="https://brandedkart-kalihackz.vercel.app/favicon.ico" />
				<meta property="og:locale" content="en_GB" />
				<meta name="referrer" content="origin" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="canonical" href="https://brandedkart-kalihackz.vercel.app/" />
				<link rel="icon" href="/favicon.ico" type="image/icon type" />
			</Head>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{listElements}
			</div>
		</div>
	)
}

export async function getServerSideProps() {

    const res = await fetch(`${process.env.SERVER_URI}/api/items/hoodie`)
    const data = await res.json()

    if ( data.success === false) {
        return {
          notFound: true,
        }
    }
    
    // Pass data to the page via props
    return { props: { data } }
}

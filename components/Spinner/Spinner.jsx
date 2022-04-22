import React from 'react'
import spinner from './loading.gif'

const Spinner = ( { type } ) => {
    
    return (
		<>
			<div className='flex flex-col justify-center items-center' style={{height:'50vh'}}>
				<img src={spinner.src} alt="Loading..."/> 
				Loading {type}
			</div>
		</>
    )
}

export default Spinner

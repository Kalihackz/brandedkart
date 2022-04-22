import dbConnect from '../../middleware/dbConnect';
import Cart from '../../models/cart';
import Items from '../../models/items';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'POST' ) {

        let data = JSON.parse( req.body )

        try{

            const item = await Cart.findById( { _id: data._id } ).exec()

            const originalItem = await Items.findById( { _id: data._id } ).exec()

            if ( item ) {
                
                item.quantity = item.quantity - 1
                item.price = item.price - originalItem.price
                await item.save()
    
            } 

            if ( item.quantity<=0 ) {

                await Cart.deleteOne( { _id: item._id } )
    
            }

        }catch(err){
            console.log(err)
        }

        res.status(200).json({ success: true })
    
    } else {

        res.status(400).json({ success: false })
    }
}
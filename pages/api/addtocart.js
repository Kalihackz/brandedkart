import dbConnect from '../../middleware/dbConnect';
import Cart from '../../models/cart';
import Items from '../../models/items';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'POST' ) {

        let data = JSON.parse( req.body )

        console.log(req.body)

        try{
            const item = await Cart.findById( { _id: data._id } ).exec()

            const originalItem = await Items.findById( { _id: data._id } ).exec()

            console.log(item)

            if ( item!==null ) {
                
                item.quantity = item.quantity + 1
                item.price = item.price + originalItem.price
                console.log("+1")
                await item.save()
    
            } else {
                let item = new Cart({
                    _id: data._id,
                    title: data.title,
                    image: data.image,
                    quantity: 1,
                    price: data.price
                })
    
                await item.save()
                console.log("NEW")
            }
            
        }catch(err){
            console.log(err)
        }

        res.status(200).json({ success: true })
    
    } else {

        res.status(400).json({ success: false })
    }
}
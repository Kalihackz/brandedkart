import dbConnect from '../../middleware/dbConnect';
import Cart from '../../models/cart';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        try {
          const items = await Cart.find().exec()
          let sum = 0; let totalItems = 0; 
          for ( let i = 0 ; i < items.length; i++ ) {
            sum = sum + items[i].price
            totalItems = totalItems + items[i].quantity
          }
          const count = await Cart.countDocuments({})
          if ( count < 1 ) return res.status(200).json({ success: true, items: [], count: 0, subtotal: 0 })
          res.status(200).json({ success: true, items: items, count: totalItems, subtotal: sum })
      } catch (error) {
          console.log(error)
          res.status(404).json({ success: false, items: [], count: 0, subtotal: 0 })
      }

    } else {

        res.status(400).json({ success: false })        

    }
}
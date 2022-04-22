import dbConnect from '../../../middleware/dbConnect';
import Items from '../../../models/items';

export default async function handler(req, res) {
    
    await dbConnect()

    if ( req.method === 'GET' ) {

        try {
          const items = await Items.find().exec()
          const count = await Items.countDocuments({})
          console.log(items)
          if ( count < 1 ) return res.status(200).json({ success: true, items: [] })
          res.status(200).json({ success: true, items: items })
      } catch (error) {
          res.status(404).json({ success: false, items: [] })
      }

    } else {

        res.status(400).json({ success: false })        

    }
}
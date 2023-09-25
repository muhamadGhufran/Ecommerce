import { mongooseConnect } from "@/lib/mongoose";
import {User} from '@/models_client/user'

export default async function handle(req, res){
    const {method} = req;
    await mongooseConnect()

    if (method === "POST") {
        const { name, email, password } = req.body;
        const UserDoc = await User.create({
          name,
          email,
          password,
        });
        res.json(UserDoc);
      }
}

// if (method === 'POST'){
//   const{title, description, price, images, category, properties} = req.body;
//   const productDoc = await Product.create({
//       title, description, price,images, category, properties
//   })
//   res.json(productDoc)
// }
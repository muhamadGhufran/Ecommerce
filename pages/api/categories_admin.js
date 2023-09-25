import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models_admin/Category";


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();


  if (method === "GET") {
    res.json(await Category.find().populate('parent'));
  }

  if (method === "POST") {
    const { category, parentCategory,properties } = req.body;
    const CategoryDoc = await Category.create({
      category,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(CategoryDoc);
  }

  if(method === 'PUT'){
    const {category, parentCategory,properties,_id} = req.body;
    const CategoryDoc = await Category.updateOne({_id},{
      category,
      parent:parentCategory || undefined,
      properties,
    })
    res.json(CategoryDoc)
  }

  if(method === 'DELETE'){
    const {_id} = req.query;
    await Category.deleteOne({_id});
    res.json('ok')
  }
}

import { mongooseConnect } from "@/lib/mongoose";
import Admin from "@/models_admin/admin";

export default async function handle(req, res) {
  const { method, query } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (query?.id) {
      res.json(await Admin.findOne({ _id: query.id }));
    } else {
      res.json(await Admin.find());
    }
  }

  if (method === "DELETE") {
    if (query?.id) {
      await Admin.deleteOne({ _id: query.id });
      res.json(true);
    }
  }
}
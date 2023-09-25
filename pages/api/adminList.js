// pages/api/admins.js
import { mongooseConnect } from '@/lib/mongoose'; 
import Admin from '@/models_admin/admin';

export default async function handler(req, res) {
  // Connect to the database
  await mongooseConnect();

  try {
    // Fetch all admins
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

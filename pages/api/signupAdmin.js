import { hash } from 'bcrypt';
import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models_admin/admin';
import mongoose from 'mongoose';

const handler = async (req, res) => {
  mongooseConnect();

  if (req.method === 'POST') {
    console.log('Post of signup admin');
    if (!req.body) return res.status(400).json({ error: 'Data is missing' });

    const { fullName, emailAdmin, password } = req.body;

    const adminExists = await Admin.findOne({ emailAdmin }) // Set timeout to 15 seconds (15000ms)

      if (adminExists) {
        return res.status(409).json({ error: 'User Already exists' });
      }else{
      if (password.length < 6) {
        return res.status(409).json({ error: 'Password should be 6 characters long' });
        const hashedPassword = await hash(password, 12);
      }

      try {
      const createdUser = await Admin.create({
        fullName,
        emailAdmin,
        password: hashedPassword,
      });

      const user = {
        emailAdmin: createdUser.emailAdmin,
        fullName: createdUser.fullName,
        _id: createdUser._id,
      };

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error('Error in signup admin:', error);

      if (error instanceof mongoose.Error.ValidationError) {
        for (let field in error.errors) {
          const msg = error.errors[field].message;
          return res.status(409).json({ error: msg });
        }
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;

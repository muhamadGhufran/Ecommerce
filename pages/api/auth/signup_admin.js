// import {hash} from 'bcrypt'
// import {mongooseConnect} from '@/lib/mongoose'
// import Admin from '@/models_admin/admin';
// import mongoose from 'mongoose'

// const handler = async (req, res) => {
//     mongooseConnect();
  
//     if (req.method === "POST") {
//       if (!req.body) return res.status(400).json({ error: "Data is missing" });
  
//       const { fullName, emailAdmin, password,confirmPassword } = req.body;
//       console.log(req.body);
  
//       const adminExists = await Admin.findOne({ emailAdmin });
  
//       if (adminExists) {
//         return res.status(409).json({ error: "Admin Already exists" });
//       } else {
//         if (password.length < 6)
//           return res.status(409).json({ error: "Password should be 6 characters long" });
  
//           const hashedPassword = await hash(password, 12);
//           const hashedConfirmPassword = await hash(confirmPassword, 12);
  
//         try {
//           const createdAdmin = await Admin.create({
//             fullName,
//             emailAdmin,
//             password: hashedPassword,
//             confirmPassword: hashedConfirmPassword,
//           });
  
//           const admin = {
//             emailAdmin: createdAdmin.emailAdmin,
//             fullName: createdAdmin.fullName,
//             _id: createdAdmin._id,
//           };
  
//           return res.status(201).json({
//             success: true,
//             admin,
//           });
//         } catch (error) {
//           if (error instanceof mongoose.Error.ValidationError) {
//             for (let field in error.errors) {
//               const msg = error.errors[field].message;
//               return res.status(409).json({ error: msg });
//             }
//           }
  
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//       }
//     } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//     }
//   };

  // export default handler;
  
import { hash } from 'bcrypt';
import { mongooseConnect } from '@/lib/mongoose';
import Admin from '@/models_admin/admin';
import mongoose from 'mongoose';

const handler = async (req, res) => {
  mongooseConnect();

  if (req.method === 'POST') {
    if (!req.body) return res.status(400).json({ error: 'Data is missing' });

    const { fullName, emailAdmin, password, confirmPassword } = req.body;
    console.log(req.body);

    const adminExists = await Admin.findOne({ emailAdmin });

    if (adminExists) {
      return res.status(409).json({ error: 'Admin Already exists' });
    } else {
      if (password.length < 6)
        return res.status(409).json({ error: 'Password should be 6 characters long' });

      const hashedPassword = await hash(password, 12);

      try {
        const createdAdmin = await Admin.create({
          fullName,
          emailAdmin,
          password: hashedPassword,
        });

        const admin = {
          emailAdmin: createdAdmin.emailAdmin,
          fullName: createdAdmin.fullName,
          _id: createdAdmin._id,
        };

        return res.status(201).json({
          success: true,
          admin,
        });
      } catch (error) {
        console.error('Error creating admin:', error); // Log the error for debugging

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

// import { hash } from 'bcrypt';
// import { mongooseConnect } from '@/lib/mongoose';
// import Admin from '@/models_admin/admin';
// import mongoose from 'mongoose';

// const handler = async (req, res) => {
//   try {
//     mongooseConnect();

//     if (req.method === 'POST') {
//       if (!req.body) {
//         console.error('Request body is missing.');
//         return res.status(400).json({ error: 'Data is missing' });
//       }

//       const { fullName, emailAdmin, password, confirmPassword } = req.body;
//       console.log('Received request body:', req.body);

//       const adminExists = await Admin.findOne({ emailAdmin });

//       if (adminExists) {
//         console.error('Admin already exists.');
//         return res.status(409).json({ error: 'Admin Already exists' });
//       } else {
//         if (password.length < 6) {
//           console.error('Password should be at least 6 characters long.');
//           return res.status(409).json({ error: 'Password should be 6 characters long' });
//         }

//         const hashedPassword = await hash(password, 12);
//         const hashedConfirmPassword = await hash(confirmPassword, 12);

//         const createdAdmin = await Admin.create({
//           fullName,
//           emailAdmin,
//           password: hashedPassword,
//           confirmPassword: hashedConfirmPassword,
//         });

//         const admin = {
//           emailAdmin: createdAdmin.emailAdmin,
//           fullName: createdAdmin.fullName,
//           _id: createdAdmin._id,
//         };

//         console.log('Admin created:', admin);

//         return res.status(201).json({
//           success: true,
//           admin,
//         });
//       }
//     } else {
//       console.error('Method Not Allowed.');
//       res.status(405).json({ error: 'Method Not Allowed' });
//     }
//   } catch (error) {
//     console.error('Internal Server Error:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export default handler;

// import {hash} from 'bcrypt'
// import {mongooseConnect} from '@/lib/mongoose'
// import Admin from '@/models_admin/admin'
// import mongoose from 'mongoose'

// const handler = async (req, res) => {
//     mongooseConnect();
  
//     if (req.method === "POST") {
//       console.log("Post of signup admin")
//       if (!req.body) return res.status(400).json({ error: "Data is missing" });
  
//       const { fullName, emailAdmin, password, confirmPassword } = req.body;
  
//       const adminExists = await Admin.findOne({ emailAdmin });
  
//       if (adminExists) {
//         return res.status(409).json({ error: "User Already exists" });
//       } else {
//         if (password.length < 6)
//           return res.status(409).json({ error: "Password should be 6 characters long" });
  
//           const hashedPassword = await hash(password, 12);
  
//         try {
//           console.log("try of signup admin")
//           const createdUser = await Admin.create({
//             fullName,
//             emailAdmin,
//             password: hashedPassword,
//             confirmPassword,
//           });
  
//           const user = {
//             emailAdmin: createdUser.emailAdmin,
//             fullName: createdUser.fullName,
//             _id: createdUser._id,
//           };
  
//           return res.status(201).json({
//             success: true,
//             user,
//           });
//         } catch (error) {
//           if (error instanceof mongoose.Error.ValidationError) {
//             for (let field in error.errors) {
//               const msg = error.errors[field].message;
//               return res.status(409).json({ error: msg });
//             }
//           }
  
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//       }
//     } else {
//       res.status(405).json({ error: "Method Not Allowed" });
//     }
//   };
  
//   export default handler;
  

// import { hash } from 'bcrypt';
// import { mongooseConnect } from '@/lib/mongoose';
// import mongoose from 'mongoose';
// import  {Admin} from '@/models_admin/admin';

// const handler = async (req, res) => {
//   mongooseConnect();
 
//   if (req.method === 'POST') {
//     console.log('Post of signup admin');
//     if (!req.body) return res.status(400).json({ error: 'Data is missing' });

//     const { fullName, emailAdmin, password } = req.body;

//     const adminExists = await Admin.findOne({ emailAdmin }) // Set timeout to 15 seconds (15000ms)

//       if (adminExists) {
//         return res.status(409).json({ error: 'User Already exists' });
//       }else{
//         if (password.length < 6)
//         return res.status(409).json({ error: 'Password should be 6 characters long' });
//         const hashedPassword = await hash(password, 12);
//       try {
//         const createdUser = await Admin.create({
//         fullName,
//         emailAdmin,
//         password: hashedPassword,
//         });

//         const user = {
//         emailAdmin: createdUser.emailAdmin,
//         fullName: createdUser.fullName,
//         _id: createdUser._id,
//         };

//         return res.status(201).json({
//         success: true,
//         user,
//         });
//       }   catch (error) {
//       console.error('Error in signup admin:', error);

//       if (error instanceof mongoose.Error.ValidationError) {
//         for (let field in error.errors) {
//           const msg = error.errors[field].message;
//           return res.status(409).json({ error: msg });
//         }
//       }

//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default handler;

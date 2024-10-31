import express, { Request, Response } from 'express';
import { getDatabase, set, ref, get, update, remove, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import cors from 'cors';

const appPath = express();
const PORT = process.env.PORT || 1234;

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://project-healthy-e1b33-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database
const db = getDatabase(app);

// Middleware
appPath.use(express.json());
appPath.use(cors());

// Route: Get All Users
appPath.get('/users', async (req: any, res: any) => {
    try {
<<<<<<< Updated upstream
        get(ref(db, 'users'))
            .then((users) => {
                if (!users.exists()) {
                    res.status(404).json({ message: 'No Data' })
                }
                res.json({
                    data:[
                         {
                        users
                    }
                    ]
                })
            })
    } catch (error) {
        res.status(500).json({ message: 'No Data' })
    }
});
// get Data id
appPath.get('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        get(ref(db, `users/${id}`))
            .then((user) => {
                if (!user.exists()) {
                    res.status(404).json({ message: 'No Data' })
                }
                res.json({
                    data: [
                         {
                        users
                    }
                    ]
                })
            })
            })
    } catch (error) {
        res.status(500).json({ message: 'No Data' })
=======
        const snapshot = await get(ref(db, 'users'));
        if (!snapshot.exists()) {
            return res.status(404).json({ message: 'No Data' });
        }
        res.json(snapshot.val());
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
>>>>>>> Stashed changes
    }
});

// Route: Get User by ID
appPath.get('/users/:id', async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const snapshot = await get(ref(db, `users/${id}`));
        if (!snapshot.exists()) {
            return res.status(404).json({ message: 'No Data' });
        }
        res.json(snapshot.val());
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
});

// Route: Create New User
appPath.post('/users', async (req: any, res: any) => {
    try {
        const { fullname } = req.body;
        const newUserRef = push(ref(db, 'users/'));
        const newUserId = newUserRef.key;
        const snapshot = await get(ref(db, 'users'));

        await set(ref(db, 'users'), [{
            id: newUserId,
            name: fullname,
            balance: 100,
            mil: new Date().getTime(),
            date: new Date().toString()
        }]);

        res.json({
            message: 'User created successfully',
            id: newUserId
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Route: Update User
appPath.put('/users/:id', async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const data = req.body;

        await update(ref(db, `users/${id}`), data);

        res.json({
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});

// Route: Delete User
appPath.delete('/users/:id', async (req: any, res: any) => {
    try {
        const id = req.params.id;

        await remove(ref(db, `users/${id}`));

        res.json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});

// Start the server
appPath.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

import express, { Request, Response } from 'express';
import { getDatabase, set, ref, get, update, remove, push, } from 'firebase/database'
import { initializeApp } from 'firebase/app';

const appPath = express();
const PORT = process.env.PORT || 1234;

// function configure
const firebaseConfig = {
    databaseURL: "https://project-healthy-e1b33-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)

// GetDatabase Function
const db = getDatabase(app)

// use
appPath.use(express.json());

// Route Get Data
appPath.get('/users', (req: Request, res: Response) => {
    try {
        get(ref(db, 'users'))
            .then((users) => {
                if (!users.exists()) {
                    res.status(404).json({ message: 'No Data' })
                }
                res.json({
                    data: {
                        users
                    }
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
                res.json(user.val())
            })
    } catch (error) {
        res.status(500).json({ message: 'No Data' })
    }
});

// Route Post Data
// Route Post Data
appPath.post('/users', (req: Request, res: Response) => {
    try {
        const { fullname } = req.body; // set Full Name From Request
        const newUserRef = push(ref(db, 'users')); // สร้างการอ้างอิงใหม่และ ID อัตโนมัติ
        const newUserId = newUserRef.key; // รับ ID ที่สร้างขึ้น

        // ตั้งค่าข้อมูลผู้ใช้
        set(newUserRef, {
            id: newUserId,
            name: fullname,
            balance: 100,
            mil: new Date().getTime(),
            date: new Date() + ''
        });

        res.json({
            message: `User created successfully`,
            id: newUserId // ส่งกลับ ID ที่สร้างขึ้น
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
});


// Route Update Data
appPath.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const data = req.body //set Data From Request
        update(ref(db, 'users/' + id), data)

        res.json({
            message: `Good`
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in' })
    }
})

// Route Delete Data
appPath.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id
        remove(ref(db, 'users/' + id))

        res.json({
            message: `Good`
        })
    } catch (error) {
        res.status(500).json({ message: 'Failed to log in' })
    }
})




appPath.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

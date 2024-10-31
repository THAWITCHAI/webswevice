"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("firebase/database");
const app_1 = require("firebase/app");
const cors_1 = __importDefault(require("cors"));
const appPath = (0, express_1.default)();
const PORT = process.env.PORT || 1234;
// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://project-healthy-e1b33-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Firebase Database
const db = (0, database_1.getDatabase)(app);
// Middleware
appPath.use(express_1.default.json());
appPath.use((0, cors_1.default)());
// Route: Get All Users
appPath.get('/users', async (req, res) => {
    try {
        const snapshot = await (0, database_1.get)((0, database_1.ref)(db, 'users'));
        if (!snapshot.exists()) {
            return res.status(404).json({ message: 'No Data' });
        }
        res.json({ data: snapshot.val() });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});
// Route: Get User by ID
appPath.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const snapshot = await (0, database_1.get)((0, database_1.ref)(db, `users/${id}`));
        if (!snapshot.exists()) {
            return res.status(404).json({ message: 'No Data' });
        }
        res.json({ data: snapshot.val() });
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user' });
    }
});
// Route: Create New User
appPath.post('/users', async (req, res) => {
    try {
        const { fullname } = req.body;
        const newUserRef = (0, database_1.push)((0, database_1.ref)(db, 'users'));
        const newUserId = newUserRef.key;
        await (0, database_1.set)(newUserRef, {
            id: newUserId,
            name: fullname,
            balance: 100,
            mil: new Date().getTime(),
            date: new Date().toString()
        });
        res.json({
            message: 'User created successfully',
            id: newUserId
        });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});
// Route: Update User
appPath.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await (0, database_1.update)((0, database_1.ref)(db, `users/${id}`), data);
        res.json({
            message: 'User updated successfully'
        });
    }
    catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
});
// Route: Delete User
appPath.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await (0, database_1.remove)((0, database_1.ref)(db, `users/${id}`));
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
});
// Start the server
appPath.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

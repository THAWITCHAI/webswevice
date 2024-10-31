import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json());
app.use(cors());


app.get('/users', (req: Request, res: Response) => {
    try {
        const users = [
            { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 1 },
            { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 1 },
            { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', status: 1 },
            { id: 4, name: 'Thawitchai Boonsong', email: 'thawitchai.johnson@example.com', status: 1 }
        ];
        res.json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

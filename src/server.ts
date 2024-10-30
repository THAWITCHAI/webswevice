import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Hello, World!'
    })
});

app.post('/login', (req: Request, res: Response) => {
    const {username,password} = req.body
    console.log({
        username,
        password
    });
    res.json({
        message: `Logged in as ${username}`
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const express = require('express');
const fs = require("fs");
const cors = require('cors');
const path = require('path');
const pool = require('./db');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// post a hero
app.post('/heroes', upload.array('images', 5), async (req, res) => {
    try {
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        const newHero = await pool.query(
            "INSERT INTO heroes (nickname, real_name, origin_description, superpowers, catch_phrase, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [nickname, real_name, origin_description, superpowers, catch_phrase, imagePaths]
        );

        res.json(newHero.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all heroes
app.get('/heroes', async (req, res) => {
    try {
        const heroes = await pool.query(
            'SELECT * FROM heroes ORDER BY id',
        );

        res.json(heroes.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// get details on hero
app.get('/heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const hero = await pool.query(
            'SELECT * FROM heroes WHERE id = $1',
            [id]
        );

        res.json(hero.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update heroes info
app.put('/heroes/:id', upload.array('images', 5), async (req, res) => {
    try {
        const { id } = req.params;
        const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

        let existingImages = [];
        if (req.body.existingImages) existingImages = Array.isArray(req.body.existingImages) ? req.body.existingImages : [req.body.existingImages];

        const newImages = req.files.map(file => `/uploads/${file.filename}`);

        const finalImages = [...existingImages, ...newImages];

        const updatedHero = await pool.query(
            'UPDATE heroes SET nickname=$1, real_name=$2, origin_description=$3, superpowers=$4, catch_phrase=$5, images=$6 WHERE id=$7 RETURNING *',
            [nickname, real_name, origin_description, superpowers, catch_phrase, finalImages, id]
        );

        res.json(updatedHero.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete hero
app.delete('/heroes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const heroResult = await pool.query("SELECT images FROM heroes WHERE id = $1", [id]);
        const images = heroResult.rows[0].images || [];

        await pool.query("DELETE FROM heroes WHERE id = $1", [id]);

        images.forEach(imgPath => {
            const fullPath = path.join(__dirname, imgPath);
            if (fs.existsSync(fullPath)) {
                fs.unlink(fullPath, (err) => {
                    if (err) console.error("Error deleting file:", fullPath, err);
                });
            }
        });

        res.json({ message: "Hero was deleted" });
    } catch (err) {
        console.error(err.message);
    }
});

const port = 5000;

app.listen(port, () => {
    console.log('listening');
});

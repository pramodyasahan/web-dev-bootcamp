const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

const Movie = mongoose.model('Movie', movieSchema)
const dune = new Movie({title: 'Dune', year: 2020, score: 8.9, rating: 'R'})
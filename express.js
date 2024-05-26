const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviews', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Review Schema
const reviewSchema = new mongoose.Schema({
    productId: String,
    userName: String,
    rating: Number,
    reviewText: String,
    photo: String,
    video: String,
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

// API Endpoint to submit a review
app.post('/api/reviews', async (req, res) => {
    const review = new Review(req.body);
    try {
        await review.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(400).send(error);
    }
});

// API Endpoint to get reviews for a product
app.get('/api/reviews/:productId', async (req, res) => {
    const reviews = await Review.find({ productId: req.params.productId });
    res.send(reviews);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

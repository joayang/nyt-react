// Require mongoose
const mongoose = require("mongoose");
// Create schema
const Schema = mongoose.Schema;
// Create arcticle schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
    
});
// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;

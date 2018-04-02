// Require mongoose
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
const ArticleSchema = new Schema({
  headline: {
    type: String,
    required: false
  },
  byline: {
    type: String,
    required: false
  },
  web_url: {
    type: String,
    required: false
  }
});

// Create the Article model with the ArticleSchema
const Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;

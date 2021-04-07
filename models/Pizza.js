const dateFormat = require('../utils/dateFormat');
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal) // use "getters" to transform the data by default. The value in createdAt field will be formatted by the dateFormat() instead of the default timestamp value
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true // use "getters"
    },
    id: false
  } 
  
  );

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;
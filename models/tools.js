const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    toolName: {type: String , required: true},
    toolType: {type: String},
    toolQty: {type: Number },
    toolPartNumber: {type: String }, 
    toolCost: {type: String},
    newTool: {type: Boolean},
    notes: {type: String},
})

const Tool = mongoose.model('Tool' , toolSchema);

module.exports = Tool;

import mongoose from 'mongoose';

const requirementSchema = new mongoose.Schema({

eventName:{
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    minlength: [3, 'Event name must be at least 3 characters long'],
    maxlength: [80, 'Event name must be at most 100 characters long']
},
eventType:{
    type: String,
    required: [true, 'Event type is required'],
    trim: true
},
startDate:{
    type: Date,
    required: [true, 'Start date is required']
},
endDate:{
    type: Date,
    required: [true, 'End date is required']    
},
location:{
    type: String,
    trim: true,
    required: [true, 'Location is required']
},
vaenue:{
    type: String,
    trim: true,
    default: ''
},
category:{
    type: String,
    required: [true, 'Category is required'],
    enum:{
        values:['planner','performer','crew'],
        message: 'Category must be either planner, performer or crew'
    },
    details:{
        type:mongoose.Schema.Types.Mixed,
        required: [true, 'Details are required'],
        default:undefined
    }
}

},{
    timestamps: true
});

const Requirement = mongoose.model('Requirement', requirementSchema);
export default Requirement;
require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connect
mongoose.connect("mongodb+srv://Dominators:Dominators%40123@sih.tpsod51.mongodb.net/?appName=SIH", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));


// ***** YEH RAHA BADLAV *****
// Schema ko frontend ke data (name, year, dept...) se match kar diya hai
const scheduleSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    year: { 
        type: String, 
        required: true 
    },
    dept: { 
        type: String, 
        required: true 
    },
    sem: { 
        type: String,
        required: true 
    },
    start: { 
        type: Date, // Date type behtar hai
        required: true 
    },
    end: { 
        type: Date, 
        required: true 
    },
    desc: { 
        type: String,
        required: false // Optional field
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
// **************************


const Schedule = mongoose.model('Schedule', scheduleSchema);

app.get('/', (req, res) => res.send('API is running...'));

app.post('/api/schedules', async (req, res) => {
  try {
    // Ab yeh req.body ko naye schema se match karega
    const schedule = new Schedule(req.body); 
    await schedule.save();
    res.json({ success: true, message: 'Schedule saved!', data: schedule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
// Is line mein ek typo tha (missing quotes), woh bhi fix kar diya hai
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
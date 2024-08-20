const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/familyTree', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a FamilyMember schema
const FamilyMemberSchema = new mongoose.Schema({
    name: String,
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMember' }]
});

const FamilyMember = mongoose.model('FamilyMember', FamilyMemberSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/family-tree', async (req, res) => {
    const rootMember = await FamilyMember.findOne({ name: 'Grandfather' }).populate('children').exec();
    res.json(rootMember);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

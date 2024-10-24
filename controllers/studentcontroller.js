const Student = require('../models/studentmodel');



module.exports = {

    addStudent: async (req, res) => {

        try {

            const student = new Student(req.body);
            const result = await student.save();

            // res.send(result)

            res.send({ message: "New Student added Successfully" });

        } catch (error) {

            console.log(error.message);

}

},
    getAllStudents: async (req, res) => {
await Student.find({}).then((student) => {
res.send(student);
    });
},
    updateStudent: async (req, res) => {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true };
    const result = await Student.findByIdAndUpdate(id, update, options);
        res.send(result);

    }

};
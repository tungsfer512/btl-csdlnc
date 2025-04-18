const express = require("express");
const router = express.Router();
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);

router.post("/", createService);

router.put("/:id", updateService);

router.delete("/:id", deleteService);

const Service = require('../models/Service');
const Student = require('../models/Student');

router.post('/use', async (req, res) => {
    const { student_id, service_id, times_used } = req.body;

    try {
        const service = await Service.findById(service_id);
        
        await Student.updateOne(
            { _id: student_id },
            {
                $push: {
                    services_used: {
                        service_id,
                        service_name: service.service_name,
                        times_used,
                        total_cost: service.price * times_used,
                        start_date: new Date(),
                        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
                    }
                }
            }
        );

        res.status(201).json({ message: 'Thêm dịch vụ thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;

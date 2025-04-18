const Student = require("../models/Student");
const Guest = require("../models/Guest");

exports.getStudentCosts = async (req, res) => {
  try {
    const students = await Student.find().populate('room_id').populate('services_used.service_id');
    const result = students.map(student => ({
      name: student.name,
      room: student.room_id.room_type,
      room_cost: student.monthly_rent,
      services: student.services_used.map(service => ({
        service_name: service.service_name,
        total_cost: service.total_cost
      })),
      total_cost: student.total_amount_due
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServicesByDate = async (req, res) => {
 
  const { start_date, end_date } = req.query;

  let filter = {};

  if (start_date && end_date) {
    filter = {
      "services_used.start_date": { $gte: new Date(start_date) },
      "services_used.end_date": { $lte: new Date(end_date) }
    };
  }

  try {
    const students = await Student.find(filter);
    
    const result = students.map(student => ({
      name: student.name,
      services: student.services_used.map(service => ({
        service_name: service.service_name,
        total_cost: service.total_cost,
        start_date: service.start_date,
        end_date: service.end_date
      }))
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
};

exports.getGuestVisits = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const guests = await Guest.find();

    const results = [];

    for (const guest of guests) {
      for (const visit of guest.visits) {
        const visitDates = visit.visit_dates;

        const filteredDates = start_date && end_date
          ? visitDates.filter(date => date >= new Date(start_date) && date <= new Date(end_date))
          : visitDates;

        if (filteredDates.length > 0) {
          const student = await Student.findById(visit.student_id);

          if (student) {
            results.push({
              student_id: student._id,
              student_name: student.name,
              guest_name: guest.name,
              guest_identity_card: guest.identity_card,
              visit_count: filteredDates.length,
              visit_dates: filteredDates
            });
          }
        }
      }
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServicesCost = async (req, res) => {
  const { start_date, end_date } = req.query;

  try {
    const students = await Student.find();
    const revenueByService = {};

    students.forEach(student => {
      student.services_used.forEach(service => {
        const serviceId = service.service_id;
        const serviceName = service.service_name;
        const totalCost = service.total_cost;
        const startDate = new Date(service.start_date);
        const endDate = new Date(service.end_date);

        if (!start_date && !end_date ||
            (startDate >= new Date(start_date) && endDate <= new Date(end_date))) {
          const monthYear = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}`;

          if (!revenueByService[serviceName]) {
            revenueByService[serviceName] = {
              service_name: serviceName,
              total_revenue: 0,
              monthly_revenue: {}
            };
          }

          revenueByService[serviceName].total_revenue += totalCost;

          if (!revenueByService[serviceName].monthly_revenue[monthYear]) {
            revenueByService[serviceName].monthly_revenue[monthYear] = 0;
          }
          revenueByService[serviceName].monthly_revenue[monthYear] += totalCost;
        }
      });
    });

    const result = Object.values(revenueByService);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

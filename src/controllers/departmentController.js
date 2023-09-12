const departmentRepository = require('../repositories/departmentRepository');
const ValidationContract = require('../util/validators');

exports.createDepartment = async (req, res) => {
  //   let validators = new ValidationContract();
  //   validators.isRequired(req.body.ticket, 'Ticket is required');

  try {
    if (validators.isValid()) {
      await departmentRepository.createDepartment(req.body);
      res.status(201).send('Department created!');
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findAllDepartments = async (req, res) => {
  try {
    const departments = await DepartmentRepository.findAllDepartments();
    if (departments == null || departments.length == 0) {
      res.status(204).send('No Departments found');
    } else {
      res.status(200).send(departments);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findDepartmentById = async (req, res) => {
  const departmentId = req.params.id;
  if (departmentId == null) {
    res.status(400).send('departmentId is required');
  }
  const department = departmentRepository.findDepartmentById(departmentId);

  if (!department) {
    res.status(404).send();
  }

  res.status(200).send(department);
};

exports.updateDepartmentById = async (req, res) => {
  const departmentId = req.params.id;
  await departmentRepository.updateDepartmentById(departmentId, req.body);
  res.status(200).send('Department updated', req.body);
};

exports.deleteDepartmentById = async (req, res) => {
  const departmentId = req.params.id;
  await departmentRepository.deleteAttendanceRecordById(departmentId);
  res.status(204).send('Department deleted', req.body);
};

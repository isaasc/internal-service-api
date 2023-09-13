const departmentRepository = require('../repositories/departmentRepository');
const ValidationContract = require('../util/validators');

exports.createDepartment = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.departmentCode, 'departmentCode is required');
  validators.isRequired(req.body.name, 'name is required');
  validators.isRequired(req.body.idSector, 'idSector is required');
  validators.isObjectIdValid(
    req.body.idSector,
    `idSector: "${req.body.idSector}" is not a ObjectId valid.`,
  );

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
    const departments = await departmentRepository.findAllDepartments();
    if (departments == null || departments.length == 0) {
      res.status(204).send();
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
  let validators = new ValidationContract();
  const departmentId = req.params.id;
  validators.isRequired(departmentId, 'departmentId is required');
  validators.isObjectIdValid(
    departmentId,
    `departmentId: "${departmentId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const department = await departmentRepository.findDepartmentById(
        departmentId,
      );
      if (!department) {
        res.status(204).send();
        return;
      }
      res.status(200).send(department);
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

exports.updateDepartmentById = async (req, res) => {
  let validators = new ValidationContract();
  const departmentId = req.params.id;
  validators.isRequired(departmentId, 'departmentId is required');
  validators.isObjectIdValid(
    departmentId,
    `departmentId: "${departmentId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await departmentRepository.updateDepartmentById(departmentId, req.body);
      res.status(200).send('Department updated');
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

exports.deleteDepartmentById = async (req, res) => {
  let validators = new ValidationContract();
  const departmentId = req.params.id;
  validators.isRequired(departmentId, 'departmentId is required');
  validators.isObjectIdValid(
    departmentId,
    `departmentId: "${departmentId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await departmentRepository.deleteDepartmentById(departmentId);
      res.status(204).send();
    } else {
      res.status(400).send({
        errors: validators.getErrors(),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

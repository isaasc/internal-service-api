const mongoose = require('mongoose');

const Department = mongoose.model('Department');

exports.createDepartment = async (department) => {
  const createdDepartment = Department(department);
  await createdDepartment.save();
};

exports.findAllDepartments = async () => {
  const departments = await Department.find();
  return departments;
};

exports.findDepartmentById = async (departmentId) => {
  const department = await Department.findByOne({ _id: departmentId });
  return department;
};

exports.deleteDepartmentById = async (departmentId) => {
  await Department.findByIdAndDelete(departmentId);
};

exports.updateDepartmentById = async (departmentId, department) => {
  await Department.findByIdAndUpdate(departmentId, {
    $set: {
      departmentCode: department.departmentCode,
      name: department.name,
      sector: department.sector,
    },
  });
};

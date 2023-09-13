const router = require('express').Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.findAllDepartments);
router.get('/:id', departmentController.findDepartmentById);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartmentById);
router.delete('/:id', departmentController.deleteDepartmentById);

module.exports = router;

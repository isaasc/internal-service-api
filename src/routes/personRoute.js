const router = require('express').Router();
const personController = require('../controllers/personController');

router.get('/', personController.findAllPersons);
router.get('/:id', personController.findPersonById);
router.post('/', personController.createPerson);
router.put('/:id', personController.updatePersonById);
router.delete('/:id', personController.deletePersonById);

module.exports = router;

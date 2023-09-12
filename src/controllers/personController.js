const personRepository = require('../repositories/personRepository');
const ValidationContract = require('../util/validators');

exports.createPerson = async (req, res) => {
  let validators = new ValidationContract();
  //validators.isRequired(req.body.payroll, 'Payroll is required');

  try {
    if (validators.isValid()) {
      await personRepository.createPerson(req.body);
      res.status(201).send('Person created!');
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

exports.findAllPersons = async (req, res) => {
  try {
    const persons = await personRepository.findAllPersons();
    if (persons == null || persons.length == 0) {
      res.status(204).send('No Persons found');
    } else {
      res.status(200).send(persons);
    }
  } catch (error) {
    res.status(500).send({
      message: 'Server error.',
    });
  }
};

exports.findPersonById = async (req, res) => {
  const personId = req.params.id;
  if (personId == null) {
    res.status(400).send('PersonId is required');
  }
  const person = personRepository.findPersonById(personId);

  if (!person) {
    res.status(404).send();
  }

  res.status(200).send(person);
};

exports.updatePersonById = async (req, res) => {
  const personId = req.params.id;
  await personRepository.updatePersonById(personId, req.body);
  res.status(200).send('Person updated', req.body);
};

exports.deletePersonById = async (req, res) => {
  const personId = req.params.id;
  await personRepository.deletePersonById(personId);
  res.status(204).send('Person deleted', req.body);
};

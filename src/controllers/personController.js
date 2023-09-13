const personRepository = require('../repositories/personRepository');
const ValidationContract = require('../util/validators');

exports.createPerson = async (req, res) => {
  let validators = new ValidationContract();
  validators.isRequired(req.body.name, 'name is required');
  validators.isRequired(req.body.cpf, 'cpf is required');
  validators.isRequired(req.body.address, 'address is required');

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
      res.status(204).send();
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
  let validators = new ValidationContract();
  const personId = req.params.id;
  validators.isRequired(personId, 'personId is required');
  validators.isObjectIdValid(
    personId,
    `personId: "${personId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      const person = await personRepository.findPersonById(personId);
      if (!person) {
        res.status(204).send();
        return;
      }
      res.status(200).send(person);
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

exports.updatePersonById = async (req, res) => {
  let validators = new ValidationContract();
  const personId = req.params.id;
  validators.isRequired(personId, 'personId is required');
  validators.isObjectIdValid(
    personId,
    `personId: "${personId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await personRepository.updatePersonById(personId, req.body);
      res.status(200).send('Person updated');
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

exports.deletePersonById = async (req, res) => {
  let validators = new ValidationContract();
  const personId = req.params.id;
  validators.isRequired(personId, 'personId is required');
  validators.isObjectIdValid(
    personId,
    `personId: "${personId}" is not a ObjectId valid.`,
  );

  try {
    if (validators.isValid()) {
      await personRepository.deletePersonById(personId);
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

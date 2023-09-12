const { default: mongoose } = require('mongoose');

const Person = mongoose.model('Person');

exports.createPerson = async (person) => {
  const createdPerson = Person(person);
  await createdPerson.save();
};

exports.findAllPersons = async () => {
  const persons = await Person.find();
  return persons;
};

exports.findPersonById = async (personId) => {
  const person = await Person.findByOne({ _id: personId });
  return person;
};

exports.deletePersonById = async (personId) => {
  await Person.findByIdAndDelete(personId);
};

exports.updatePersonById = async (personId, person) => {
  await Person.findByIdAndUpdate(personId, {
    $set: {
      name: person.name,
      cpf: person.cpf,
      address: person.address,
      telephone: person.telephone,
    },
  });
};

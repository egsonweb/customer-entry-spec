import faker from 'faker';

class FakerService {
  generate(count=10) {
    let results = [];
    return new Promise(resolve => {
      for(let i=0; i<count; i++) {
          results.push({
              employeeId: faker.random.uuid(),
              firstname: faker.name.firstName(),
              lastname: faker.name.lastName(),
              phone: faker.phone.phoneNumber(),
              email: faker.internet.email(),
              avatar: faker.internet.avatar(),
              address: {
                  streetName: faker.address.streetName(),
                  streetAddress: faker.address.streetAddress(),
                  city: faker.address.city(),
                  state: faker.address.stateAbbr(),
                  zipcode: faker.address.zipCode()
              },
              job: {
                  title: faker.name.jobTitle(),
                  type: faker.name.jobType()
              }
          })
      }

      resolve(results);
    });
  }
}

export default FakerService;

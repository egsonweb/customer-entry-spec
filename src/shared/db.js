import Low from 'lowdb';
// import faker from 'faker';

class DatabaseService {
  static get $inject() {
    return ['$window', '$rootScope', 'FakerService'];
  }

  constructor($window, $rootScope, FakerService) {
    this.models = Low('db.json');
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.faker = FakerService;
    this.status = null;

    this.models.defaults({employees: []}).write();
  }

  model(entity) {
    return this.models.get(entity);
  }

  resolve(query, delay=0) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(query);
      }, delay)
    });
  }

  seed() {
    return new Promise(resolve => {
      this.status = this.$window.localStorage.getItem('db.status') || false;
      if (!this.status) {
        this.faker.generate().then(employees => {
          this.models.set('employees', employees).write();
          this.$window.localStorage.setItem('db.status', true);
          this.$rootScope.$broadcast('seeded', {
            employees: this.models.get('employees').value(),
            status: this.$window.localStorage.getItem('db.status')
          });
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }
}

export default DatabaseService;

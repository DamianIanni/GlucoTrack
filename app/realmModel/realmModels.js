// realmSchemas.js

import Realm from 'realm';

// Definir la clase base para los modelos
class BaseModel extends Realm.Object {}

// MesModel.js
export class MonthModel extends BaseModel {
  static schema = {
    name: "Month",
    properties: {
      monthName: "string",
      days: { type: 'list', objectType: 'Day' },
    },
  };
}

// DiaModel.js
export class DayModel extends BaseModel {
  static schema = {
    name: "Day",
    properties: {
      number: "int",
      registers: { type: 'list', objectType: 'Register' },
    },
  };
}

// RegistroModel.js
export class RegisterModel extends BaseModel {
  static schema = {
    name: "Register",
    properties: {
      time: 'date',
      value: 'int',
    },
  };
}

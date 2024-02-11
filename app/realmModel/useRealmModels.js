import Realm from 'realm';
import { DayModel, MonthModel, RegisterModel } from './realmModels';

let realm;

// Función para abrir la instancia de Realm
const openRealm = () => {
  try {
    if (!realm) {
      realm = new Realm({ schema: [MonthModel, DayModel, RegisterModel], schemaVersion: 2 });
    }
  } catch (error) {
    console.error("Error al abrir Realm:", error);
  }
};


// Función para cerrar la instancia de Realm
const closeRealm = () => {
  if (realm) {
    realm.close();
    realm = null;
  }
};

export const createMonths = (months) => {
  // try {
  //   openRealm(); // Open the Realm instance
  //   realm.write(() => { // Start a write transaction
  //     realm.deleteAll(); // Delete all objects from the Realm
  //   });
  //   console.log('Database cleared successfully.');
  // } catch (error) {
  //   console.error('Error clearing database:', error);
  // } finally {
  //   closeRealm(); // Close the Realm instance
  // }
  try {
    openRealm(); // Open the Realm instance

    realm.write(() => { // Start the write transaction
      months.forEach(nombreMes => {
        const mesExistente = realm.objects('Month').filtered('monthName = $0', nombreMes);

        if (mesExistente.length === 0) {
          const nuevoMes = realm.create('Month', { monthName: nombreMes, days: [] });
          console.log(`Se ha creado el mes ${nombreMes}.`);
          agregarDiasAlMesExistente(nombreMes);
        } else {
          console.log(`El mes ${nombreMes} ya existe en la base de datos.`);
        }
      });
    });
  } catch (error) {
    console.error("Error en createMonths:", error);
  } finally {
    closeRealm(); // Close the Realm instance after the write transaction is complete
  }
};


// realmOperations.js

// Function to log the details of a specific month
export const logMonthDetails = (monthName) => {
  try {
    openRealm(); // Open the Realm instance
    
    const month = realm.objects('Month').filtered('monthName = $0', monthName)[0];
    
    if (month) {
      console.log(`Details of ${monthName}:`);
      console.log('Days:');
      month.days.forEach((day) => {
        console.log(`- Day ${day.number}: ${day.registers.length} registers`);
      });
    } else {
      console.log(`Month ${monthName} not found in the database.`);
    }
  } catch (error) {
    console.error("Error in logMonthDetails:", error);
  } finally {
    closeRealm(); // Close the Realm instance
  }
};

const obtenerODia = () => {
  return realm.create('Day', { registers: [] });
};

const obtenerDiasEnMes = (anio, mes) => {
  return new Date(anio, mes + 1, 0).getDate();
};

const agregarDiasAlMesExistente = (nombreMesEnIngles) => {
  // Obtener el año actual
  const anioActual = new Date().getFullYear();

  // Obtener el índice del mes en inglés
  const mesesEnIngles = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const indiceMes = mesesEnIngles.indexOf(nombreMesEnIngles);

  // Verificar si el mes ya existe en la base de datos
  const mesExistente = realm.objects('Month').filtered('monthName = $0', mesesEnIngles[indiceMes]);

  // Si el mes existe, agregar los días correspondientes
  if (mesExistente.length > 0 && mesExistente[0].days.length === 0) {
    // realm.write(() => {
      const numDias = obtenerDiasEnMes(anioActual, indiceMes);
      for (let i = 1; i <= numDias; i++) {
        const nuevoDia = { number: i, registers: [] };
        mesExistente[0].days.push(nuevoDia);
      }
      console.log(`Se han agregado los días al mes ${mesesEnIngles[indiceMes]}.`);
    // });
  } else if (mesExistente.length > 0) {
    console.log(`El mes ${mesesEnIngles[indiceMes]} ya tiene días agregados.`);
  } else {
    console.log(`El mes ${mesesEnIngles[indiceMes]} no existe en la base de datos.`);
  }
};

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

export const getMonth = () => {
  return {
    monthName: "February",
    days: [
      {
        number: 1,
        registers: [
          {
            timestamp: "2024-01-01T08:00:00Z",
            value: 120,
          },
          {
            timestamp: "2024-01-01T12:30:00Z",
            value: 110,
          },
        ],
      },
      {
        number: 2,
        registers: [
          {
            timestamp: "2024-01-02T09:15:00Z",
            value: 105,
          },
        ],
      },
      {
        number: 3,
        registers: [],
      },
      {
        number: 4,
        registers: [
          {
            timestamp: "2024-01-04T07:45:00Z",
            value: 115,
          },
          {
            timestamp: "2024-01-04T14:20:00Z",
            value: 125,
          },
        ],
      },
      {
        number: 5,
        registers: [
          {
            timestamp: "2024-01-04T07:45:00Z",
            value: 115,
          },
          {
            timestamp: "2024-01-04T14:20:00Z",
            value: 125,
          },
        ],
      },
    ],
  }
} 

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
          // console.log(`El mes ${nombreMes} ya existe en la base de datos.`);
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

export const getSelectedDay = (monthName, dayNumber) => {
  let selectedDayRegisters
  try {
    openRealm(); // Open the Realm instance
    const selectedMonth = filterMonths(monthName)
    const selectedDay = filterDays(selectedMonth, dayNumber)
    if (selectedDay) {
      selectedDayRegisters = parseRealmObj(selectedDay) 
    }
    return selectedDayRegisters
  } catch (error) {
    console.error("Error retrieving selected month:", error);
    return null;
  } finally {
    closeRealm(); // Close the Realm instance
  }
};

export const pushRegisterToSelectedDay = (monthName, dayNumber, data, indexUsed) => {
  // console.log("DATA TO PUSH", data, indexUsed);
  try {
    openRealm(); // Open the Realm instance
    const selectedMonth = filterMonths(monthName)
    const selectedDay = filterDays(selectedMonth, dayNumber)
    realm.write(() => {
      const selectedDay = filterDays(selectedMonth, dayNumber);
      if (selectedDay) {
        if (indexUsed) return selectedDay.registers.splice(indexUsed, 1, data)
        selectedDay.registers.push(data);
      }
    });
  } catch (error) {
    console.error("Error pushing register to selected day:", error);
    return null;
  } finally {
    closeRealm(); // Close the Realm instance
  }
}

export const deleteSelectedDaySpecificRegister = (monthName, dayNumber, indexToDelete) => {
  try {
    openRealm(); // Open the Realm instance
    const selectedMonth = filterMonths(monthName)
    const selectedDay = filterDays(selectedMonth, dayNumber)
    realm.write(() => {
      const selectedDay = filterDays(selectedMonth, dayNumber);
      if (selectedDay) {
        selectedDay.registers.splice(indexToDelete, 1);
      }
    });
  } catch (error) {
    console.error("Error deleting register into selected day:", error);
    return null;
  } finally {
    closeRealm(); // Close the Realm instance
  }
}

const filterDays = (month, dayNumber) => {
  try {
  const day = month.days.find(day => day.number === dayNumber);
  return day
  } catch (error) {
    console.log("ERROR FILTERING DAY", error);
  }
}

const filterMonths = (monthName) => {
  try {
  const month = realm.objects('Month').filtered('monthName = $0', monthName)[0];
  return month
  } catch (error) {
    console.log("ERROR FILTERING MONTH", error);
  }
}

const parseRealmObj = (obj) => {
  try {
    const parsedObj = JSON.parse(JSON.stringify(obj));
    return parsedObj
  } catch (error) {
    console.log("ERROR PARSING", error);
  }
}

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









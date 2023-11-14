import * as SQLite from "expo-sqlite";

const database_name = "Coursework.db";
const database_version = "1.0";
const database_displayname = "Coursework Database";
const database_size = 2000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS hikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        location TEXT,
        date TEXT,
        parking TEXT,
        length TEXT,
        difficult_level TEXT,
        description TEXT
      );`,
      [],
      () => console.log("Database and table created successfully."),
      (error) => console.log("Error occurred while creating the table.", error)
    );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const searchHikes = (name) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes Where name = ?",
        [name],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addHike = (name, location, date, parking, length, difficult_level, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO hikes (name, location, date, parking, length, difficult_level, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, location, date, parking, length, difficult_level, description],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

  const editHike = (name, location, date, parking, length, difficult_level, description, id) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE hikes SET name = ?, location = ?, date = ?, parking = ?, length = ?, difficult_level = ?, description = ? WHERE id = ?",
          [name, location, date, parking, length, difficult_level, description, id],
          () => {
            resolve();
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

const Database = {
  initDatabase,
  addHike,
  getHikes,
  editHike,
  deleteHike,
  searchHikes,
};

export default Database;
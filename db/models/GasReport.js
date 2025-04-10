class GasReport {
    constructor(db) {
      this.db = db;
    }
  
    
    async create({ driver_id, car_id, booking_id, amount, notes = null }) {
      const query = `
        INSERT INTO Gas_Reports (driver_id, car_id, booking_id, amount, notes)
        VALUES (?, ?, ?, ?, ?)
      `;
      const params = [driver_id, car_id, booking_id, amount, notes];
      return new Promise((resolve, reject) => {
        this.db.run(query, params, function (err) {
          if (err) return reject(err);
          resolve({ report_id: this.lastID });
        });
      });
    }
  
  
    async getById(report_id) {
      const query = `SELECT * FROM Gas_Reports WHERE report_id = ?`;
      return new Promise((resolve, reject) => {
        this.db.get(query, [report_id], (err, row) => {
          if (err) return reject(err);
          resolve(row);
        });
      });
    }
  
    
    async getAll() {
      const query = `SELECT * FROM Gas_Reports ORDER BY date_submitted DESC`;
      return new Promise((resolve, reject) => {
        this.db.all(query, [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    }
  
    // Delete a report
    async delete(report_id) {
      const query = `DELETE FROM Gas_Reports WHERE report_id = ?`;
      return new Promise((resolve, reject) => {
        this.db.run(query, [report_id], function (err) {
          if (err) return reject(err);
          resolve({ deleted: this.changes });
        });
      });
    }
  }
  
  module.exports = (db) => new GasReport(db);
  
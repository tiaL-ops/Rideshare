class BookingModel {
    constructor(db) {
      this.db = db; 
    }
  

    async create({ rider_id, driver_id, car_id, pickup_location, dropoff_location, scheduled_time }) {
      const query = `
        INSERT INTO Bookings (
          rider_id, driver_id, car_id, pickup_location, dropoff_location, scheduled_time
        ) VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [rider_id, driver_id, car_id, pickup_location, dropoff_location, scheduled_time];
      return new Promise((resolve, reject) => {
        this.db.run(query, params, function (err) {
          if (err) return reject(err);
          resolve({ booking_id: this.lastID });
        });
      });
    }
  
   
    async getByDate(date) {
      const query = `
        SELECT * FROM Bookings
        WHERE DATE(scheduled_time) = DATE(?)
        ORDER BY scheduled_time ASC
      `;
      return new Promise((resolve, reject) => {
        this.db.all(query, [date], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    }
  

    async updateStatus(booking_id, status) {
      const query = `UPDATE Bookings SET status = ? WHERE booking_id = ?`;
      return new Promise((resolve, reject) => {
        this.db.run(query, [status, booking_id], function (err) {
          if (err) return reject(err);
          resolve({ updated: this.changes });
        });
      });
    }
  
 
    async getDriverBookings(driver_id, date = null) {
      let query = `SELECT * FROM Bookings WHERE driver_id = ?`;
      const params = [driver_id];
      if (date) {
        query += ` AND DATE(scheduled_time) = DATE(?)`;
        params.push(date);
      }
      query += ` ORDER BY scheduled_time ASC`;
  
      return new Promise((resolve, reject) => {
        this.db.all(query, params, (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
    }
  }
  
  module.exports = BookingModel;
  
class DriverAvailability {
    constructor(db) {
        this.db = db;
    }

    // Add a new availability record
    async addAvailability(driverId, carId, fromTime, toTime) {
        const query = `
            INSERT INTO Driver_Availability (driver_id, car_id, available_from, available_to)
            VALUES (?, ?, ?, ?)
        `;
        return this.db.run(query, [driverId, carId, fromTime, toTime]);
    }

    // Get available drivers for a specific time window
    async getAvailableDrivers(startTime, endTime) {
        const query = `
            SELECT * FROM Driver_Availability
            WHERE available_from <= ?
              AND available_to >= ?
        `;
        return this.db.all(query, [startTime, endTime]);
    }

    // Update an availability to reflect a booking
    async updateAvailabilityAfterBooking(availabilityId, newAvailableFrom, newAvailableTo) {
        const query = `
            UPDATE Driver_Availability
            SET available_from = ?, available_to = ?
            WHERE availability_id = ?
        `;
        return this.db.run(query, [newAvailableFrom, newAvailableTo, availabilityId]);
    }

    // Remove availability if fully booked
    async deleteAvailability(availabilityId) {
        const query = `
            DELETE FROM Driver_Availability
            WHERE availability_id = ?
        `;
        return this.db.run(query, [availabilityId]);
    }


    async getDriverAvailability(driverId) {
        const query = `
            SELECT * FROM Driver_Availability
            WHERE driver_id = ?
        `;
        return this.db.all(query, [driverId]);
    }
}

module.exports = DriverAvailability;

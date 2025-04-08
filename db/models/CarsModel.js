class CarsModel {
    constructor(db) {
        this.db = db;
    }

    getCarById(id) {
        const query = `SELECT * FROM Cars WHERE car_id = ?`;
        const stmt = this.db.prepare(query);
        const result = stmt.get(id);
        return result;
    }

    getCarByModel(model) {
        const query = `SELECT * FROM Cars WHERE model = ?`;
        const stmt = this.db.prepare(query);
        const result = stmt.get(model);
        return result;
    }

    getCarByColor(color) {
        const query = `SELECT * FROM Cars WHERE color = ?`;
        const stmt = this.db.prepare(query);
        const result = stmt.get(color);
        return result;
    }
}

module.exports = CarsModel;

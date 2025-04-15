class UserModel {
    constructor(db) {
        this.db = db;
    }

    // Get user profile info
    getUserById(userId) {
        const query = `SELECT * FROM Users WHERE user_id = ?`;
        const stmt = this.db.prepare(query);
        return stmt.get(userId);
    }

    // Assign role: 'driver' or 'rider'
    assignRole(userId, role) {
        const query = `
            INSERT OR IGNORE INTO User_Roles (user_id, role)
            VALUES (?, ?)
        `;
        const stmt = this.db.prepare(query);
        return stmt.run(userId, role);
    }

    
    getUsersByRole(role) {
        const query = `
            SELECT u.user_id, u.full_name, u.email, u.phone
            FROM Users u
            JOIN User_Roles ur ON u.user_id = ur.user_id
            WHERE ur.role = ?
        `;
        const stmt = this.db.prepare(query);
        return stmt.all(role);
    }

    
    getUserRoles(userId) {
        const query = `
            SELECT role FROM User_Roles
            WHERE user_id = ?
        `;
        const stmt = this.db.prepare(query);
        return stmt.all(userId);
    }
}

module.exports = UserModel;

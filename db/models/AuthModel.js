class AuthModel {
    constructor(db) {
        this.db = db;
    }

    signup(fullname, email, password, phone) {
        const createdAt = new Date().toISOString();

       
        const userInsertQuery = `
            INSERT INTO Users (full_name, email, phone)
            VALUES (?, ?, ?)
        `;
        const userStmt = this.db.prepare(userInsertQuery);
        const userInfo = userStmt.run(fullname, email, phone);

        
        const authInsertQuery = `
            INSERT INTO Auth (user_id, username, password_hash)
            VALUES (?, ?, ?)
        `;
        const authStmt = this.db.prepare(authInsertQuery);
        authStmt.run(userInfo.lastInsertRowid, email, password); // wil lthink about ahsh later

        return {
            user_id: userInfo.lastInsertRowid,
            fullname,
            email,
            phone,
            created_at: createdAt
        };
    }

    login(email, password) {
        const query = `SELECT Auth.password_hash, Users.user_id, Users.full_name
                       FROM Auth
                       JOIN Users ON Auth.user_id = Users.user_id
                       WHERE Auth.username = ?`;
    
        const stmt = this.db.prepare(query);
        const user = stmt.get(email);
    
        if (!user) {
            return { error: "User not found" };
        }
    
        // ik this is lowkey not secure at all
        if (user.password_hash !== password) {
            return { error: "Wrong password" };
        }
    
        
        return {
            message: "Login successful",
            user_id: user.user_id,
            name: user.full_name
            // 'll think of routes later
        };
    }
    
}

module.exports = AuthModel;

-- Auth table for login information
CREATE TABLE Auth (
    auth_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Users table for all user information
CREATE TABLE Users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT
);

CREATE TABLE User_Roles (
    user_id INTEGER,
    role TEXT CHECK(role IN ('driver', 'rider')),
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Cars table for storing car information
CREATE TABLE Cars (
    car_id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT NOT NULL,
    color TEXT,
    license_plate TEXT UNIQUE
);

-- Driver_Availability table for scheduling availability
CREATE TABLE Driver_Availability (
    availability_id INTEGER PRIMARY KEY AUTOINCREMENT,
    driver_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    available_from DATETIME NOT NULL,
    available_to DATETIME NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES Users(user_id),
    FOREIGN KEY (car_id) REFERENCES Cars(car_id)
);

-- Bookings table for ride requests and scheduling, // mybe so we won't directly know who is ordering
CREATE TABLE Bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    rider_id INTEGER NOT NULL,
    driver_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    scheduled_time DATETIME NOT NULL,
    status TEXT CHECK(status IN ('pending', 'accepted', 'completed', 'cancelled')) DEFAULT 'pending',
    FOREIGN KEY (rider_id) REFERENCES Users(user_id),
    FOREIGN KEY (driver_id) REFERENCES Users(user_id),
    FOREIGN KEY (car_id) REFERENCES Cars(car_id)
);

-- Gas_Reports table for tracking fuel expenses
CREATE TABLE Gas_Reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    driver_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,
    booking_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    date_submitted DATETIME DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (driver_id) REFERENCES Users(user_id),
    FOREIGN KEY (car_id) REFERENCES Cars(car_id),
    FOREIGN KEY (booking_id) REFERENCES Bookings(booking_id)
);

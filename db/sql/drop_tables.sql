-- Drop child tables first to avoid FK constraint issues
DROP TABLE IF EXISTS Gas_Reports;
DROP TABLE IF EXISTS Bookings;
DROP TABLE IF EXISTS Driver_Availability;
DROP TABLE IF EXISTS Auth;
DROP TABLE IF EXISTS User_Roles;
DROP TABLE IF EXISTS Cars;
DROP TABLE IF EXISTS Users;

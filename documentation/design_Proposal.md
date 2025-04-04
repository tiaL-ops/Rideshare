## Problem statement:

During winter housing at Lafayette college, a limited number of International students are staying on campus. There are no dining halls open (especially not on holidays such as Christmas - New Year), and they would need to be in charge of their groceries, personal items.  
As many international students stated from interviews, Uber can be really expensive, and Lafayette is not very accessible from walking distance (sure you can walk, but one small market is 20 mn down the hill, and the Target is 1 hour by bus).  
Transportation is a big problem that leaves students feeling confined and alone during winter.

---

## Solution proposed:

We are proposing the rideshare app for students to rent 3 school cars.  
Students will be able to sign for time for at least 24 h of the time, and choose whether they would want to have a car to go either to Target, Walmart, CVS, or anywhere in short distance.

Student drivers will be able to select specific times they are available, and will be paid by hours they are driving students.

---

## Typical Flow:

### Client-side:

User A is a driver. A will log in, insert a time A is disponible to drive for a specific date. Let us say Tomorrow Apr 4, 2025 from 10 am to 4 pm.

User B is a student who wants a ride. B can see if any driver and car is available tomorrow, (B is 24h in advance!) yes !  
B select a time 10 am, Target. B can have only 3 hours maximum per day.  
Hence, B will have 25 mn to go there, 1 hour to shop and 25 mn to go back.  
It falls under 3 hours. It is 1h50.

Now user A is booked for 1h50. From 10 to 11:50 am, and still 11:50 am to 4pm to anyone who wants to book it.  
If no one will book it, A will only be paid for 1:50mn.  
A should be able to update how much gas he spent for the ride.

---

### Server-side:

#### Database Model:

- **Auth** - Will have login information  
- **Users** - Information about users  
- **Cars** – basic information about the 3 cars  
- **Driver_Availability** – when each driver is available with a specific car  
- **Bookings** – ride requests and schedules (linking rider, driver, car, destination, etc.)  
- **Gas_Reports** – fuel expenses submitted by drivers after each ride

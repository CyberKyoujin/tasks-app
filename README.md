# TASKS APP
Full-Stack Tasks Single Page Application built with React and Django frameworks. Implements user JWT authentication and tasks CRUD functionality 
## Prerequisites
1. Docker Desktop (includes Docker Compose). Ensure it is launched!

## Installation and Setup
1. Clone repository
```
cd your-directory
git clone https://github.com/CyberKyoujin/tasks-app.git
```

2. Run frontend tests
```
docker-compose run frontend-test
```

2. Run backend tests
```
docker-compose run backend-test
```

3. Launch Docker containers
```
docker-compose up
```

4. Access the application
   
Now you can access the app:
- localhost:3000 - frontend
- localhost:8000 - backend

## App Functionality Overview
<img width="1710" alt="Bildschirmfoto 2024-12-04 um 15 55 33" src="https://github.com/user-attachments/assets/50623237-15fe-4cf6-9902-e8b799dac4cf">

1. User authentication with JSON Web Token
<img width="444" alt="Bildschirmfoto 2024-12-04 um 15 53 26" src="https://github.com/user-attachments/assets/b845d493-b679-4fc6-a91a-13e63b69e37b">

2. Managing tasks (create, delete, mark as completed)
<img width="1344" alt="Bildschirmfoto 2024-12-04 um 15 55 50" src="https://github.com/user-attachments/assets/bd101e64-0f79-4843-898b-d55eed8e4b7b">

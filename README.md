# 📱 ChatApp

Welcome to **ChatApp**! This real-time chat application, built with the MERN stack, offers a modern, secure messaging experience with a sleek, responsive design.

## 🌟 Features

- **Backend:** Built with **Node.js** and **Express**.
- **Frontend:** Developed using **React** with **Vite**.
- **Styling:** Styled with **Tailwind CSS**.
- **Database:** Utilizes **MongoDB** for efficient data storage.
- **Authentication:** Managed using **JWT** (JSON Web Tokens).
- **Password Security:** Handled with **bcrypt** for secure password hashing.
- **Real-Time Messaging:** Powered by **Socket.io** for instant communication.
- **Online Status Indicators:** Visual green dots to show user activity.
- **Notifications:** Chime alerts for new messages and vibration effects for active chats.
- **Search Functionality:** Quickly locate and open chats using the search bar.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**
- **Docker** (optional, for containerized setup)

## 💻 Installation

### Using npm

**Backend**

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `backend` directory with the following content:
        ```plaintext
        PORT=5000
        MONGODB_URI=mongodb://user:password@mongo:27017/chatapp?authSource=admin
        JWT_SECRET=my_jwt_secret
        NODE_ENV=development
        ORIGIN=http://localhost:3000
        ```

**Frontend**

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `frontend` directory with the following content:
        ```plaintext
        VITE_PORT=3000
        VITE_BACKEND_URL=http://localhost:5000
        ```

### Running the Project

**Backend**

1. Start the backend server:

    ```bash
    npm run dev
    ```

    The backend will run on [http://localhost:5000](http://localhost:5000).

**Frontend**

1. Start the frontend development server:

    ```bash
    npm run dev
    ```

    The frontend will run on [http://localhost:3000](http://localhost:3000).

---

### Using Docker

1. Ensure `.env` files are set up correctly in both `backend` and `frontend` directories.

2. Set up environment variables for the root directory:
    - Create a `.env` file in the root directory with the following content:
        ```plaintext
        MONGO_INITDB_ROOT_USERNAME=admin
        MONGO_INITDB_ROOT_PASSWORD=securepassword123
        MONGO_EXPRESS_USERNAME=expressadmin
        MONGO_EXPRESS_PASSWORD=expresspassword123
        ```

3. Build and start the Docker containers in the root directory:

    ```bash
    docker-compose up -d --build
    ```

4. To stop the Docker containers:

    ```bash
    docker-compose down
    ```

5. If you encounter any issues, restart the backend and frontend containers:

    ```bash
    docker restart backend
    docker restart frontend
    ```

6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to start chatting!

## 📬 Contact

For any questions or issues, please contact [saimihirnath.nayakanti1@gmail.com](mailto:saimihirnath.nayakanti1@gmail.com).

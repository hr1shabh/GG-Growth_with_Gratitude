# GG - Growth with Gratitude

GG is a full-stack social media application designed to foster personal growth and gratitude. It allows users to share posts, interact with a community, and track their daily posting consistency with a streak feature.


## Features

### Core Social Features
-   **User Authentication**: Secure Sign Up and Login using JWT (JSON Web Tokens).
-   **Social Feed**: View posts from all users in a dynamic feed.
-   **Create Posts**: Share your thoughts and gratitude with the community. (Supports text content).
-   **Interactions**:
    -   **Like** posts to show appreciation.
    -   **Comment** on posts to engage in discussions.
    -   **Delete** your own posts.
-   **User Profiles**: View user profiles and their post history.
-   **Follow System**: Follow other users (UI prepared, backend supported).

### Gamification
-   **Daily Streak**: A dedicated streak counter in the Navbar tracks how many consecutive days you've posted.
    -   🔥 **Orange Fire**: You are on a roll! (Streak > 0)
    -   🌑 **Gray Fire**: Start posting to build your streak!

## 🛠 Tech Stack

### Backend
-   **Framework**: Django 5.1 & Django Rest Framework (DRF)
-   **Language**: Python 3.10+
-   **Database**: PostgreSQL (Production) / SQLite (Dev)
-   **Authentication**: Simple JWT
-   **Containerization**: Docker

### Frontend
-   **Framework**: React 19
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **HTTP Client**: Fetch API

### DevOps & Deployment
-   **CI/CD**: GitHub Actions (Automated Backend Builds)
-   **Registry**: Docker Hub
-   **Hosting**:
    -   **Frontend**: Vercel (Recommended)
    -   **Backend**: Render (Docker web service)

## 🏃‍♂️ Getting Started

### Prerequisites
-   Node.js & npm
-   Python 3.10+
-   Docker (optional, for containerized run)

### 1. Clone the Repository
```bash
git clone https://github.com/hr1shabh/GG-Growth_with_Gratitude.git
cd GG-Growth_with_Gratitude
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```
*Backend runs on `http://localhost:8000`*

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```
*Frontend runs on `http://localhost:3000`*

## 🐳 Docker Support

Build and run the backend using Docker:

```bash
cd backend
docker build -t my-django-app .
docker run -p 8000:8000 my-django-app
```

## 🧪 Running Tests

Run the backend unit tests (including the Streak feature logic):

```bash
cd backend
# Use SQLite for faster local testing
DATABASE_URL=sqlite:///db.sqlite3 python manage.py test users.tests_streak
```

## 📚 API Reference

**Auth**
-   `POST /api/users/register/` - Register new user
-   `POST /api/token/` - Login (Get Token)
-   `POST /api/token/refresh/` - Refresh Token

**Posts**
-   `GET /api/posts/` - Get all posts
-   `POST /api/posts/` - Create post
-   `DELETE /api/posts/<id>/` - Delete post

**Interactions**
-   `POST /api/posts/<id>/like/` - Like post
-   `POST /api/posts/<id>/comments/` - Add comment

## 🤝 Contributing
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes.
4.  Push to the branch.
5.  Open a Pull Request.

## 📄 License
This project is open source.
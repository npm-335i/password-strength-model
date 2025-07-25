# 🔐 password-strength-model

> ⚠️ *Note:* The predictions aren't always 100% accurate — some passwords may not return the expected strength. It's still a work in progress and open to improvements.

---

## 🌐 Full-Stack Password Strength Classifier

A full-stack password strength checker with:

- ⚛️ **React** frontend  
- 🐍 **Flask** backend with an ML model

Enter a password and get instant feedback on whether it's **Weak**, **Medium**, or **Strong**.

---

## 🚀 Features

✅ Real-time prediction  
✅ Machine Learning-based backend  
✅ Clean and responsive UI  
✅ Axios for REST API calls  
✅ React Router DOM for smooth navigation

---

## ⚙️ Tech Stack

| Frontend      | Backend      | ML Libraries             |
|---------------|--------------|---------------------------|
| React         | Flask        | scikit-learn, joblib      |
| Axios         | Flask-CORS   | pandas, TF-IDF vectorizer |
| React Router  | Python 3.x   |                           |

---

## 📦 Installation

### 🧰 Install Frontend Dependencies

npm install axios react-router-dom

### 🧰 Install Backend Dependencies
pip install -r requirements.txt

### Run the App
cd frontend
npm start
Runs at: http://localhost:3000

### Start Backend
cd backend
python app.py
Runs at: http://localhost:5000

### API Usage
POST request to:
http://localhost:5000/api/password_strength

## ⚠️ Disclaimer
This is for educational/demo purposes. Do not enter real passwords.







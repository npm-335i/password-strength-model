import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import "./password.css";
import logo from "../assets/images/back.jpg";

export default function Password() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [strength, setStrength] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const debounceTimer = useRef(null);

  const checkPasswordStrength = (pw) => {
    if (!pw) {
      setStrength("");
      return;
    }
    fetch("http://localhost:5000/api/password_strength", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStrength(data.strength || "");
      })
      .catch(() => {
        setStrength("");
      });
  };

  useEffect(() => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
      setStrength("");
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      setStrength("");
    } else if (password.length > 16) {
      newErrors.password =
        "Strong Passwords over 16 characters may be hard to remember.";
      setStrength("");
    } else if (strength === "weak") {
      newErrors.password = "Password is too weak.";
    } else if (strength === "strong") {
      if (password.length > 16) {
        newErrors.password = "Password is Strong but too hard to memorise.";
      }
    } else if (strength === "machine") {
      newErrors.password = "Machine-level strength but low human recall.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
  }, [username, password, confirmPassword, strength]);

  useEffect(() => {
    clearTimeout(debounceTimer.current);
    if (password.length >= 6) {
      debounceTimer.current = setTimeout(() => {
        checkPasswordStrength(password);
      }, 500);
    } else {
      setStrength("");
    }
  }, [password]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ username: true, password: true, confirmPassword: true });

    if (Object.keys(errors).length === 0) {
      setShowSuccessModal(true); 
    } else {
      setShowErrorModal(true); 
    }
  };

  return (
    <div className="cont">
      <form className="sign-up-cont" onSubmit={handleSubmit} noValidate>
        <div className="top-img">
          <img className="top-image" src={logo} alt="Background" />
        </div>

        <div className="signup-inputs">
          <h1 className="heading">Sign Up</h1>

          <input
            type="text"
            placeholder="Enter Username"
            className="username_field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => handleBlur("username")}
            required
          />
          {touched.username && errors.username && (
            <small className="error-text">{errors.username}</small>
          )}

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="password_field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.password && errors.password && (
            <small className="error-text">{errors.password}</small>
          )}
          {touched.password && strength && !errors.password && (
            <small
              style={{
                color:
                  strength === "strong"
                    ? "green"
                    : strength === "medium"
                    ? "orange"
                    : "red",
              }}
            >
              Password strength: {strength}
            </small>
          )}

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter Password"
              className="c_password_field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur("confirmPassword")}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {touched.confirmPassword && errors.confirmPassword && (
            <small className="error-text">{errors.confirmPassword}</small>
          )}

          <button className="submission" type="submit">
            Submit
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <Modal
          heading="Success"
          message="Password validation successful. Submission completed."
          onClose={() => setShowSuccessModal(false)}
        />
      )}
      
      {showErrorModal && (
        <Modal
          heading="Error"
          message="Please fix the errors before submitting."
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
}

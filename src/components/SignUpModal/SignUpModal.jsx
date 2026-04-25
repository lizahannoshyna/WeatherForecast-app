import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./SignUpModal.module.css";
import { IoClose } from "react-icons/io5";

const SignUpModal = () => {
  const { isModalOpen, closeModal, login } = useAuth();

  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      displayName: isSignUpMode
        ? formData.username
        : formData.email.split("@")[0],
      email: formData.email,
    });
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeX} onClick={closeModal}>
          <IoClose size={20} />
        </button>

        <h2 className={styles.title}>
          {isSignUpMode ? "Create Account" : "Welcome Back"}
        </h2>
        <p className={styles.subtitle}>
          {isSignUpMode
            ? "Sign up to access detailed weather insights"
            : "Enter your details to log in to your account"}
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignUpMode && (
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="name@mail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isSignUpMode ? "Sign Up" : "Log In"}
          </button>
        </form>

        <div className={styles.toggleText}>
          {isSignUpMode
            ? "Already have an account?"
            : "Don't have an account yet?"}
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setIsSignUpMode(!isSignUpMode)}
          >
            {isSignUpMode ? "Log In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SignUpModal;

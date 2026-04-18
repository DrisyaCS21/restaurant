import { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <form className="auth-form">
        {!isLogin && <input type="text" placeholder="Name" required />}

        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "Create account" : "Already have an account?"}
      </p>
    </div>
  );
}

export default AuthPage;
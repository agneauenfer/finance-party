import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Button from "../ui/common/Button/Button";
import { useNavigate } from "react-router-dom";
import Section from "../ui/common/Section";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/finance/admin");
    }
  };

  return (
    <Section className="login-wrapper" noGap>
      <div className="login-card">
        <h2 className="subtitle primary">Вход в админку</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>Войти</Button>
      </div>
    </Section>
  );
}

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from "../../styles/sign-up.styles";

const LogInForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSuccess() {
    setLoading(false);
    history.push("/dashboard");
  }

  function handleFail(e) {
    setLoading(false);
    if (e.response.status === 422) {
      alert("Preencha os campos corretamente");
    } else if (e.response.status === 409) {
      alert("E-mail já está em uso");
    } else {
      alert("Erro ao cadastrar");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const body = {
      email,
      password: pwd,
    };

    setLoading(false);

    const request = axios.post(
      "https://api-camps-party-qqrcoisa.herokuapp.com/user/sign-in",
      body
    );

    request.then(handleSuccess).catch(handleFail);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        backgroundColor="transparent"
      />
      <Input
        placeholder="senha"
        value={pwd}
        type="password"
        onChange={(e) => setPwd(e.target.value)}
        backgroundColor="transparent"
      />
      <Button type="submit" label="Entrar" loading={loading} />
    </Form>
  );
};
export default LogInForm;

import Card from "../../../components/Layouts/Auth/Card";
import Input from "../../../components/Common/Form/Input";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Common/Form/Button";
import { useState } from "react";
import { required, validate } from "../../../utils/validator";
import API_URL from "../../../constants/api.url";
import { login } from "../../../features/authSlice";
import { useDispatch } from "react-redux";
import useAxios from "../../../hooks/useAxios";
import { AXIOS } from "../../../config/axios.config";
const rules = {
  username: [required],
  password: [required],
};

type Values = {
  [key: string]: string;
};

const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const [values, setValues] = useState<Values>({
    username: "username ",
    password: "password",
  });
  const [response, error, loading, fetcher] = useAxios();
  if (response) {
    dispatch(login(response));
    navigate("/workspace");
  }

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = () => {
    const resultErrors = validate(values, rules);

    if (resultErrors.length) {
      setErrors(resultErrors);
    } else {
      AXIOS.post(API_URL.Login, values)
        .then((response) => {
          if (response?.status === 200) {
            dispatch(login(response.data));
            navigate("/workspace");
          }
        })
        .catch((error) => {});
      fetcher("post", API_URL.Login, values);
    }
  };

  return (
    <Card page={"login"} errors={errors}>
      <form className="flex flex-col gap-L self-stretch">
        <div className="flex flex-col gap-M self-stretch">
          <Input
            inputValue={values.username}
            name="username"
            id="username"
            type="text"
            label="نام کاربری"
            hasLabel={true}
            className="h-XL"
            onChange={(name, value) => handleChange(name, value)}
          />
          <Input
            inputValue={values.password}
            name="password"
            id="password"
            type="password"
            label="رمز عبور"
            className="h-XL"
            hasLabel={true}
            subText={{
              text: "رمز عبور را فراموش کرده‌ای؟",
              link: "/forgot",
            }}
            onChange={(name, value) => handleChange(name, value)}
          />
        </div>
        <div className="flex flex-col items-center gap-M self-stretch">
          <Button
            autoFocus={true}
            text="ورود"
            type="button"
            onClick={handleClick}
            hasIcon={false}
            className="text-white text-sm leading-normal font-extrabold h-12 self-stretch rounded-md bg-brand-primary"
          />
          <div className="flex gap-XS">
            <Link
              className="text-brand-primary text-base font-extrabold"
              to="/register"
            >
              ثبت‌نام
            </Link>
            <span className="text-black text-base font-medium">
              ثبت‌نام نکرده‌ای؟
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Login;

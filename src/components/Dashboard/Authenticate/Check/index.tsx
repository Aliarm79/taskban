import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AXIOS } from "../../../../config/axios.config";
import API_URL from "../../../../constants/api.url";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refresh } from "../../../../features/authSlice";

interface IProps extends React.PropsWithChildren {}

const AuthCheck: React.FC<IProps> = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const refreshToken = Cookies.get("refresh");

    if (!refreshToken) {
      navigate("/login");
      setLoading(false);
    }
    AXIOS.post(API_URL.Refresh, { refresh: refreshToken })
      .then((response) => {
        if (response.status === 200) {
          dispatch(refresh(response.data));
          navigate("/workspace");
        }
      })
      .catch((error) => {
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return <div>{!loading && children}</div>;
};

export default AuthCheck;

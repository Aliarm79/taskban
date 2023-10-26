import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AXIOS } from "../../config/axios.config";
import API_URL from "../../constants/api.url";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { refresh } from "../../features/auth/authSlice";
import { setting } from "../../constants/url";
import { selectSetting } from "../../features/setting/settingSlice";
import { useSelector } from "react-redux";
import { store } from "../../app/store";

interface IProps extends React.PropsWithChildren {}

const AuthCheck: React.FC<IProps> = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();
  const appSetting = useSelector(selectSetting);
  const [color, setColor] = useState(appSetting.theme);
//heading color
const color2="#0F010E"
const color3="#2A2A4A"
//background color
const color4="#1A091F"
const color5="#34315A"

const subHexColor=(c1, c2) =>{
  var hexStr = (parseInt(c1.substring(1,7), 16) - parseInt(c2.substring(1,7), 16)).toString(16).padStart(6, '0');
  if(hexStr.includes("-")){
    return c1
}
  return `#${hexStr}`;
}
const addHexColor=(c1, c2) =>{
  console.log(c2)
  console.log(parseInt(c2.substring(1,7), 16))
  var hexStr = (parseInt(c1.substring(1,7), 16) + parseInt(c2.substring(1,7), 16)).toString(16).padStart(6, '0');
  if(hexStr.length>6){
    return c1
  }
  return `#${hexStr}`;
}
//background color

  const getTheme = async () => {
    const url = setting.get();
    const res = await AXIOS.get(url);
    if (res?.status === 200) {
      setColor(res.data[0].theme);
    }
  };
  const root = document.documentElement;
  root.style.setProperty("--color-primary", color);
  root.style.setProperty("--color-header1", subHexColor(color,color2));
  root.style.setProperty("--color-header2", addHexColor(color,color3));
   root.style.setProperty("--color-bg1", subHexColor(color,color4));
   root.style.setProperty("--color-bg2", addHexColor(color,color5));

  useEffect(() => {
    const controller = new AbortController();
    const refreshToken = Cookies.get("refresh");

    if (pathname === "/Reset-password/") {
      setLoading(false);

      return;
    }
    if (!refreshToken) {
      navigate("/login");
      controller.abort();
    }
    AXIOS.post(
      API_URL.Refresh,
      { refresh: refreshToken },
      {
        signal: controller.signal,
      }
    )
      .then((response) => {
        if (response.status === 200) {          
          dispatch(refresh(response.data));
          if (
            pathname === "/" ||
            pathname === "/login" ||
            pathname === "/register" ||
            pathname === "/forgot"
          ) {
            navigate("workspaces");
          } else {
            navigate(pathname + search);
          }
          getTheme();
        }
      })
      .catch((error) => {
        Cookies.remove("refresh");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return <div>{!loading && children}</div>;
};

export default AuthCheck;

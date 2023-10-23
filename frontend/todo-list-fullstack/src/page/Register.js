import React, { useEffect ,memo} from "react";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, message } from "antd";
import { validationsRegistered } from "../validation/Validation";
import { registerAuth } from "../service";
function Register() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const registerInfo = useSelector((state) => state.user.userRegisterInfo);
  useEffect(() => {}, [registerInfo]);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationsRegistered,

    onSubmit: async (values, bag) => {
      await dispatch(
        registerAuth({
          userName: values.userName,
          email: values.email,
          password: values.password,
        })
      );
      formik.values.email = "";
      formik.values.userName = "";
      formik.values.password = "";
      formik.values.passwordConfirm = "";
    },
  });

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <div
        style={{
          background: "white",
          height: "600px",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h3 style={{ fontSize: "25px" }}>Kayıt Ol</h3>

          {registerInfo ? (
            <h4
              style={{
                color: registerInfo.userName === null ? "red" : "green",
              }}
            >
              {registerInfo.message}
            </h4>
          ) : (
            ""
          )}
        </section>

        <section style={{ width: "650px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <InputLabel style={{ display: "flex", justifyContent: "start" }}>
                <strong>Kullanıcı Adı</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input
                  placeholder="Kullanıcı adı giriniz..."
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                {formik.errors.userName && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.userName}
                  </div>
                )}
              </Space>

              <InputLabel style={{ display: "flex", justifyContent: "start" }}>
                {" "}
                <strong>Email</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input
                  placeholder="Email giriniz..."
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </Space>

              <InputLabel style={{ display: "flex", justifyContent: "start" }}>
                <strong>Şifre</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input.Password
                  placeholder="Şifre giriniz..."
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {formik.errors.password && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.password}
                  </div>
                )}
              </Space>

              <InputLabel style={{ display: "flex", justifyContent: "start" }}>
                <strong>Şifre Tekrar</strong>
              </InputLabel>
              <Space
                style={{
                  width: "500px",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
                direction="vertical"
              >
                <Input.Password
                  placeholder="Şifre giriniz..."
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
                {formik.errors.passwordConfirm && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "12px",
                      textAlign: "center",
                    }}
                  >
                    {formik.errors.passwordConfirm}
                  </div>
                )}
              </Space>
            </div>

            <div style={{ width: "500px" }}>
              <Button
                onClick={formik.handleSubmit}
                variant="contained"
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                  width: "100%",
                }}
              >
                Kayıt Ol
              </Button>
            </div>
            <div style={{ marginTop: "50px" }}>
              Hesabınız var mı ?{" "}
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                Giriş Yap
              </Link>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default memo(Register);

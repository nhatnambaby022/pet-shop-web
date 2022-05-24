import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "-24px",
        marginTop: "72px",
        backgroundColor: "black",
      }}>
      <ul
        style={{
          maxWidth: "700px",
          listStyle: "none",
          paddingTop: "40px",
          backgroundColor: "black",
        }}>
        <li>
          <p style={{ color: "#b5b5b5" }}> THÔNG TIN LIÊN HỆ</p>
        </li>
        <li>
          <p style={{ color: "#b5b5b5" }}>
            <span class='glyphicon glyphicon-map-marker'></span> &nbsp; &nbsp;
            Địa chỉ: 336, ấp Hưng Thành Đông, xã Long Hưng B, huyên Lấp Vò, tỉnh
            Đồng Tháp{" "}
          </p>
        </li>
        <li>
          <p style={{ color: "#b5b5b5" }}>
            <span class='glyphicon glyphicon-earphone'></span> &nbsp; &nbsp;
            Hotline: 0963.005.441{" "}
          </p>
        </li>
        <li>
          <p style={{ color: "#b5b5b5" }}>
            <span class='glyphicon glyphicon-map-marker'></span> &nbsp; &nbsp;
            Facebook:{" "}
            <a href='https://facebook.com/nhatnam.lvo.3'>Facebook.com</a>
          </p>
        </li>
        <li style={{ paddingBottom: "20px" }}>
          <p style={{ color: "#b5b5b5" }}>
            {" "}
            <span class='glyphicon glyphicon-earphone'></span> &nbsp; &nbsp;
            Email: nhatnam11052000@gmail.com{" "}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Footer;

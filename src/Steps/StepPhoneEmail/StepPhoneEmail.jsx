import React, { useState } from "react";
import Card from "../../components/Shared/Card/Card";
import styles from "./Authenticate.module.css";
import Button from "../../components/Button/Button";
import phonImg from "../../assets/vector.png";
import emailImg from "../../assets/phone_android.png";
import { useNavigate } from "react-router-dom";
import Input from "../../components/TextInput/Input";
import { sendOtp } from "../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../store/Auth";
const Authenticate = ({ onNext }) => {
  const dispatch = useDispatch();
  const [phone, setphone] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const changeBackgroundColor = () => {
    // You can change the color to any value you desire here
    const newColor = backgroundColor === "black" ? "#014a9c" : "black";
    console.log(newColor);
    setBackgroundColor(newColor);
  };

  const divSet = {
    marginTop: "20px",
  };
  const sumbit = async () => {
    const { data } = await sendOtp({ phone });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgCon}>
        <img
          onClick={changeBackgroundColor}
          className={styles.setImg}
          src={phonImg}
          alt=""
        />
        <img src={emailImg} alt="" />
      </div>

      <div className={styles.cardWrapper}>
        <Card heading="Enter Phone Number" icon="Emoji.png">
          <Input
            place="+923482241520"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
          <div style={divSet}>
            <Button text="Next" onNext={sumbit} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Authenticate;

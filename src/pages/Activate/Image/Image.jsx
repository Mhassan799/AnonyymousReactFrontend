import React, { useState } from "react";
import styles from "./Image.module.css";
import Card from "../../../components/Shared/Card/Card";
import Button from "../../../components/Button/Button";
import { setAuth } from "../../../store/Auth";
import { useDispatch, useSelector } from "react-redux";
import { setImg } from "../../../store/activate";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import { activate } from "../../../http";
const Image = ({ onNext }) => {
  const navigate = useNavigate();
  const [localimg, setImage] = useState("/src/assets/banda.png");
  const dispatch = useDispatch();
  const { Name, Img } = useSelector((state) => state.activate);
  const { user } = useSelector((state) => state.auth);

  //console.log(user);

  const token = user ? user.token : null;


  //console.log(token);
  const changeImg = (e) => {
    const crtImg = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(crtImg);

    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result);
      dispatch(setImg(reader.result));
    };
  };

  const submit = async () => {
    try {
      
      const { data } = await activate({ Name, Img, token });
      
      
      const covert = decode(data.token);
      // console.log(check)
      // console.log(data.user.activated)

       localStorage.setItem("user", JSON.stringify(covert));
       const user = localStorage.getItem("user");
      // console.log(user);
       dispatch(setAuth(covert));
       navigate("/");
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <div>
      <div className={styles.cardWrapper}>
        <Card heading={`${Name}`} icon="smart.png">
          <div className={styles.imgCover}>
            <img className={styles.ImgOrg} src={localimg} alt="" />
          </div>
          <input
            type="file"
            onChange={changeImg}
            className={styles.avatar}
            id="setImgTag"
          />
          <label htmlFor="setImgTag" className={styles.avatarGet}>
            try with new Image
          </label>
          <div className={styles.btnCover}>
            <Button text="Next" onNext={submit} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Image;

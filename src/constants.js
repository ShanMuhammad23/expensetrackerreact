import splashscreenhero from "./assets/images/splashscreenhero.png";
import upArrow from "./assets/images/up-arrow.png";
import downArrow from "./assets/images/downarrow.png";
import ArrowLeft from "./assets/images/arrow left.svg";
import UserImage from "./assets/images/UserImage.png"
import { useEffect } from "react";
let currentDate=`${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()} , ${new Date().getMonth() < 10 ? "0" + new Date().getMonth() : new Date().getMonth()} , ${new Date().getFullYear()}`

let expenses = [];
let user={};
let EditUserForm={
    value:null
};

export { splashscreenhero, upArrow, downArrow, expenses, ArrowLeft,currentDate,UserImage,EditUserForm };

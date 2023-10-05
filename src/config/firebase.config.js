import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC8UZSQwpBfK3CtAagKiRypPT7V12TK29k",
  authDomain: "college-final-project-43ddf.firebaseapp.com",
  projectId: "college-final-project-43ddf",
  storageBucket: "college-final-project-43ddf.appspot.com",
  messagingSenderId: "444657330018",
  appId: "1:444657330018:web:84ed592bb26aee0f232e3b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;

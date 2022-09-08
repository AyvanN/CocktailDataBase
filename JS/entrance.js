import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
	apiKey: "AIzaSyA8puZztrdzKNTfPAyAgtkp16fy3AcyR2c",
	authDomain: "coctaildatabase-532cd.firebaseapp.com",
	databaseURL: "https://coctaildatabase-532cd-default-rtdb.firebaseio.com",
	projectId: "coctaildatabase-532cd",
	storageBucket: "coctaildatabase-532cd.appspot.com",
	messagingSenderId: "810205492384",
	appId: "1:810205492384:web:f7849adad647218540c5c5",
  databaseURL: "https://coctaildatabase-532cd-default-rtdb.firebaseio.com/",
};

const singupArea = document.querySelector(".signup-area"),
		loginArea = document.querySelector(".login-area");

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const database = getDatabase(app);
const auth = getAuth();
 


const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const logout = document.querySelector('.logout');
var signUpMessage = document.getElementById("signUp-message");


signUp.addEventListener('click', (e) => {
	
	var password = document.getElementById("password").value;
	var cnfrmPassword = document.getElementById("cnfrmPassword").value;

    if(password.length != 0){
        if(password == cnfrmPassword){
			var email = document.getElementById('email').value;
			var username = document.getElementById('username').value;
		  
			createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
				// Signed in 
				 const user = userCredential.user;
		  
				 set(ref(database, 'users/' + user.uid),{
					  username: username,
					  email: email,
					  password: password
				 })
				singupArea.classList.remove("show-message");
				forms.classList.remove("show-signup");
			  })
				.catch((error) => {
				singupArea.classList.add("show-message");
				signUpMessage.textContent = error.code.slice(5);
			  });
        }
		  else {
			singupArea.classList.add("show-message");
			signUpMessage.textContent = "Password don't match";
        }
    }
	 else {
		 singupArea.classList.add("show-message");
		 signUpMessage.textContent = "Password can't be empty";
    }

});

login.addEventListener('click',(e)=>{
  var email = document.getElementById('lEmail').value;
	var password = document.getElementById('lPassword').value;
	var loginMessage = document.getElementById("login-message");

	  signInWithEmailAndPassword(auth, email, password)
	  .then((userCredential) => {
		 // Signed in 
		 const user = userCredential.user;

		 const dt = new Date();
		  update(ref(database, 'users/' + user.uid),{
			last_login: dt,
		  })

		  const username = ref(database, 'users/' + user.uid + '/username');
		  onValue(username, (snapshot) => {
			  enter.textContent = snapshot.val();
			  main.classList.remove("show-enter");
			  menuList.classList.add("show-bd");
			  const show_bd = document.querySelector('.show-bd');
			  if (show_bd) {
				logout.addEventListener("click", function (e) { 
					document.body.classList.remove('_lock')
					iconMenu.classList.remove('_active');
					menuBody.classList.remove('_active');
				})
			}
		  });
	  })
		  .catch((error) => {
		loginArea.classList.add("show-message");
		loginMessage.textContent = error.code.slice(5);

 });
});



const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(cnfrmPassword => {
            if(cnfrmPassword.type === "password"){
					cnfrmPassword.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
			  cnfrmPassword.type = "password"
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
		 forms.classList.toggle("show-signup");
		 singupArea.classList.remove("show-message");
		 loginArea.classList.remove("show-message");
    })
})

const enter = document.querySelector(".enter"),
		closing = document.querySelectorAll(".close"),
		menuList = document.querySelector(".menu__list"),
	   main = document.querySelector(".main");
		

enter.addEventListener("click", e => { 
	main.classList.toggle("show-enter");
})

closing.forEach(close => {
	close.addEventListener("click", e => {
		e.preventDefault(); 
		main.classList.remove("show-enter");
		forms.classList.remove("show-signup");
	})
})


logout.addEventListener("click", e => { 
	enter.textContent = "Log in";
	menuList.classList.remove("show-bd");
})

iconMenu.addEventListener("click", e => { 
	main.classList.remove("show-enter");
	forms.classList.remove("show-signup");
	main.classList.remove("show-recipe");
})











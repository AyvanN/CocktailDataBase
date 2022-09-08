import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, query, where, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";


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

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

const searchResult = document.querySelector(".search-result"),
		main = document.querySelector(".main");
		
const querySnapshot = await getDocs(collection(database, "Cocktails"));
getRecipe(querySnapshot);
getBestCocktails(querySnapshot);


function getRecipe() {
	querySnapshot.forEach((doc) => {
		generateHTML(doc);
	});
}

const pop_up_container = document.querySelector(".pop-up-container")
pop_up_container.innerHTML = ' '
async function openRecepie(name, id) {
	let ul = document.createElement("ul");
	let h2 = document.createElement("h2");
	let h3 = document.createElement("h3");
	let p = document.createElement("p");
	let result = await getDBSearch(name, id);
	main.classList.add("show-recipe");
	result.forEach((doc) => {
		h2.className = "ingredients";
		h2.innerHTML = "Ingredients:";
		h3.className = "intructions";
		h3.innerHTML = "Intruction:";
		p.className = "meal-info";
		p.innerHTML = doc.data().Description;
		let generateHTML = '';
		generateHTML =
		`
		<div class="pop-up">
			<i class='bx bx-x p-bx'></i>
			<div class="pop-up-inner">
				<div class="left">
					<div class="meal">
						<div class="meal-card">
							<div class="meal-card-img-container">
								<img src="${doc.data().Img}" alt="">
							</div>
								<div class="meal-name">
									<p>${doc.data().Name}</p>
									<i class="fa-regular fa-heart"></i>
								</div>
							</div>
						</div>
					</div>
						<div class="right">
	
						</div>
				</div> 
		</div>
		`;
		pop_up_container.innerHTML = generateHTML;
		const right = document.querySelector(".right");
		right.appendChild(h2);
		for (var el of doc.data().Ingredients)
		{
			const li = document.createElement("li");
			li.innerHTML = "◉ " + el;
			ul.appendChild(li);
		}
		right.appendChild(ul);
		right.appendChild(h3);
		right.appendChild(p);
		});
	
	const pclose = document.querySelector(".p-bx");
	pclose.addEventListener("click", e => { 
	main.classList.remove("show-recipe");
	})
}


async function getDBSearch(searchID, searchQuery) {
	const q = query(collection(database, "Cocktails"), where(searchID, "==", searchQuery.toLowerCase()));
	const qS = await getDocs(q);
	qS.forEach((doc) => {
	})
	return qS;
}

async function getSearch(searchQuery) {
	searchResult.innerHTML = '';
	if (searchQuery == '') {
		getRecipe();
	}
	else{
		let search = await getDBSearch("Name", searchQuery);
		search.forEach((doc) => {
		generateHTML(doc);
		});
	}
}


function generateHTML(doc) {
	let generatedHTML = '';
	generatedHTML =
	`
	<div class="item">
				<img src="${doc.data().Img}">
				<div class="flex-container">
					<h1 class="title">${doc.id}</h1>
					<button class="view-recipe" id = "${doc.data().Name}" href="/" onclick="return false">View Recipe</button>
				</div>
			</div>
	`;
	searchResult.innerHTML += generatedHTML;
	const viewRecepies = document.querySelectorAll(".view-recipe");
	viewRecepies.forEach((recepie) => {
		recepie.addEventListener("click", e => {
			e.preventDefault();
			openRecepie("Name",recepie.id);
		})
	})
}

const searchBar = document.querySelector(".search-bar");
let searchQuery = '';

searchBar.addEventListener('submit', (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector('input').value;
	getSearch(searchQuery);
})


function getBestCocktails() {
	const galleryItems = document.querySelectorAll('.gallery-item');
	let i = 0;
	querySnapshot.forEach((doc) => {
		if (doc.data().bestIndex == true && i < 6) {
			galleryItems[i].src = doc.data().Img;
			i++;
		}
	})

	galleryItems.forEach((item) => {
		item.addEventListener("click", (e) => {
			main.classList.add("show-recipe");
			openRecepie("Img", item.src);
		})
	})
}


// You can make track of your "newBookmark" or anything by using console.log()

let problemListKey = 'algozenith_problems';
newBookmark = window.location.href;
// console.log(newBookmark);

window.addEventListener("load", () => {
	addBookmarkButton();
});

function addBookmarkButton() {
	const bookmarkBtn = document.createElement("img");
	bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
	bookmarkBtn.className = "btn_ref";
	bookmarkBtn.title = "Click to bookmark current timestamp";
	bookmarkBtn.style.height = "30px";
	bookmarkBtn.style.width = "30px";
	// We are going to the parent of the "ask doubt" button and add a new child to it.
	azAskDoubt = document.getElementsByClassName(
		"btn btn_ref text_white ml-1"
	)[0].parentElement.parentElement;
	azAskDoubt.appendChild(bookmarkBtn);

	bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
}

const addNewBookmarkEventHandler = async () => {
	currentProblemBookmarks = await fetchBookmarks();
	problemName =
		document.getElementsByClassName("col-8 my-auto")[0].lastChild
			.textContent;
	const newBookmarkObj = {
		url: newBookmark,
		desc: problemName,
	};
	let addNewToBookmark = true;
	for (let i = 0; i < currentProblemBookmarks.length; i++) {
		if (currentProblemBookmarks[i].url == newBookmark) {
			addNewToBookmark = false;
		}
	}
	if (addNewToBookmark) {
		chrome.storage.sync.set({
			[problemListKey]: JSON.stringify([
				...currentProblemBookmarks,
				newBookmarkObj,
			]),
		});
	}
};



const fetchBookmarks = () => {
	return new Promise((resolve) => {
		// Basically in promise we fetch data and store in variable and then pass it to resolve function.
		chrome.storage.sync.get([problemListKey], (obj) => {
			resolve(obj[problemListKey] ? JSON.parse(obj[problemListKey]) : []);
		});
	});
};

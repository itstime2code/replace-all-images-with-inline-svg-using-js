/*
 * Replace all SVG images with inline SVG With jQuery and Without jQuery
 */

(function () {
	const imgs = document.querySelectorAll("img.icon");
	imgs.forEach((img) => {
		const imgID = img.getAttribute("id");
		const imgClass = img.getAttribute("class");
		const imgURL = img.getAttribute("src");
		// console.log(imgID, imgClass, imgURL);

		// Fetch SVG contents
		fetch(imgURL)
			.then((response) => response.text())
			.then((data) => {
				// Handle data
				// Get the SVG tag, ignore the rest
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(data, "text/html");

				let svg = xmlDoc.querySelector("svg");
				// console.log(svg);

				// Add replaced image's ID to the new SVG
				if (typeof imgID !== "undefined") {
					svg.setAttribute("id", imgID);
				}

				// Add replaced image's classes to the new SVG
				if (typeof imgClass !== "undefined") {
					svg.setAttribute("class", imgClass + " replaced-svg");
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				svg.removeAttribute("xmlns:a");

				// Replace image with new SVG
				// console.log(svg);
				img.parentNode.replaceChild(svg, img);
			})
			.catch((error) => {
				// Handle error
				console.log(error);
			});
	});
})();

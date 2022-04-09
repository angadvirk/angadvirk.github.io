let currThoughtIndex = 0; // For random thought generator

function showDownloads(element) {
  let siblings = element.parentElement.children; // includes 'element'
  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i].nodeName === "A" && siblings[i].hasAttribute("download")) {
      siblings[i].style.display = "initial"; // show downloads
    }
  }
  element.style.display = "none"; // hide downloads button
}
function showHiddenMessage(element) {
  document.getElementById("hiddenMessage").style.display = "inline-block";
}
function generateThought(element) {
  document.getElementById("interestingThought").style.opacity = 0;
  var thoughts = [
    "One of the things Ford Prefect had always found hardest to understand about humans was their habit of continually stating and repeating the very very obvious. ― Douglas Adams, The Hitchhiker's Guide to the Galaxy",
    "Our suffering is connected with our guidance, and it's better not to try to silence it. The only approach to suffering is to understand it. — A. H. Almaas",
    "You need downtime to process things. True commitment means that when time off comes, the subconscious is still at work turning things over in the background, whereas someone who is overworked and stressed will just be trying to get through the day and then mentally checkout the minute they are done. — Gabe da Silveira",
    "You must try harder. It is not easy to become sane. ― George Orwell, 1984",
    "One of the hardest tasks as a human being is knowing when to keep an open mind, and when not to. ― Deb Caletti", 
    "Clever code is a symptom of poor understanding. Your clever code does not impress me, your clever code makes me feel stupid. Obvious code is much more impressive than clever code; I'd love to read more obvious code in my life. — Justin Searls",
    "Humans are bad at predicting the performance of complex systems. Our ability to create large and complex systems fools us into believing that we're also entitled to understand them. — Carlos Bueno",
  ];
  var thoughtIndex = Math.floor(Math.random() * thoughts.length);
  while (thoughtIndex === currThoughtIndex) { // to make sure the thought isn't repeated
    thoughtIndex = Math.floor(Math.random() * thoughts.length);
  }
  currThoughtIndex = thoughtIndex;
  var thought = thoughts[currThoughtIndex];
  element.style.pointerEvents = "none";
  // element.setAttribute("disabled", "");
  setTimeout(() => { // execute the following after the animation transition
    element.style.pointerEvents = "auto";
    // element.removeAttribute("disabled");
    if (document.getElementById("interestingThought").classList.contains("text-center")) {
      document.getElementById("interestingThought").classList.remove("text-center");
      document.getElementById("interestingThought").classList.add("text-left");
    }
    document.getElementById("interestingThought").innerHTML = thought;
    document.getElementById("interestingThought").style.opacity = 1;
    document.getElementById("interestingThought").scrollIntoView({behavior: "smooth"}); // Scroll to thought
  }, 500);
}

// function main() {
//   generateThought();
// }

// window.onload = main;
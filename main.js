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
    "Our suffering is connected with our guidance, and it's better not to try to silence it. The only approach to suffering is to understand it. — A. H. Almaas",
    "If you aren't failing at least a little, you could be learning faster.",
    "The straightest path to continued happiness is to expose yourself to flow.",
    "You need downtime to process things. True commitment means that when time off comes, the subconscious is still at work turning things over in the background, whereas someone who is overworked and stressed will just be trying to get through the day and then mentally checkout the minute they are done. — Gabe da Silveira",
    "You do need to program a lot to become a good programmer. But it's easy to be distracted and lose focus on your task, or just never get in the zone to begin with. All the more so because programming often involves abstract research or synthesizing new ideas... Time away from the keyboard can recharge and give a boost to your productivity as a programmer. If you can summon that excitement and passion every time you sit down to the keyboard, and do so on a regular basis, that is far more important than time card bragging rights. — Gabe da Silveira",
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
    document.getElementById("interestingThought").innerHTML = thought;
    document.getElementById("interestingThought").style.opacity = 1;
    document.getElementById("interestingThought").scrollIntoView({behavior: "smooth"}); // Scroll to thought
  }, 500);
}

// function main() {
//   generateThought();
// }

// window.onload = main;
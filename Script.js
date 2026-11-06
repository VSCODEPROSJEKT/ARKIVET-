const artsnavn = ["Glasselgen", "Tåkefuglen", "Svarteblomsten"];
const valg = [null, null, null];
let gjeldendeArt = 0;
const introduksjonssetninger = [
  "Jorden har forandret seg.",
  "Kysten har krøpet innover land, regnet har blitt surere, og mange av artene vi kjente, er borte.",
  "Likevel har livet funnet nye veier, og i den forandrede verden har nye arter oppstått.",
  "Du har fått tilgang til et gammelt digitalt arkiv med spor etter tre av dem.",
  "Men arkivet har begrenset plass, og du må velge hva framtiden skal få huske.",
  "Du kan bevare en art i arkivet, slik at mennesker senere kan lære om den, eller slette registreringen og frigjøre plass til andre minner.",
  "Du kan ikke bestemme hvilke arter som overlever, men du bestemmer hvilke som får bli husket."
];
let gjeldendeIntroduksjon = 0;

function nesteIntroduksjon() {
  if (gjeldendeIntroduksjon < introduksjonssetninger.length - 1) {
    gjeldendeIntroduksjon++;
    document.getElementById("introduksjonstekst").textContent =
      introduksjonssetninger[gjeldendeIntroduksjon];

    if (gjeldendeIntroduksjon === introduksjonssetninger.length - 1) {
      document.getElementById("introduksjonsknapp").textContent = "Gå videre til arkivet";
    }
  } else {
    aapneArkiv();
  }
}

function aapneArkiv() {
  document.querySelector(".introduksjon").hidden = true;
  document.getElementById("arkiv").hidden = false;
}

function toggleLyd() {
  const lyd = document.getElementById("bakgrunnslyd");
  const knapp = document.getElementById("lydknapp");

  if (lyd.paused) {
    lyd.volume = 0.15;
    lyd.play();
    knapp.textContent = "Stopp bakgrunnslyd";
    knapp.setAttribute("aria-pressed", "true");
  } else {
    lyd.pause();
    knapp.textContent = "Start bakgrunnslyd";
    knapp.setAttribute("aria-pressed", "false");
  }
}

function velgArt(artnummer, skalBevares) {
  if (artnummer !== gjeldendeArt) {
    return;
  }

  valg[artnummer] = skalBevares;

  const melding = document.getElementById("melding-" + artnummer);
  const status = document.getElementById("status-" + artnummer);
  const kort = status.parentElement;

  if (skalBevares) {
    melding.textContent = artsnavn[artnummer] + " er bevart i arkivet.";
    status.textContent = "Bevart";
    kort.classList.remove("forsvunnet");
    kort.classList.add("bevart");
  } else {
    melding.textContent = artsnavn[artnummer] + " har forsvunnet fra arkivet.";
    status.textContent = "Forsvunnet";
    kort.classList.remove("bevart");
    kort.classList.add("forsvunnet");
  }

  let antallBevarte = 0;
  let alleValgt = true;

  for (let i = 0; i < valg.length; i++) {
    if (valg[i] === true) {
      antallBevarte++;
    } else if (valg[i] === null) {
      alleValgt = false;
    }
  }

  document.getElementById("oppsummering").textContent =
    "Du har valgt å bevare " + antallBevarte + " av 3 arter.";

  if (alleValgt) {
    document.getElementById("bevarte-liste").innerHTML = "";
    document.getElementById("slettede-liste").innerHTML = "";

    for (let i = 0; i < valg.length; i++) {
      const punkt = document.createElement("li");
      punkt.textContent = artsnavn[i];
      if (valg[i]) {
        document.getElementById("bevarte-liste").appendChild(punkt);
      } else {
        document.getElementById("slettede-liste").appendChild(punkt);
      }
    }
  }

  const nesteKnapp = document.getElementById("neste");
  nesteKnapp.hidden = false;
  if (artnummer === valg.length - 1) {
    nesteKnapp.textContent = "Se avslutning";
  }
}

function gaVidere() {
  document.getElementById("art-" + gjeldendeArt).hidden = true;
  gjeldendeArt++;

  const nesteKnapp = document.getElementById("neste");
  nesteKnapp.hidden = true;

  if (gjeldendeArt < valg.length) {
    document.getElementById("art-" + gjeldendeArt).hidden = false;
    document.getElementById("steg").textContent =
      "Art " + (gjeldendeArt + 1) + " av " + valg.length;
  } else {
    document.getElementById("steg").textContent = "Arkivet er fullført";
    document.getElementById("avslutning").hidden = false;
  }
}

function lagreBeskjed() {
  const tekstfelt = document.getElementById("framtidsbeskjed");
  const beskjed = tekstfelt.value.trim();

  if (beskjed === "") {
    tekstfelt.focus();
    return;
  }

  document.getElementById("beskjedstekst").textContent = beskjed;
  document.getElementById("lagret-beskjed").hidden = false;
  tekstfelt.disabled = true;
  document.querySelector("#avslutning button").hidden = true;
}

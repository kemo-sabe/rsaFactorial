// JavaScript Document
/*jshint esversion: 6 */


const docMod = document.getElementById("modulus");
const docMod2 = document.getElementById("modulus2");
const docMod4 = document.getElementById("modulus4");
const docMod5 = document.getElementById("modulus5");
const docPri1 = document.getElementById("prime1");
const docPri2 = document.getElementById("prime2");
const docPriFirst = document.getElementById("primeFirst");
const docPriTwo = document.getElementById("primeTwo");

let btnList = document.querySelectorAll(".rsaBtn");
for (let j = 0; j < btnList.length; j++) {
	btnList[j].addEventListener("click", function(e) {e.preventDefault();});
}
//	.addEventListener("click", function(e) {e.preventDefault();});

//function factorize(numb) {
//	if (numb == 0) {
//		return 1;
//	}
//	return numb * factorize(numb - 1);
//}
//
//function letsCalc() {
//	let numb = document.getElementById("inDig").value;
//	let final = factorize(numb);
//	document.getElementById("answer").innerHTML = final;
//}

function expmod(base, exp, mod) {
	if (exp === 0) {return 1;}
	if (exp % 2 === 0) {
		return Math.pow(expmod(base, (exp / 2), mod), 2) % mod;
	} else {
		return (base * expmod(base, (exp - 1), mod)) % mod;
	}
}

//**************************	MESSAGE TO CIPHER	**************************
function goCiph() {
	const m = document.getElementById("message").value;
	const e = document.getElementById("exponent").value;
	const n = docMod.value;
	let msg = expmod(m, e, n);
	document.getElementById("cipherOut").innerHTML = msg;
}

//**************************	CIPHER TO MESSAGE	**************************
function goMsg() {
	const c = document.getElementById("cipher").value;
	const n = docMod2.value;
	const d = document.getElementById("private").value;
	let ciph = expmod(c, d, n);
	document.getElementById("messageOut").innerHTML = ciph;
}

//*******************************	FIND N	*******************************
function goTot() {
	const p = docPri1.value;
	const q = docPri2.value;
	const n = p * q;
	const phi = (p - 1) * (q - 1);
	document.getElementById("modulus3").innerHTML = "Modulus(n): " + n;
	document.getElementById("totient").innerHTML = "Totient: " + phi;
}

//*****************************	FIND PRIME	*****************************
function goP1() {
	const n = docMod4.value;
	const q = docPriTwo.value;
	const p = n / q;

	 document.getElementById("primeOne").innerHTML = "p: " + p;
	 docMod.value = n;
	 docMod2.value = n;
	 docMod5.value = n;
	 docPri1.value = p;
	 docPriFirst.value = p;
	 docPri2.value = q;
}

//*****************************	FIND PRIME	*****************************
function goP2() {
	const n = docMod5.value;
	const p = docPriFirst.value;
	const q = n / p;

	 document.getElementById("primeSecond").innerHTML = "q: " + q;
	 docMod.value = n;
	 docMod2.value = n;
	 docMod4.value = n;
	 docPriTwo.value = q;
	 docPri1.value = p;
	 docPri2.value = q;
}

//******************************	FIND PHI	******************************
// number of integers k in the range 1 ≤ k ≤ n for which the gcd(n, k) is equal to 1
function goPhi() {
	const phi = document.getElementById("phiIn").value;
	let phi_list = findEs(phi);
//	for (let p = 0; p <= phi_list.length; p++) {
//		document.getElementById("phiOut").innerHTML += "<li>" + p + "</li>";
//	}
//	let l = [];
//	for (let p = 0; p <= phi_list.length; p++) {
//		l.push(p);
//	}
	document.getElementById("phiOut").innerHTML = phi_list.length;
}

function testPrime(numb) {
	let x;
	if (numb === 1) {
		return false;
	} else if (numb === 2) {
		return true;
	} else {
		for (x = 2; x < numb; x++) {
			if (numb % x === 0) {
				return false;
			}
		}
		return true;
	}
}

function findEs(phi) {
	let i;
	let possEs = [];
	for (i = 0; i <= phi; i++) {
		let test = testPrime(i);
		if (test) {
			possEs.push(i);
		}
	}
	return possEs;
}

var Calculator = (function(){
  var rezultatNumber= 0;
  var radniNiz = ["0"];
  var upaljen = false;

  rezultatOperacije.innerHTML = "";

  function init(a,b){
    rezultat = a;
    rezultatOperacije = b;
  }

  function dodajCifru(broj){
    switch(radniNiz.length){
      case 0:
        radniNiz.push(broj);
        rezultat.innerHTML = broj;
        break;
      case 1:
        if(radniNiz[0].length <= 16 && radniNiz[0].indexOf(".") === -1){
          radniNiz[0] = radniNiz[0].concat(broj);
          rezultat.innerHTML += broj;
        } else if(radniNiz[0].length <= 16 && broj !== "."){
          radniNiz[0] = radniNiz[0].concat(broj);
          rezultat.innerHTML += broj;
        }
        break;      
      case 2:
        if(radniNiz[1] === "="){
          rezultatNumber = +broj;
          radniNiz = [broj];
          rezultat.innerHTML = broj;
        break;
        }
        else{
          radniNiz.push(broj);
          rezultat.innerHTML += broj;
        break;
        }
      case 3:
        if(radniNiz[2].length < 16 && radniNiz[2].indexOf(".") === -1){
          radniNiz[2] = radniNiz[2].concat(broj);
          rezultat.innerHTML += broj;
        } else if(radniNiz[2].length < 16 && broj !== "."){
          radniNiz[2] = radniNiz[2].concat(broj);
          rezultat.innerHTML += broj;
        }
        break;
      }
    }
    
  function operacija(niz){
    if(niz[1] === "+"){
      return Number(niz[0]) + Number(niz[2]);
    } else if(niz[1] === "-"){
      return Number(niz[0]) - Number(niz[2]);
    } else if(niz[1] === "*"){
      return Number(niz[0]) * Number(niz[2]);
    } else if(niz[1] === "/" && niz[2] !== "0"){
      return Number(niz[0]) / Number(niz[2]);
    }
  }
            
  function dodajOperaciju(znak){
    switch(radniNiz.length){
      case 1:
        radniNiz.push(znak);
        rezultat.innerHTML += znak;
        break;
      case 2:
        radniNiz.splice(1,1,znak);
        rezultat.innerText = rezultat.innerText.slice(0,rezultat.innerText.length - 1);
        rezultat.innerHTML += znak;
        break;
      case 3:
        if(radniNiz[1] === "/" && radniNiz[2] === "0"){
          rezultatOperacije.innerHTML = "Dividing by 0 is not possible!";
          rezultatNumber = 0;
          radniNiz = ["0"];
          rezultat.innerHTML = "";
          setTimeout(function(){
            rezultatOperacije.innerHTML = 0;
          }, 2500);
        break;
        } else {
            rezultatNumber = zaokruzivanje(operacija(radniNiz),5);
            if(rezultatNumber.toString().length <= 16){
              rezultatOperacije.innerHTML = rezultatNumber.toString();
              radniNiz = [rezultatNumber.toString(), znak];
              rezultat.innerHTML = znak;
              break;
            } else {
              rezultatOperacije.innerHTML = "Digit limit reached!";
              rezultatNumber = 0;
              radniNiz = ["0"];
              rezultat.innerHTML = "";
              setTimeout(function(){
                rezultatOperacije.innerHTML = 0;
              }, 2500);
              break;
            }
          }
        } 
         
  }
 
  function jednako(){
    if(radniNiz.length === 3){
      if(radniNiz[1] === "/" && radniNiz[2] === "0"){
        rezultatOperacije.innerHTML = "Dividing by 0 is not possible!";
        rezultatNumber = 0;
        radniNiz = ["0"];
        rezultat.innerHTML = "";
        setTimeout(function(){
          rezultatOperacije.innerHTML = 0;
        }, 2500);
      } else {
        rezultatNumber = zaokruzivanje(operacija(radniNiz),5);
          if(rezultatNumber.toString().length <= 16){
            rezultatOperacije.innerHTML = rezultatNumber.toString();
            radniNiz = [rezultatNumber.toString(), "="];
            rezultat.innerHTML = "";
          } else {
            rezultatOperacije.innerHTML = "Digit limit reached!";
            rezultatNumber = 0;
            radniNiz = ["0"];
            rezultat.innerHTML = "";
            setTimeout(function(){
              rezultatOperacije.innerHTML = 0;
            }, 2500);
          }
      }
    }
  }
 
  function zaokruzivanje (broj, brojDecimala) {
    var x = Math.pow(10, brojDecimala);
    return (Math.round(broj * x))/ x;
  };

  function clearAll(){
    rezultatOperacije.innerHTML = "0";
    rezultat.innerHTML = "";
    rezultatNumber= 0;
    radniNiz = ["0"];
  }

  function clearEntry(){
    rezultat.innerHTML = "";
    radniNiz = [rezultatOperacije.innerText, "="];
  }

  function paliGasi(){
    if(upaljen === false){  
      var displej = document.getElementById("displej");
      displej.style.backgroundColor = "rgb(194, 237, 222)";
      document.getElementById("rezultat").style.color = "red";
      fadeIn(displej);
      rezultatNumber= 0;
      rezultatOperacije.innerHTML = rezultatNumber.toString();
      rezultat.innerHTML = "";
      radniNiz = ["0"];
    } else{
      document.getElementById("displej").style.backgroundColor = "black";
      document.getElementById("rezultat").style.color = "black";
      rezultat.innerHTML = "";
      rezultatOperacije.innerHTML = ""; 
    }
    upaljen = !upaljen;
    var power = document.getElementById("power");
    power.innerText = upaljen ? "Off" : "On";
    power.style.color = upaljen ? "red" : "green";
  }

  function fadeIn(a) {
    a.style.opacity = 0;
    function sekvenca() {
    a.style.opacity = +a.style.opacity + 0.005;
    if (+a.style.opacity < 1) {
       (window.requestAnimationFrame && requestAnimationFrame(sekvenca)) || setTimeout(sekvenca, 30)
    }
  };
  sekvenca();
  }

  return {
    init: init,
    dodajCifru: dodajCifru,
    dodajOperaciju: dodajOperaciju,
    jednako: jednako,
    clearAll: clearAll,
    clearEntry: clearEntry,
    paliGasi: paliGasi
  }

})();

window.onload = function(){
  var rezultat = document.getElementById("rezultat");
  var rezultatOperacije = document.getElementById("rezultatOperacije");
  Calculator.init(rezultat, rezultatOperacije);
}

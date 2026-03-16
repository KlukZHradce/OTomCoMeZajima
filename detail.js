import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function zobrazClanek() {
    // Pokud v URL chybí ID, nic neděláme (nebo můžeš vypsat chybu)
    if (!id) return;

    // Odkaz na konkrétní dokument v kolekci "clanky"
    const docRef = doc(db, "clanky", id);
    
    // Stažení dat
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        
        // 1. Titulek stránky v prohlížeči
        document.title = data.nazev; 
        
        // 2. Obsah stránky
        document.getElementById('nadpis').innerText = data.nazev;
        document.getElementById('tema').innerText = data.tema;
        // Pokud máš text článku jako HTML (odstavce), použij innerHTML
        // Pokud je to jen prostý text, použij innerText
        document.getElementById('perex').innerText = data.perex; // nebo data.perex, podle toho co tam máš
        
    } else {
        document.body.innerHTML = "<h1>Článek nebyl nalezen.</h1>";
    }
}

// Spustíme to
zobrazClanek();
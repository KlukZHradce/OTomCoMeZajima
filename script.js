// Importujeme funkce pro práci s kolekcí (seznamem)
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Importujeme už databázi z vedlejšího souboru
import { db } from "./firebase-config.js"; 

// Získání HTML elementu
const seznamVypisku = document.getElementById('seznam-vypisku');

// Funkce pro načtení a zobrazení dat
async function nactiVypisky() {
    try {
        // Získání dat z kolekce "clanky"
        const querySnapshot = await getDocs(collection(db, "clanky"));  
        
        if (querySnapshot.empty) {
            seznamVypisku.innerHTML += '<p>V databázi nejsou žádné výpisky k zobrazení.</p>';
            return;
        }
        
        // Pro každý dokument vytvoř HTML
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            const clanekHTML = `
                <a class = "karta" href = "clanek.html?id=${doc.id}" target="_blank">
                <h2>${data.nazev}</h2>
                <p class = "tema">${data.tema}</p>
                <p class = "perex">${data.perex}</p>
                </a>
            `;
            
            seznamVypisku.innerHTML += clanekHTML;
        });
        
    } catch (error) {
        seznamVypisku.innerHTML = '<h2>CHYBA PŘIPOJENÍ!</h2><p>Zkontroluj konzoli (F12) a nastavení Firebase Rules.</p>';
        console.error("Chyba při čtení dat: ", error);
    }
}

// Spuštění po načtení
nactiVypisky();
// Import Firebase modulů
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyDMyNNzTJNEnqjweh4jYV3dcKYRryKQV6s",
  authDomain: "otomcomezajima.firebaseapp.com",
  projectId: "otomcomezajima",
  storageBucket: "otomcomezajima.firebasestorage.app",
  messagingSenderId: "877522454478",
  appId: "1:877522454478:web:9e9f5b15ee169fe0f18d9f",
  measurementId: "G-FYJWL9GN7B"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Získání HTML elementu
const seznamVypisku = document.getElementById('seznam-vypisku');

// Funkce pro načtení a zobrazení dat
async function nactiVypisky() {
    try {
        // Zobrazení loading stavu
        seznamVypisku.innerHTML = '<h2>Probíhá dotaz do Firebase...</h2>';
        
        // Získání dat z kolekce "vypisky"
        const querySnapshot = await getDocs(collection(db, "vypisky"));
        
        // Vyčištění po načtení
        seznamVypisku.innerHTML = '<h2>Výsledky:</h2>';
        
        if (querySnapshot.empty) {
            seznamVypisku.innerHTML += '<p>V databázi nejsou žádné výpisky k zobrazení.</p>';
            return;
        }
        
        // Pro každý dokument vytvoř HTML
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            const clanekHTML = `
                <article style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px; border-radius: 8px;">
                    <h3>${data.tema || 'Neznámé Téma'}</h3>
                    <p><strong>Kategorie:</strong> ${data.kategorie || 'Neuvedeno'}</p>
                    <p>${data.obsah || 'Bez obsahu.'}</p>
                </article>
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
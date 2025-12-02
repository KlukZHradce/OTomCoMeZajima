// Proměnná 'db' byla inicializována ve vašem index.html a obsahuje připojení k Firestore
const seznamVypisku = document.getElementById('seznam-vypisku');

// --- Funkce pro načtení a zobrazení dat ---
function nactiVypisky() {
    // 1. Vyčistíme placeholder
    seznamVypisku.innerHTML = '<h2>Probíhá dotaz do Firebase...</h2>';

    // 2. Získání dat z kolekce "vypisky"
    db.collection("vypisky")
      .get()
      .then((snapshot) => {
        // Vyčistíme prvek po úspěšném načtení
        seznamVypisku.innerHTML = '<h2>Výsledky:</h2>';

        if (snapshot.empty) {
            seznamVypisku.innerHTML += '<p>V databázi nejsou žádné výpisky k zobrazení.</p>';
            return;
        }

        // Pro každý dokument, který databáze vrátí:
        snapshot.forEach((doc) => {
            const data = doc.data();
            
            // 3. Vytvoření HTML pro výpisek
            const clanekHTML = `
                <article style="border: 1px solid #ccc; padding: 15px; margin-bottom: 10px;">
                    <h3>${data.tema || 'Neznámé Téma'}</h3>
                    <p><strong>Kategorie:</strong> ${data.kategorie || 'Neuvedeno'}</p>
                    <p>${data.obsah || 'Bez obsahu.'}</p>
                </article>
            `;

            // 4. Přidání HTML do stránky
            seznamVypisku.innerHTML += clanekHTML;
        });
    })
    .catch((error) => {
        // V případě selhání (např. problém s klíči nebo pravidly)
        seznamVypisku.innerHTML = '<h2>CHYBA PŘIPOJENÍ!</h2><p>Zkontrolujte konzoli (F12) a nastavení Firebase Rules.</p>';
        console.error("Chyba při čtení dat: ", error);
    });
}

// Spuštění funkce po načtení skriptu
nactiVypisky();

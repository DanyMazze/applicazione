const { createApp } = Vue;

    const app = createApp({
    data() {
        return {
        loggedIn: false,
        utente: { nome: '', email: '' },
        nuovaNota: { titolo: '', descrizione: '' },
        note: []
        };
    },
    mounted() {
        // Carico le note salvate
        const savedNotes = localStorage.getItem('note');
        if (savedNotes) this.note = JSON.parse(savedNotes);
    },
    methods: {
        login() {
        if (this.utente.nome && this.utente.email) {
            this.loggedIn = true;
        } else {
            alert("Compila tutti i campi per accedere!");
        }
        },
        logout() {
        this.loggedIn = false;
        },
        aggiungiNota() {
        if (this.nuovaNota.titolo && this.nuovaNota.descrizione) {
            this.note.push({ ...this.nuovaNota });
            this.nuovaNota.titolo = '';
            this.nuovaNota.descrizione = '';
            this.salvaNote();
        } else {
            alert("Inserisci titolo e descrizione!");
        }
        },
        eliminaNota(index) {
        this.note.splice(index, 1);
        this.salvaNote();
        },
        salvaNote() {
        localStorage.setItem('note', JSON.stringify(this.note));
        }
    }
    });

    // Componente per la singola card (VIEW)
    app.component('note-card', {
    props: ['titolo', 'descrizione'],
    template: `
        <div class="note">
        <h4>{{ titolo }}</h4>
        <p>{{ descrizione }}</p>
        <button @click="$emit('elimina')">Elimina</button>
        </div>
    `
    });

    app.mount('#app');

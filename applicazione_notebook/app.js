const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            islogged: false,
            email: '',
            isFormValid: false,
            username: '',
            newNotetitle: '',
            newNotedescription: '',
            notes: []
        };
    },

    mounted() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            this.notes = JSON.parse(savedNotes);
        }
    },

    watch: {
        email(newVal) {
            this.isFormValid = newVal.includes('@');
        },
        notes: {
            handler(newNotes) {
                localStorage.setItem('notes', JSON.stringify(newNotes));
            },
            deep: true
        }
    },

    methods: {
        togglelogin() {
            if (this.isFormValid) {
                this.islogged = true;
            }
        },

        addNote() {
            if (this.newNotetitle && this.newNotedescription) {
                this.notes.push({
                    title: this.newNotetitle,
                    description: this.newNotedescription,
                    author: this.username,
                    createdAt: new Date().toLocaleString()
                });
                this.newNotetitle = '';
                this.newNotedescription = '';
            } else {
                alert('Titolo e descrizione sono obbligatori!');
            }
        },

        deleteNote(noteToDelete) {
            const index = this.notes.indexOf(noteToDelete);
            if (index !== -1) {
                this.notes.splice(index, 1);
            }
        }
    }
});

app.component('note-card', {
    props: ['titolo', 'descrizione', 'autore', 'dataCreazione', 'data'],
    template: `
    <div class="note">
        <h2>{{ titolo }}</h2>
        <p>{{ descrizione }}</p>

        <div class="note-info">
            <small>✎ Creato da: <strong>{{ autore }}</strong></small><br>
            <small>📅 Il: {{ dataCreazione }}</small>
        </div>

        <button @click="emitDelete">Elimina Nota</button>
    </div>
    `,
    methods: {
        emitDelete() {
            this.$emit('delete-note', this.data);
        }
    }
});

app.mount('#app');

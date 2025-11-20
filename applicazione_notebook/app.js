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
    watch: {
        email(newVal) {
            this.isFormValid = newVal.includes('@');
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
                    description: this.newNotedescription
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
    props: ['titolo', 'descrizione', 'note', 'onDelete'], 
    template: `
        <div class="note">
            <h2>{{ titolo }}</h2>
            <p>{{ descrizione }}</p>
            <button @click="deleteNote">Elimina Nota</button> 
        </div>
    `,
        methods: {
        deleteNote() {
            this.onDelete(this.note);  
        }
    }
});

app.mount('#app');

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            islogged: false,
            email: '',
            isFormValid: false,
            newNote: {
                title: '',
                description: ''
            }
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
        addNote(newNote) {
            this.newNote.title = '';
            this.newNote.description = '';
            
        }
    }
});

app.component('note-card', {
    props: ['titolo', 'descrizione'],
    template: `
        <div class="note">
            <h2>{{ titolo }}</h2>
            <p>{{ descrizione }}</p>
        </div>
    `
});
app.mount('#app');

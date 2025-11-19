const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            islogged: false,
            username: '',
            userOk: false,
            emailOk: false,
            canLogin: false,
            email: '',
            newNote: '',
            notes: []
        };
    },
    methods: {
        togglelogin() {
            if (!this.islogged) {
                if (!this.canLogin) return;
            }
            this.islogged = !this.islogged;
        },
    },
    watch: {
        username(newvalue){
            if (newvalue.length < 0){
                this.userOk = false;
            }
        },
        email(newvalue){
            if (newvalue.includes('@')){
                this.emailOk = true;
            } else {
                this.emailOk = false;
            }
        },
        canLogin() {
            if (this.userOk && this.emailOk) {
                this.canLogin = true;
            }
        }
    }
});

app.mount('#app');

const { createApp } = Vue;

const app = createApp({
data() {
    return {
        islogged: false
    };
},
methods: {
    togglelogin() {
        this.islogged = true;
    }
},
watch: {
    
}
});

app.mount('#app');

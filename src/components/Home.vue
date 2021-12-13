<script>

export default {
    name: 'Home',
    data: function() {
        return {
            input: '',
            ws: null,
            history: [],
        };
    },
    created: function() {
        this.setup();
    },
    methods: {
        setup: function() {
            this.ws = new WebSocket("ws://localhost:13370");
            this.ws.onmessage = this.receive;
        },
        submit: function() {
            if(this.input.length > 0) {
                this.send(this.input);
                this.input = '';
            }
        },
        send: function(message) {
            this.ws.send(message);
        },
        receive: function(e) {
            this.history.push({
                message: e.data,
                time: (new Date()).toLocaleString()
            });
        }
    }
}
</script>

<template>
    <div class="fill-screen content">
        <h1>Chat Client v0.1</h1>
        <p>Please note: Your messages can be seen by all participants.</p>
        <p v-for="entry,index in history" :key="index">
            {{ entry.message }}
            <span class="time">{{ entry.time }}</span>
        </p>
        <input v-model="input" placeholder="Type message..." />
        <button @click="submit">Send</button>
    </div>
</template>

<style scoped>
    h1 {
        font-weight: normal;
    }
    .time {
        display: block;
        font-size: 0.5em;
    }
</style>
<script>

export default {
	name: 'Home',
	data: function() {
		return {
			input: '',
			ws: null,
			history: [],
			notify: '',            //Used to send notifying message to non active clients.
			currentSession: false  //Used to differentiate active and non-active client.
		};
	},
	created: function() {
		this.setup();
	},
	methods: {
		setup: function() {
			this.ws = new WebSocket("ws://localhost:13370/ws");
			this.ws.onmessage = this.receive;
	  },
		submit: function() {
			if(this.input.length > 0) {
				this.send(this.input);
				this.input = '';
			}
		},
		change: function() {
			this.send('', 'User is typing...');
			this.currentSession = true;
		},
		/*send method takes two inputs 1. user input text
		2.notification message for other clients*/
		send: function(userInput, notification) {
			const message ={
				input: userInput, 
				time: (new Date()).toLocaleString(),
				notification: notification
			};
			this.ws.send(JSON.stringify(message));
		},
		receive: function(e) {
			const data = JSON.parse(e.data);
			//Validation of incoming notification message
			if(data.notification && this.currentSession === false){
				this.notify = data.notification;  
			} else if(data.input) { 
				//Logic handles user input text to be displayed in all the clients
				this.notify = '';
				this.currentSession=false;
				this.history.push({
					message: data.input,
					time: data.time,
				});	   
			} else if(data.length > 1 && this.history.length !== data.length){ 
				//Logic handles display of message history on load in new clients
				data.forEach(element => {
					this.history.push({
						message: element.input,
						time: element.time,
					});				   
				});
			}
		}
	}
}
</script>

<template>
	<div class="fill-screen">
		<h1>Chat Client v0.1</h1>
		<div class="container">
			<p>Please note: Your messages can be seen by all participants.</p>
			<div class="chat-history">
				<p v-for="entry,index in history" :key="index">
					{{ entry.message }}
					<span class="time">{{ entry.time }}</span>
				</p>		
			</div>
			<div class="input">
				<input v-model="input" placeholder="Type message..." @change="change"/>
				<button @click="submit">Send</button>	
				<p>{{notify}}</p>	
			</div>
		</div>
	</div>
</template>

<style scoped>
@import '../assets/styles/home.css';
</style>
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
			this.currentSession = true;
			this.validate();
		},
		
		//function to validate user input
		validate: function() {
			const regex = new RegExp('^([a-zA-Z_$][a-zA-Z\\d_$]*)$');
			
			// Notify other users
			if(this.input.length >1 && this.input.length < 120){
				this.send('', true);
			}
			//User input validation
			if(this.input.length < 1 || this.input.length > 120) {
				alert("Please enter between 1 and 120 characters.");
				this.input = '';
				this.$refs["input"].focus();
				this.send('', false);
			} else if(!regex.test(this.input)) {
				alert("Your input should start with only lower case alphabet or upper case alphabet"+
				"or underscore(_) or dollar sign($). It can be alphanumeric or underscore(_) or dollar sign($)"+
				"after the first character of the string");
				this.input = '';
				this.$refs["input"].focus();
				this.send('', false);
			}
		},
		
		/*send method takes two inputs 1. user input text
		2.notification message for other clients*/
		send: function(userInput, notification) {
			const message ={
				input: userInput, 
				time: (new Date()).toLocaleString(),
				notification: notification
			};
			this.ws.send(JSON.stringify(message), false);
		},
		
		receive: function(e) {
			const data = JSON.parse(e.data);
			//Validation of incoming notification message
			if(data.notification===true && this.currentSession === false){
				this.notify = "User is typing..."; 
			} else if(data.notification===false && this.currentSession === false) { 
				this.notify = '';
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
				this.notify = '';
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
		<h1>Chat Client v0.2</h1>
		<form class="container" v-on:keyup.enter="submit">
			<p>Please note: Your messages can be seen by all participants.</p>
			<div class="chat-history">
				<p v-for="entry,index in history" :key="index">
					{{ entry.message }}
					<span class="time">{{ entry.time }}</span>
				</p>		
			</div>
			<div class="input">
				<input v-model="input" placeholder="Type message..." @change="change" ref="input"/>
				<button @click="submit">Send</button>	
				<p>{{notify}}</p>	
			</div>
		</form>
	</div>
</template>

<style scoped>
@import '../assets/styles/home.css';
</style>
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors:{
		origin: '*'
	}
});

app.use(cors());
app.use(express.json());

app.use(require('./controllers/socket.js')(io));
app.use('/join', require('./routes/api/join.js'));

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => res.json("Server up and running."));

server.listen(PORT, () => console.log(`Server up and running on port ${PORT}.`));
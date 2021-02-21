const express = require('express');
const router = express.Router();
const {addUser, removeUser, getUser, getUsersInRoom} = require('../utilities/users.js');

module.exports = function(io) {
	io.on('connection', socket => {
		socket.on('join', ({room}) => {
			const {user} = addUser({id: socket.id, room});
			socket.join(user.room);
		});

		socket.on('mousedown', point => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onmousedown', point);
		});

		socket.on('mousemove', point => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onmousemove', point);
		});

		socket.on('undo', () => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onundo');
		});

		socket.on('redo', () => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onredo');
		});

		socket.on('createSticky', id => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('oncreatesticky', id);
		});

		socket.on('stickychange', ({id, data}) => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onstickychange', {id, data});
		});

		socket.on('shareImage', url => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onshareimage', url);
		});

		socket.on('createtypespace', ({id, x, y, color}) => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('oncreatetypespace', {id, x, y, color});
		});

		socket.on('typespacechange', ({id, data}) => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('ontypespacechange', {id, data});
		});

		socket.on('removetypespace', id => {
			const user = getUser(socket.id);
			socket.broadcast.to(user.room).emit('onremovetypespace', id);
		});

		socket.on('disconnect', () => {
			console.log("User has left.");
		});
	});
	return router;
};
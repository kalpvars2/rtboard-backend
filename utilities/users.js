const users = [];

const addUser = ({id, room}) => {
	const user = {id, room};
	users.push(user);
	return {user};
};

const removeUser = ({id}) => {
	const index = users.findIndex(user => user.id === id);
	if(index !== -1){
		return users.splice(index, 1)[0];
	}
};

const getUser = (id) => {
	const user = users.find(user => user.id === id);
	return user;
};

const getUsersInRoom = (room) => {
	users.filter(user => user.room === room);
};

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
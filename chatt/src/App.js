import React, { useEffect, useState, useRef } from 'react';

function App() {
	const [chatRoomData, setChatRoomData] = useState(null);

	const chatRoomURL =
		'https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO.json';

	const messageURL =
		'https://mock-data-api.firebaseio.com/chatrooms/MF_cHwY2pj8e8zwu8eO/messages.json';

	const messageInputRef = useRef();
	const nameInputRef = useRef();

	const fetchChatRoomData = () => {
		fetch(chatRoomURL)
			.then(res => res.json())
			.then(data => {
				setChatRoomData(data);
				console.log(data);
			});
	};

	const handleSendMessage = () => {
    const message = messageInputRef.current.value;
    const name = nameInputRef.current.value;
		const payload = {
			message: message,
			name: name
		};
		fetch(messageURL, {
			method: 'POST',
			body: JSON.stringify(payload)
		}).then(res => fetchChatRoomData());
	};

	useEffect(() => {
		fetchChatRoomData();
	}, []);

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12'>
					<div className='form-group'>
						<label>Your message</label>
						<input
							ref={messageInputRef}
							className='form-control'
							placeholder='hello..'
						></input>
            	<input
							ref={nameInputRef}
							className='form-control'
							placeholder='name..'
						></input>
					</div>
					<button onClick={handleSendMessage} className='btn btn-primary'>
						Send message
					</button>
				</div>
			</div>
			<div>
				<button className='btn btn-secondary'>Refresh</button>
			</div>
			<div className='row mt-5'>
				<div className='col-md-12'>
					<h3>{chatRoomData && chatRoomData.name}</h3>
					{console.log(chatRoomData)};
				</div>

				{chatRoomData &&
					Object.entries(chatRoomData.messages)
						.reverse()
						.map((messageItem, index) => {
							return (
								<div key={index} className='col-md-12'>
									<div className='alert alert-info'>
										{messageItem[1].message} - {messageItem[1].name}
									</div>
								</div>
							);
						})}
			</div>
		</div>
	);
}

export default App;

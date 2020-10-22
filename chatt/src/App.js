import React, { useEffect, useState, useRef } from 'react';
import Heading from './components/Heading3';
import ButtonRefresh from './components/ButtonRefresh';
import ButtonSend from './components/ButtonSend';
import Message from './components/Message';
import InputField from './components/InputField';

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
            <InputField label='Enter your message' myRef={messageInputRef}  placeholder='Hello...'/>
            <InputField label='Enter your name' myRef={nameInputRef}  placeholder='John Doe'/>
            <ButtonSend handleSendMessage={handleSendMessage}/>
				</div>
			</div>
			<div>
        <ButtonRefresh handleOnClick={fetchChatRoomData}/>
			</div>
			<div className='row mt-5'>
      {chatRoomData && <Heading heading={chatRoomData.name} />}

				{chatRoomData &&
					Object.entries(chatRoomData.messages)
						.reverse()
						.map((messageItem, index) => {
							return (
                <Message key={index} message={messageItem[1].message} name={messageItem[1].name}/>
							);
						})}
			</div>
		</div>
	);
}

export default App;

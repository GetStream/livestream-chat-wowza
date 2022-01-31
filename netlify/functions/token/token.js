const {StreamChat} = require('stream-chat');
const {nanoid} = require('nanoid');

const handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 400,
			body: 'You are not using a http POST method for this endpoint.',
			headers: {
				'Allow': 'POST'
			}
		}
	}
	try {
		const data = JSON.parse(event.body);

		const apiKey = process.env.STREAM_API_KEY;
		const apiSecret = process.env.STREAM_API_SECRET;

		const client = StreamChat.getInstance(apiKey, apiSecret);
		const user = {
			...data,
			id: nanoid(16),
			role: 'admin',
			name: data.username,
			image: `https://robohash.org/${data.username}`,
		};

		const token = client.createToken(user.id);
		await client.upsertUsers([user]);

		return {
			statusCode: 200,
			body: JSON.stringify({ user, token, apiKey }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	} catch (error) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: error.message }),
		}
	}
}

module.exports = { handler }
import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter({
			runtime:"nodejs20.x"
			// see below for options that can be set here
		})
	}
};
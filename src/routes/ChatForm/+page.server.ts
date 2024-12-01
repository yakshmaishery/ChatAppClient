import { redirect, type Action, type Actions, error } from '@sveltejs/kit'
// @ts-ignore
export async function load({ cookies }) {
	
	//CreateTable()
	let LoginID = cookies.get("LoginID")
	
	if (!LoginID) {
		//console.log("No Session")
		throw redirect(300, "/")
	}
	
	return {
		LoginID
	};
}

export const actions:Actions = {
	default: async (event) => {
		// TODO log the user in
	},
	LoginOutAction: async ({ request ,cookies}) => {
		cookies.delete("LoginID",{httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict',
			path: '/'})
	  	throw redirect(302, "/");
	},

 };


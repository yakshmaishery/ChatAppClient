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
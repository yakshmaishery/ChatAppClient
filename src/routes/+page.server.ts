import {redirect} from '@sveltejs/kit'
import type { Action, Actions} from '@sveltejs/kit'

export const actions:Actions = {
    default: async (event) => {
      // TODO log the user in
    },

    LoginAction: async ({ request ,cookies}) => {
      const formData = await request.formData();
      let email = formData.get('email');
      //console.log("Emai: ",email)
      if(!email){
        email = ""
      }
        cookies.set("LoginID",email.toString(),{
           httpOnly: true, maxAge: 60 * 60 * 24, sameSite: 'strict',
           path: '/'
        })

        //console.log(`Email: ${email}`)
      // Process the form data and perform actions
      redirect(307, "/ChatForm");
    },

  };


import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { Auth } from './ApiConfig';

export async function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    Auth.languageCode = 'it';

    try {
        const result = await signInWithPopup(Auth, provider);
        return result.user;
    } catch (error) {
        console.error("Erro ao autenticar:", error);
    }
};

export async function GetUserLogged(onAuthChange) {
    return onAuthStateChanged(Auth, (user) => {
        onAuthChange(user);
      });
}
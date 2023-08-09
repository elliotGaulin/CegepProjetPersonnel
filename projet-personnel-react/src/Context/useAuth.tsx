/**
 * Contexte utilisé pour la gestion de l'authentification
 * Inspiré de : https://blog.finiam.com/blog/predictable-react-authentication-with-the-context-api
 */

import User from "../Models/User";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import AuthService from "../Services/AuthService";
import { useLocation } from "react-router-dom";

/**
 * Définition du type du contexte 
 */
interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, name: string, password: string) => void;
  logout: () => void;
}

// Création du contexte
const AuthContext = createContext<AuthContextType>({} as AuthContextType);


/**
 * Fournisseur du contexte d'authentification
 * Exporté puisque qu'on a besoin de l'utiliser pour enveloppé une bonne partie de l'application
 * @param param0 composants enfants qui auront accès au contexte
 * @returns Le fournisseur de notre contexte
 */
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  
  // Supprimé l'erreur sur le changement de page
  const location = useLocation();
  useEffect(() => {
    if (error) setError(undefined);
  }, [location.pathname]);

  
  useEffect(() => {
    AuthService.getCurrentUser()
      .then((user) => setUser(user))
      .catch((_error) => { })
      .finally(() => setLoadingInitial(false));
  }, []);

  /**
   * Fonction de connexion
   * Fait appel au service d'authentification puis met à jour le contexte
   * @param email
   * @param password 
   */
  function login(email: string, password: string) {
    setLoading(true);
    AuthService.login(email, password)
      .then(({ user, authorization }) => {
        user.authorization = authorization
        setUser(user);
        setError(undefined);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }


  /**
   * Fonction de création de compte
   * Fait appel au service d'authentification puis met à jour le contexte
   * 
   * @param email Adresse courriel
   * @param name Nom 
   * @param password Mot de passe
   */
  function signUp(email: string, name: string, password: string) {
    setLoading(true);
    AuthService.signUp(email, name, password)
      .then(({ user, authorization }) => {
        user.authorization = authorization
        setUser(user);
        setError(undefined);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  /**
   * Fonction de déconnxion de l'utilisateur
   * Fait appel au service d'authentification puis met à jour le contexte
   */
  function logout() {
    setLoading(true);
    setUser(undefined);
    AuthService.logout()
      .finally(() => setLoading(false));
  }

  //Mettre à jour le contexte seulement lorsque user, loading ou error change
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  // Charger l'application seulement après le chargement initial de l'utilisateur
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

/**
 * Fonction pour utiliser le contexte dans un composant.
 * Doit être appelée à l'intérieur du fournisseur
 * @returns Le contexte
 */
export default function useAuth() {
  return useContext<AuthContextType>(AuthContext);
}
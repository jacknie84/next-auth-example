import NextAuth from "next-auth";
import CourtAuthProvider from "../../../next-auth/providers/court-auth";
import {adapter} from "../../../sequelize-config";

export default NextAuth({
  debug: true, 
  session: {
    strategy: "database"
  }, 
  adapter, 
  providers: [
    CourtAuthProvider({
      clientId: 'klNG7yA0xQzze/7eXwXMbq/1Ek6J6MziPoZKPb9sbAs=',
      clientSecret: 'qi_hqTNd4ZYDWUO4MgBGQKI30hkgd5RN-zTUNr7ZWTwkR0aOZ-sAfAZ9tc14Kc6H',
      issuer: "https://dev-court.pnpt.net/api/court-auth",
    })
  ], 
  callbacks: {
    signIn({account, email, profile, user, credentials}) {
      console.log('callbacks signIn account', account)
      console.log('callbacks signIn email', email)
      console.log('callbacks signIn profile', profile)
      console.log('callbacks signIn user', user)
      console.log('callbacks signIn credentials', credentials)
      return true;
    }, 
    jwt({token, account}) {
      console.log('callbacks jwt token', token)
      console.log('callbacks jwt account', account)
      if (account) {
        token.accessToken = account?.access_token
        token.idToken = account?.id_token
      }
      return token
    }, 
    async session({ session, token, user }) {
      console.log('callbacks session session', session)
      console.log('callbacks session token', token)
      console.log('callbacks session user', user)
      console.log('callbacks session session.accessToken', session.accessToken)
      // console.log('callbacks session token.accessToken', token.accessToken)
      // session.accessToken = token.accessToken;
      // session.idToken = token.idToken;
      return session
    }
  }, 
  events: {
    createUser({ user }) {
      console.log('events createUser user', user)
    }, 
    updateUser({ user }) {
      console.log('events updateUser user', user)
    },
    linkAccount({ account, user }) {
      console.log('events linkAccount account', account)
      console.log('events linkAccount user', user)
    }, 
    session({ session, token }) {
      console.log('events session session', session)
      console.log('events session token', token)
    }, 
    signIn({ account, user, isNewUser, profile }) {
      console.log('events signIn account', account)
      console.log('events signIn user', user)
      console.log('events signIn isNewUser', isNewUser)
      console.log('events signIn profile', profile)
    }, 
    signOut({ session, token }) {
      console.log('events signOut session', session)
      console.log('events signOut token', token)
    }
  }
});
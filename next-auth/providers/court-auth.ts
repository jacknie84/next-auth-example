import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers'

type UserProfile = {
  sub: string, 
  phoneNumber: string;
  email: string;
}

export default function CourtAuthProvider(options: OAuthUserConfig<UserProfile>): OAuthConfig<UserProfile> {
  return {
    id: 'court-auth', 
    name: 'Court Auth', 
    type: 'oauth', 
    authorization: {
      url: `${options.issuer}/authorize`, 
      params: { scope: 'openid email phone' }
    },
    token: {
      url: `${options.issuer}/oauth/token`, 
    }, 
    checks: ["pkce", "state"],
    idToken: true,
    profile(profile: UserProfile) {
      return {
        id: profile.sub, 
        email: profile.email, 
        phoneNumber: profile.phoneNumber
      }
    }, 
    options
  };
}
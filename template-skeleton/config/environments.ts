/**
 * The one file you edit per product.
 *
 * Everything else in `support/env/` and the global setup is generic machinery that reads this.
 * Adding an environment or changing how authentication works should mean editing here and nowhere
 * else — if it does not, that is a bug in the machinery, not a reason to edit the machinery.
 *
 * Run `npm run env:dump` after changing anything to see what each profile actually resolved to.
 * It prints resolution, never secrets.
 *
 * NOTE: the `import('@playwright/test').Page` type below is the REFERENCE runner. If you swap the
 * runner, change that import to your runner's page/driver type — nothing else here is runner-specific.
 */

/**
 * How a profile obtains a session.
 *
 * `apiToken` — POST credentials to a token endpoint and write the response into storage state.
 *   Fast, deterministic, does not depend on the login UI staying still. Prefer it whenever the
 *   product has a password-grant style endpoint.
 *
 * `uiLogin` — drive the real login form once and save the resulting storage state. The fallback for
 *   OIDC, SSO, or anything with a redirect dance the API cannot reproduce. Slower, and it breaks
 *   when the login page changes — a real cost, since every project depends on it.
 */
export type AuthStrategy =
  | {
      kind: 'apiToken';
      /** Path appended to the profile's base URL, e.g. `api/v1/token`. */
      tokenPath: string;
      /** Request body built from the resolved credentials. */
      body: (username: string, password: string) => Record<string, unknown>;
      /**
       * Maps the token response onto the storage entries the app reads back. Return `localStorage`
       * entries, `cookies`, or both — whatever the application actually looks for on load. Getting
       * this wrong produces a session the API accepts and the UI ignores.
       */
      toStorage: (response: Record<string, unknown>) => {
        localStorage?: Array<{ name: string; value: string }>;
        cookies?: Array<{ name: string; value: string; domain: string; path: string }>;
      };
      /**
       * Optional: recognise an authenticated-but-unusable response, e.g. a password-expired code
       * returned with HTTP 200. Return a message to fail with, or `null` when the response is fine.
       */
      rejectResponse?: (response: Record<string, unknown>) => string | null;
    }
  | {
      kind: 'uiLogin';
      /** Path to the login page, appended to the base URL. */
      loginPath: string;
      /** Drives the form. A callback rather than selectors, because real login pages have consent
       *  banners, tenant pickers, and multi-step flows no selector triple covers. */
      login: (page: import('@playwright/test').Page, username: string, password: string) => Promise<void>;
      /** A locator or URL fragment that proves login succeeded. Waited for before saving state. */
      readySelector: string;
    };

/** A non-admin identity, for permission-boundary specs. Always optional. */
export interface SecondaryIdentity {
  id: string;
  label: string;
  expectedRoles: readonly string[];
  /** Roles the account must NOT hold. This is the entire reason the identity exists. */
  forbiddenRoles: readonly string[];
  userEnv: string;
  passwordEnv: string;
  passwordFallbackEnv?: string;
  authFileName: string;
}

export interface EnvProfile {
  id: string;
  label: string;
  baseUrlEnv: string;
  baseUrlFallbackEnv?: string;
  /** Used only when the env var is unset. Leave undefined to require explicit configuration. */
  defaultBaseUrl?: string;
  authFileName: string;
  adminUserEnv: string;
  adminUserFallbackEnv?: string;
  adminPasswordEnv: string;
  /**
   * DANGER. A password fallback that reaches ACROSS environments sends one environment's password
   * to another. When they differ by even one character, that is a failed login against a real
   * account on every run — locking it slowly, in CI, with nothing in the log naming the cause.
   * Set this only when the profiles genuinely share one credential.
   */
  adminPasswordFallbackEnv?: string;
  auth: AuthStrategy;
  secondaryIdentities?: Record<string, SecondaryIdentity>;
  extras?: Record<string, string>;
}

/**
 * Example strategy for a JSON password-grant endpoint. Reshape it for your product — it exists to
 * show what a filled-in strategy looks like, not to be correct for you.
 */
const exampleApiTokenAuth: AuthStrategy = {
  kind: 'apiToken',
  tokenPath: '<TOKEN_ENDPOINT>',
  body: (username, password) => ({ grant_type: 'password', username, password }),
  toStorage: (response) => ({
    localStorage: [
      { name: 'accessToken', value: String(response.access_token) },
      { name: 'refreshToken', value: String(response.refresh_token ?? '') },
    ],
  }),
  rejectResponse: (response) =>
    response.authCode === 1
      ? 'Password expired. Use a service account whose password is set to never expire.'
      : null,
};

/**
 * Your environments. The first entry is the default and is treated as required — a run whose
 * default profile is unconfigured fails immediately rather than failing later for a reason that
 * looks unrelated.
 */
export const PROFILES: EnvProfile[] = [
  {
    id: 'dev',
    label: '<PRODUCT_NAME> dev',
    baseUrlEnv: 'URL',
    baseUrlFallbackEnv: 'URL_DEV',
    defaultBaseUrl: '<DEV_BASE_URL>',
    authFileName: 'user-dev.json',
    adminUserEnv: 'TEST_ADMIN_USER',
    adminPasswordEnv: 'TEST_ADMIN_PASSWORD',
    auth: exampleApiTokenAuth,
  },
  {
    id: 'staging',
    label: '<PRODUCT_NAME> staging',
    baseUrlEnv: 'URL_STAGING',
    authFileName: 'user-staging.json',
    adminUserEnv: 'TEST_ADMIN_USER_STAGING',
    adminUserFallbackEnv: 'TEST_ADMIN_USER',
    // No password fallback on purpose. See the warning on the field.
    adminPasswordEnv: 'TEST_ADMIN_PASSWORD_STAGING',
    auth: exampleApiTokenAuth,
  },
];

/** Profiles the runner builds projects for. The first is the default. */
export const DEFAULT_PROFILE_ID = PROFILES[0]!.id;

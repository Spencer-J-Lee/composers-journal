import { QUERY_KEYS } from "@/constants/queryKeys";

import { RouteOptions } from "./types";

class Routes {
  private withQuery(path: string, options?: RouteOptions) {
    if (!options) {
      return path;
    }

    let url = path;

    if (options.query) {
      const query = new URLSearchParams();
      for (const [key, value] of Object.entries(options.query)) {
        if (Array.isArray(value)) {
          value.forEach((child) => query.append(key, child));
        } else {
          query.append(key, value);
        }
      }
      url += `?${query.toString()}`;
    }

    if (options.fragment) {
      url += `#${encodeURIComponent(options.fragment)}`;
    }

    return url;
  }

  private entries() {
    return "/entries";
  }

  home() {
    return "/";
  }

  login() {
    return "/login";
  }

  register() {
    return "/register";
  }

  /**
   * The provided email will be used to prefill
   * an email input on the Verify Email page
   */
  verifyEmail(email?: string) {
    const basePath = `/verify-email`;
    return email ? this.withQuery(basePath, { query: { email } }) : basePath;
  }

  /**
   * The provided redirectUrl will be used to redirect
   * the user after authentication on the Verify Email Callback page
   */
  verifyEmailCallback(redirectUrl: string) {
    const basePath = `${this.verifyEmail()}/callback`;

    return redirectUrl
      ? this.withQuery(basePath, {
          query: { [QUERY_KEYS.REDIRECT_URL]: redirectUrl },
        })
      : basePath;
  }

  /**
   * The provided email will be used to prefill
   * an email input on the Forgot Password page
   */
  forgotPassword(email?: string) {
    const basePath = `/forgot-password`;
    return email ? this.withQuery(basePath, { query: { email } }) : basePath;
  }

  profile() {
    return "/profile";
  }

  search() {
    return "/search";
  }

  entry(entryId: number) {
    return `${this.entries()}/${entryId}`;
  }

  entryEdit(entryId: number) {
    return `${this.entries()}/${entryId}/edit`;
  }

  entryCreate() {
    return `${this.entries()}/create`;
  }

  tags() {
    return "/tags";
  }
}

export const routes = new Routes();

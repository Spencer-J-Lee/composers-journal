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

  resetPassword() {
    return "/reset-password";
  }

  workspace() {
    return "/workspace";
  }

  profile() {
    return `${this.workspace()}/profile`;
  }

  search() {
    return `${this.workspace()}/search`;
  }

  notebooks() {
    return `${this.workspace()}/notebooks`;
  }

  notebook(notebookId: number) {
    return `${this.notebooks()}/${notebookId}`;
  }

  notebookEdit(notebookId: number) {
    return `${this.notebook(notebookId)}/edit`;
  }

  notebookCreate() {
    return `${this.notebooks()}/create`;
  }

  entry(notebookId: number, entryId: number) {
    return `${this.notebook(notebookId)}${this.entries()}/${entryId}`;
  }

  entryEdit(notebookId: number, entryId: number) {
    return `${this.entry(notebookId, entryId)}/edit`;
  }

  entryCreate(notebookId: number) {
    return `${this.notebook(notebookId)}${this.entries()}/create`;
  }

  settings() {
    return `${this.workspace()}/settings`;
  }

  tags() {
    return `${this.workspace()}/tags`;
  }

  trash() {
    return `${this.workspace()}/trash`;
  }
}

export const routes = new Routes();

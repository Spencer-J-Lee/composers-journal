import { Entry } from "@/models/Entry";

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

  entry(entry: Entry) {
    return `${this.notebook(entry.notebookId)}${this.entries()}/${entry.id}`;
  }

  entryEdit(entry: Entry) {
    return `${this.entry(entry)}/edit`;
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

  notFound() {
    return `/not-found`;
  }
}

export const routes = new Routes();

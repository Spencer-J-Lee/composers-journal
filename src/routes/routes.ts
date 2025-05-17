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

  verifyEmail(email?: string) {
    const basePath = `/verify-email`;
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
    return `${this.entries}/create`;
  }

  tags() {
    return "/tags";
  }
}

export const routes = new Routes();

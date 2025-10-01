export const domain = "209.97.162.95";
// export const domain = "10.0.2.2";
export const localIP = "172.20.10.3";

export const directus = {
  baseURL: `http://${domain}`,
};

export const server = {
  baseURL: `http://${domain}:5000`,
};
export const cloudinary = {
  baseURL: "https://res.cloudinary.com/dlwnraplb",
  imagePath: `/image/upload/v1733513766/`,
  audioPath: `/raw/upload/v1733513766/`,

  get images() {
    return this.baseURL + this.imagePath;
  },

  get audio() {
    return this.baseURL + this.audioPath;
  },
};

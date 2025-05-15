export const domain = "192.168.1.161";
// export const domain = "10.0.2.2";
// const domain = "192.168.131.188"

export const directus = {
  baseURL: `http://${domain}:8055`,
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

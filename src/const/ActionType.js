function generateConst(name) {
  return {
    LOADING: `${name}.LOADING`,
    ERROR: `${name}.ERROR`,
    DONE: `${name}.DONE`,
  };
}
export const USERS = generateConst('USERS');
export const USERDETAIL = generateConst('USERDETAIL');
export const USERPOSTS = generateConst('USERPOSTS');
export const POST = generateConst('POSTS');
export const COMMENTS = generateConst('COMMENTS');
export const USERALBUMS = generateConst('USERALBUMS');
export const ALBUM = generateConst('ALBUM');
export const PHOTOS = generateConst('PHOTOS');

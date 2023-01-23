export const emailRegex = new RegExp(
  /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/
);
export const upperCaseRegex = new RegExp(/^(?=.*[A-Z])/);
export const specialCharRegex = new RegExp(
  /^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~¿·ªº½¬¸¨Çç•·¸])/
);
export const numberRegex = new RegExp(/^(?=.*[0-9])/);
export const lowerCaseRegex = new RegExp(/^(?=.*[a-z])/);
export const minLengthRegex = new RegExp(/^(?=.{8})/);

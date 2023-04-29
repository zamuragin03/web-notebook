export const decodeJWT = <
  Payload extends Record<string, any>,
  Header extends Record<string, any>
>(
  JWT: string
): { payload: Payload; header: Header } => {
  if (typeof JWT !== "string") {
    throw new Error("Invalid token specified");
  }

  try {
    const header = JSON.parse(atob(JWT.split(".")[0]));
    const payload = JSON.parse(atob(JWT.split(".")[1]));
    return { header, payload };
  } catch (e) {
    throw new Error("Invalid token specified: " + e.message);
  }
};

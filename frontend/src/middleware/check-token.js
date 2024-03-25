
export const checkToken = (context) => {
    if (
      Math.floor(new Date().getTime() / 1000) >=
      context.tokenExpiration
    ) {
      context.logout();
    }
  };
  
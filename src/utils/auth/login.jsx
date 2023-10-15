import supabase from "./configClient";

const login = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export default login;

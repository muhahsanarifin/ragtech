import supabase from "./configClient";

const logout = async () => {
  return await supabase.auth.signOut();
};

export default logout;

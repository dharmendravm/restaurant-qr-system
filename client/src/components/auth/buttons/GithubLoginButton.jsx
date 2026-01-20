import githubIcon from "@/assets/github-mark-white.png";
// import githubIcon from "@/assets/github.png";
import { auth, githubProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { githubLogin } from "@/store/authSlice";

export const GitHubLoginUI = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, githubLoading } = useSelector((state) => state.auth);

  const handleGithubAuth = async () => {
    if (githubLoading) return;

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const idToken = await result.user.getIdToken();

      dispatch(githubLogin(idToken));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <button
      onClick={handleGithubAuth}
      disabled={githubLoading}
      className="w-full h-11 rounded-xl bg-gray-800 text-white flex items-center 
      justify-center gap-3 text-sm font-semibold shadow transition-all duration-200
      hover:bg-neutral-900 active:scale-[0.98] focus:outline-none focus:ring-2
       focus:ring-black/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
    >
      {!githubLoading ? (
        <>
          <img src={githubIcon} alt="GitHub" className="w-5 h-5 " />
          <span>Continue with GitHub</span>
        </>
      ) : (
        <span className="animate-pulse">Signing in…</span>
      )}
    </button>
  );
};

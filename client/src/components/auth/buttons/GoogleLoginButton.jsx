import googleIcon from "@/assets/google.png";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const GoogleLoginUI = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, googleLoading } = useSelector((state) => state.auth);

  const handleGoogleAuth = async () => {
    if (googleLoading) return;

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      dispatch(googleLogin(idToken));
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
      type="button"
      onClick={handleGoogleAuth}
      disabled={googleLoading}
      className={`
        w-full h-11 rounded-xl border border-gray-300 bg-white
        flex items-center justify-center gap-3
        text-sm font-semibold text-gray-800
        shadow-sm transition-all duration-200
        hover:bg-gray-50 hover:shadow
        active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-gray-300
        disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer
      `}
    >
      {!googleLoading ? (
        <>
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </>
      ) : (
        <span className="animate-pulse">Signing in…</span>
      )}
    </button>
  );
};

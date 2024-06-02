import Loader from "@/components/shared/Loader";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen glassmorphism-auth">
      <Loader />
    </div>
  );
}

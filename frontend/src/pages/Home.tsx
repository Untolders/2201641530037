import { useEffect } from "react";
import { UrlShortenerForm } from "@/components/UrlShortenerForm";
import { Log } from "@/utils/logService";

const Home = () => {
  useEffect(() => {
    const token = "YOUR_AUTH_TOKEN"; // Replace later with real token
    Log("frontend", "info", "page", "Home page loaded", token);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <UrlShortenerForm />
      </div>
    </div>
  );
};

export default Home;
